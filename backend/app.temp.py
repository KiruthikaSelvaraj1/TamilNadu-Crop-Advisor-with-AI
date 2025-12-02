from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import os
import json
import pickle
import numpy as np
from datetime import datetime, timedelta
from model_utils import load_crop_model, load_yield_model
from weather_utils import get_weather_data
import sqlite3
import logging
import pandas as pd

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-here')  # Change in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# Database setup
def get_db():
    db = sqlite3.connect('farm_data.db')
    db.row_factory = sqlite3.Row
    return db

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

# Load ML models
try:
    crop_model = load_crop_model()
    yield_model = load_yield_model()
except Exception as e:
    logger.error(f"Error loading models: {e}")
    crop_model = None
    yield_model = None

# District mapping
DISTRICT_MAPPING = {
    "coimbatore": ["pollachi", "mettupalayam", "annur"],
    "madurai": ["melur", "thirumangalam", "usilampatti"],
    "salem": ["edappadi", "mettur", "gangavalli"],
    "chennai": ["ambattur", "tambaram", "avadi"],
    "tirunelveli": ["ambasamudram", "sankarankovil", "kalakad"],
    "trichy": ["lalgudi", "manapparai", "thiruverumbur"],
    "vellore": ["katpadi", "arcot", "walajapet"],
    "thanjavur": ["kumbakonam", "papanasam", "orathanadu"]
}

@app.route("/")
def home():
    return jsonify({"status": "success", "message": "Backend is running!"})

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        required_fields = ["email", "password", "name", "district", "village"]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "All fields are required"}), 400

        db = get_db()
        cursor = db.cursor()

        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (data["email"],))
        if cursor.fetchone():
            return jsonify({"error": "Email already registered"}), 400

        # Hash password
        hashed_password = generate_password_hash(data["password"])

        # Insert user
        cursor.execute("""
            INSERT INTO users (email, password_hash, name, district, village, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data["email"], hashed_password, data["name"], data["district"], 
              data["village"], datetime.now().isoformat()))
        
        db.commit()
        
        # Create access token
        access_token = create_access_token(identity=data["email"])
        
        return jsonify({
            "message": "Registration successful",
            "token": access_token,
            "user": {
                "name": data["name"],
                "email": data["email"],
                "district": data["district"],
                "village": data["village"]
            }
        })

    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({"error": "Server error occurred"}), 500
    finally:
        db.close()

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data.get("email") or not data.get("password"):
            return jsonify({"error": "Email and password are required"}), 400

        db = get_db()
        cursor = db.cursor()
        
        cursor.execute("""
            SELECT id, email, password_hash, name, district, village 
            FROM users WHERE email = ?
        """, (data["email"],))
        
        user = cursor.fetchone()
        
        if user and check_password_hash(user["password_hash"], data["password"]):
            access_token = create_access_token(identity=user["email"])
            return jsonify({
                "message": "Login successful",
                "token": access_token,
                "user": {
                    "name": user["name"],
                    "email": user["email"],
                    "district": user["district"],
                    "village": user["village"]
                }
            })
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Server error occurred"}), 500
    finally:
        db.close()

@app.route("/recommend_crop", methods=["POST"])
@jwt_required()
def recommend_crop():
    try:
        data = request.get_json()
        required_fields = ["soil_type", "area", "season"]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        if not crop_model:
            return jsonify({"error": "Crop recommendation model not available"}), 503

        user_email = get_jwt_identity()
        
        # Get user's district from database
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT district FROM users WHERE email = ?", (user_email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Prepare features for model
        features = prepare_crop_features(data, user["district"])
        
        # Get recommendations
        predictions = crop_model.predict_proba(features)
        recommended_crops = get_top_crops(predictions, k=4)

        # Save recommendation to database
        save_crop_recommendation(db, user_email, data, recommended_crops)

        return jsonify({
            "recommended_crops": recommended_crops["crops"],
            "confidence_scores": recommended_crops["scores"],
            "suitable_seasons": get_crop_seasons(recommended_crops["crops"][0]),
            "cultivation_tips": get_cultivation_tips(recommended_crops["crops"][0])
        })

    except Exception as e:
        logger.error(f"Crop recommendation error: {str(e)}")
        return jsonify({"error": "Error processing request"}), 500
    finally:
        db.close()

@app.route("/predict_yield", methods=["POST"])
@jwt_required()
def predict_yield():
    try:
        data = request.get_json()
        required_fields = ["crop", "area", "season"]
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        if not yield_model:
            return jsonify({"error": "Yield prediction model not available"}), 503

        user_email = get_jwt_identity()
        
        # Get user's district
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT district FROM users WHERE email = ?", (user_email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Prepare features for model
        features = prepare_yield_features(data, user["district"])
        
        # Get prediction
        predicted_yield = yield_model.predict(features)[0]
        confidence = calculate_yield_confidence(predicted_yield)

        # Save prediction to database
        save_yield_prediction(db, user_email, data, predicted_yield)

        return jsonify({
            "predicted_yield": round(predicted_yield, 2),
            "unit": "kg/acre",
            "confidence": confidence,
            "historical_data": get_historical_yields(data["crop"], user["district"])
        })

    except Exception as e:
        logger.error(f"Yield prediction error: {str(e)}")
        return jsonify({"error": "Error processing request"}), 500
    finally:
        db.close()

@app.route("/get_weather", methods=["GET"])
@jwt_required()
def get_weather():
    try:
        user_email = get_jwt_identity()
        
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT district, village FROM users WHERE email = ?", (user_email,))
        user = cursor.fetchone()
        
        if not user:
            return jsonify({"error": "User not found"}), 404

        weather_data = get_weather_data(user["district"], user["village"])
        
        # Save weather data to database for historical tracking
        save_weather_data(db, user_email, weather_data)

        return jsonify(weather_data)

    except Exception as e:
        logger.error(f"Weather error: {str(e)}")
        return jsonify({"error": "Error fetching weather data"}), 500
    finally:
        db.close()

@app.route("/suggest_pesticide", methods=["POST"])
@jwt_required()
def suggest_pesticide():
    try:
        data = request.get_json()
        if not data.get("crop") or not data.get("problem_type"):
            return jsonify({"error": "Crop and problem type are required"}), 400

        user_email = get_jwt_identity()
        
        suggestions = get_pesticide_suggestions(
            data["crop"],
            data["problem_type"],
            organic_only=data.get("organic_only", False)
        )
        
        # Save suggestion to database
        db = get_db()
        save_pesticide_suggestion(db, user_email, data, suggestions)

        return jsonify(suggestions)

    except Exception as e:
        logger.error(f"Pesticide suggestion error: {str(e)}")
        return jsonify({"error": "Error processing request"}), 500
    finally:
        db.close()

@app.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def profile():
    try:
        user_email = get_jwt_identity()
        db = get_db()
        cursor = db.cursor()

        if request.method == "GET":
            cursor.execute("""
                SELECT name, email, district, village, created_at 
                FROM users WHERE email = ?
            """, (user_email,))
            user = cursor.fetchone()
            
            if not user:
                return jsonify({"error": "User not found"}), 404

            return jsonify({
                "user": dict(user),
                "statistics": get_user_statistics(db, user_email)
            })

        elif request.method == "PUT":
            data = request.get_json()
            allowed_updates = ["name", "district", "village"]
            
            updates = {k: v for k, v in data.items() if k in allowed_updates}
            
            if not updates:
                return jsonify({"error": "No valid fields to update"}), 400

            update_query = ", ".join([f"{k} = ?" for k in updates.keys()])
            cursor.execute(f"""
                UPDATE users 
                SET {update_query}
                WHERE email = ?
            """, (*updates.values(), user_email))
            
            db.commit()

            return jsonify({"message": "Profile updated successfully"})

    except Exception as e:
        logger.error(f"Profile error: {str(e)}")
        return jsonify({"error": "Server error occurred"}), 500
    finally:
        db.close()

@app.route("/crop_history", methods=["GET"])
@jwt_required()
def crop_history():
    try:
        user_email = get_jwt_identity()
        db = get_db()
        cursor = db.cursor()

        # Get user's crop history
        cursor.execute("""
            SELECT crop_name, area, season, yield_amount, created_at
            FROM crop_records
            WHERE user_email = ?
            ORDER BY created_at DESC
        """, (user_email,))
        
        records = cursor.fetchall()
        
        return jsonify({
            "history": [dict(record) for record in records],
            "statistics": calculate_crop_statistics(records)
        })

    except Exception as e:
        logger.error(f"Crop history error: {str(e)}")
        return jsonify({"error": "Error fetching crop history"}), 500
    finally:
        db.close()

# Helper functions (implement these based on your needs)
def prepare_crop_features(data, district):
    # Implement feature preparation logic
    pass

def prepare_yield_features(data, district):
    # Implement feature preparation logic
    pass

def get_top_crops(predictions, k=4):
    # Implement crop selection logic
    pass

def calculate_yield_confidence(predicted_yield):
    # Implement confidence calculation
    pass

def get_historical_yields(crop, district):
    # Implement historical data retrieval
    pass

def get_crop_seasons(crop):
    # Implement season recommendation logic
    pass

def get_cultivation_tips(crop):
    # Implement cultivation tips logic
    pass

def get_pesticide_suggestions(crop, problem_type, organic_only=False):
    # Implement pesticide suggestion logic
    pass

def get_user_statistics(db, user_email):
    # Implement user statistics calculation
    pass

def calculate_crop_statistics(records):
    # Implement crop statistics calculation
    pass

def save_crop_recommendation(db, user_email, input_data, recommendations):
    # Implement recommendation saving logic
    pass

def save_yield_prediction(db, user_email, input_data, prediction):
    # Implement prediction saving logic
    pass

def save_weather_data(db, user_email, weather_data):
    # Implement weather data saving logic
    pass

def save_pesticide_suggestion(db, user_email, input_data, suggestions):
    # Implement suggestion saving logic
    pass

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    # Initialize database
    if not os.path.exists('farm_data.db'):
        init_db()
    
    # Start server
    app.run(debug=True, host="0.0.0.0", port=5000)