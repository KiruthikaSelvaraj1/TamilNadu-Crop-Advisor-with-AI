from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
import os
import json

app = Flask(__name__)
CORS(app)

# ✅ Set proper Content-Type headers for CSS and JS files
@app.after_request
def set_content_type_header(response):
    """Set proper content-type headers for different file types"""
    if response.content_type:
        # Fix charset for CSS and JS
        if 'text/css' in response.content_type or 'text/javascript' in response.content_type:
            response.headers['Content-Type'] = response.content_type + '; charset=utf-8'
        # Ensure JSON responses have utf-8
        elif 'application/json' in response.content_type:
            response.headers['Content-Type'] = 'application/json; charset=utf-8'
    return response

# JWT Configuration
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# 🔐 User store with default test account
users = {
    "test@example.com": {
        "password": "test123",
        "name": "Test User",
        "district": "Chennai",
        "village": "Tambaram"
    }
}

# 📍 District-to-City Mapping
district_to_cities = {
    "coimbatore": ["pollachi", "mettupalayam", "annur"],
    "madurai": ["melur", "thirumangalam", "usilampatti"],
    "salem": ["edappadi", "mettur", "gangavalli"],
    "chennai": ["ambattur", "tambaram", "avadi"],
    "tirunelveli": ["ambasamudram", "sankarankovil", "kalakad"],
    "trichy": ["lalgudi", "manapparai", "thiruverumbur"],
    "vellore": ["katpadi", "arcot", "walajapet"],
    "thanjavur": ["kumbakonam", "papanasam", "orathanadu"]
}

# ✅ Home Route
@app.route("/")
def home():
    return "✅ Backend is running!"

# 🔐 Login Route
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        
        # Input validation
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Check if user exists (using the in-memory store for now)
        user = users.get(email)
        if not user:
            # Add a test account if no users exist
            if not users:
                users["test@example.com"] = {
                    "password": "test123",
                    "name": "Test User",
                    "district": "Chennai",
                    "village": "Tambaram"
                }
                if email == "test@example.com" and password == "test123":
                    token = create_access_token(identity=email)
                    return jsonify({
                        "message": "Login successful",
                        "token": token,
                        "user": {
                            "name": "Test User",
                            "email": "test@example.com",
                            "district": "Chennai",
                            "village": "Tambaram"
                        }
                    })
            
            return jsonify({"error": "Invalid email or password"}), 401

        # Verify password
        if user["password"] == password:  # In production, use proper password hashing
            # Create access token
            token = create_access_token(identity=email)
            
            return jsonify({
                "message": "Login successful",
                "token": token,
                "user": {
                    "name": user.get("name", ""),
                    "email": email,
                    "district": user.get("district", ""),
                    "village": user.get("village", ""),
                    "phone": user.get("phone", "")
                }
            }), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
            
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"error": "Server error occurred"}), 500

# 🔐 Register Route
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        username = data.get("username", "")  # Accept username from registration form
        phone = data.get("phone", "")
        district = data.get("district", "")
        
        if not email or not password or not username:
            return jsonify({"error": "Email, username and password are required"}), 400

        if email in users:
            return jsonify({"error": "Email already registered"}), 400

        # Store user with all provided details
        users[email] = {
            "password": password, 
            "name": username,
            "phone": phone,
            "district": district,
            "village": ""
        }
        return jsonify({"message": "Registration successful", "name": username}), 201
        
    except Exception as e:
        print(f"Registration error: {str(e)}")
        return jsonify({"error": "Server error occurred"}), 500

# 🌾 Recommend Crop (Temporary mock response)
@app.route("/recommend_crop", methods=["POST"])
def recommend_crop_route():
    try:
        data = request.get_json()
        district = data.get("district", "")
        season = data.get("season", "")
        
        # Enhanced mock recommendation based on input
        crop_recommendations = {
            "coimbatore": {
                "summer": ["Groundnut", "Sunflower", "Maize", "Sugarcane"],
                "winter": ["Cotton", "Rice", "Chickpea", "Maize"],
                "monsoon": ["Rice", "Cotton", "Sugarcane", "Groundnut"]
            },
            "madurai": {
                "summer": ["Cotton", "Groundnut", "Sugarcane", "Sunflower"],
                "winter": ["Rice", "Cotton", "Chickpea", "Sorghum"],
                "monsoon": ["Rice", "Sugarcane", "Cotton", "Maize"]
            },
            "default": ["Rice", "Sugarcane", "Cotton", "Groundnut"]
        }
        
        recommendations = crop_recommendations.get(district.lower(), crop_recommendations["default"])
        
        return jsonify({
            "recommended_crops": recommendations[:4],
            "confidence_scores": {
                "primary": 0.87,
                "alternatives": [0.78, 0.69, 0.60]
            },
            "crop_info": {
                "water_requirement": "High to Medium",
                "growth_period": "90-150 days",
                "suitable_soil": "Loamy/Clay",
                "optimal_temperature": "20-35°C"
            }
        }), 200
    except Exception as e:
        print(f"Crop recommendation error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# 📈 Predict Yield (Temporary mock response)
@app.route("/predict_yield", methods=["POST"])
def predict_yield_route():
    try:
        data = request.get_json()
        crop = data.get("crop", "Rice")
        area = float(data.get("area", 1.0))
        
        # Enhanced yield prediction based on crop type and area
        base_yields = {
            "rice": 2200,
            "sugarcane": 65000,
            "cotton": 18,
            "groundnut": 1200,
            "maize": 3500,
            "sorghum": 1500
        }
        
        base_yield = base_yields.get(crop.lower(), 2000)
        predicted_yield = base_yield * area
        
        return jsonify({
            "predicted_yield": round(predicted_yield, 2),
            "unit": "kg/acre" if crop.lower() in ["rice", "cotton", "groundnut", "maize", "sorghum"] else "tonnes/acre",
            "confidence": 0.85,
            "historical_comparison": [
                {"year": 2022, "yield": base_yield * 0.92},
                {"year": 2023, "yield": base_yield * 0.98},
                {"year": 2024, "yield": base_yield * 1.05}
            ]
        }), 200
    except Exception as e:
        print(f"Yield prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# ☁️ Weather Info (Temporary mock response)
@app.route("/get_weather", methods=["GET"])
def get_weather():
    try:
        district = request.args.get("district", "Chennai")
        
        # Weather data by district
        weather_db = {
            "coimbatore": {
                "temperature": 26,
                "humidity": 70,
                "description": "Partly cloudy with moderate winds",
                "forecast": [
                    {"day": "Today", "temp": 26, "description": "Partly cloudy", "rainfall": "2mm"},
                    {"day": "Tomorrow", "temp": 27, "description": "Sunny", "rainfall": "0mm"},
                    {"day": "Day after", "temp": 25, "description": "Light rain", "rainfall": "15mm"}
                ]
            },
            "default": {
                "temperature": 28,
                "humidity": 65,
                "description": "Partly cloudy",
                "forecast": [
                    {"day": "Today", "temp": 28, "description": "Partly cloudy", "rainfall": "2mm"},
                    {"day": "Tomorrow", "temp": 29, "description": "Sunny", "rainfall": "0mm"},
                    {"day": "Day after", "temp": 27, "description": "Light rain", "rainfall": "12mm"}
                ]
            }
        }
        
        weather = weather_db.get(district.lower(), weather_db["default"])
        return jsonify(weather), 200
    except Exception as e:
        print(f"Weather error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# 🧪 Pesticide Suggestion (Temporary mock response)
@app.route("/suggest_pesticide", methods=["POST"])
def suggest_pesticide_route():
    try:
        data = request.get_json()
        crop = data.get("crop", "Rice")
        
        # Pesticide recommendations by crop
        pesticide_db = {
            "rice": [
                {
                    "name": "Neem Oil",
                    "description": "Natural pesticide effective against rice leaf folder and stem borer",
                    "application": "Spray 3% solution every 7-10 days"
                },
                {
                    "name": "Trichoderma",
                    "description": "Biological fungicide for sheath blight control",
                    "application": "Apply as seed treatment and foliar spray"
                }
            ],
            "cotton": [
                {
                    "name": "Spinosad",
                    "description": "Organic insecticide for bollworms and thrips",
                    "application": "Spray 0.006% solution when pest threshold reached"
                },
                {
                    "name": "Sulfur Dust",
                    "description": "Effective against mites and powdery mildew",
                    "application": "Apply 20-25 kg/hectare"
                }
            ],
            "default": [
                {
                    "name": "Neem Oil",
                    "description": "Natural pesticide effective against various pests",
                    "application": "Spray diluted solution on leaves weekly"
                },
                {
                    "name": "Organic Pyrethrin",
                    "description": "Contact pesticide for immediate control",
                    "application": "Apply in evening to protect beneficial insects"
                }
            ]
        }
        
        suggestions = pesticide_db.get(crop.lower(), pesticide_db["default"])
        
        return jsonify({
            "suggestions": suggestions,
            "preventive_measures": [
                "Regular monitoring of crops",
                "Maintain field hygiene",
                "Use resistant varieties when possible",
                "Proper irrigation management",
                "Crop rotation practice"
            ]
        }), 200
    except Exception as e:
        print(f"Pesticide suggestion error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# 🤖 AI Assistant (LLM) - Ask Crop Questions
@app.route("/ask_llm", methods=["POST"])
def ask_llm():
    try:
        data = request.get_json()
        query = data.get("query", "").strip().lower()
        
        if not query:
            return jsonify({"error": "Query cannot be empty"}), 400
        
        # Knowledge base for crop-related questions
        knowledge_base = {
            "how to grow rice": "Rice requires:\n• Plenty of water (flooded fields)\n• Temperature: 20-30°C\n• Grows in 3-6 months depending on variety\n• Needs nitrogen-rich soil\n• Best planted during monsoon season",
            
            "how to grow cotton": "Cotton farming tips:\n• Needs 180-200 frost-free days\n• Prefers black soil\n• Requires moderate water\n• Temperature: 21-30°C optimal\n• Plant in April-May for Tamil Nadu\n• Harvest in September-November",
            
            "best crops for monsoon": "Best monsoon crops in Tamil Nadu:\n✓ Rice - excellent choice\n✓ Sugarcane - high water requirement\n✓ Groundnut - can do well\n✓ Maize - quick growing\n✓ Pulses - chickpea, moong",
            
            "how to increase yield": "Tips to increase crop yield:\n1. Use certified high-quality seeds\n2. Proper soil preparation and testing\n3. Adequate irrigation management\n4. Timely weeding and pest control\n5. Apply balanced fertilizers\n6. Monitor weather and plan accordingly\n7. Harvest at right maturity stage",
            
            "pest control methods": "Organic pest control:\n• Neem oil spray (3-5% solution)\n• Pheromone traps for monitoring\n• Manual removal of infected parts\n• Companion planting (marigold, basil)\n• Spinosad for severe infestations\n• Trichoderma for fungal diseases",
            
            "soil preparation": "Proper soil preparation:\n• Test soil for pH and nutrients\n• Add compost/FYM 5-10 tons/acre\n• Plough 3-4 times for good tilth\n• Remove weeds and stones\n• Create proper drainage\n• Level the field for uniform water distribution",
            
            "irrigation schedule": "Irrigation guidelines:\n• Rice: Flooded till flowering, then alternate\n• Cotton: 8-10 irrigations in season\n• Groundnut: 3-4 critical periods\n• Sugarcane: Year-round, 20-25 irrigations\n• Check soil moisture before each irrigation",
            
            "fertilizer management": "Balanced fertilizer application:\n• Do soil test before application\n• N:P:K ratio depends on crop\n• Rice: 60:30:30 kg/acre\n• Cotton: 50:20:20 kg/acre\n• Split nitrogen application for better uptake\n• Use micronutrients if soil deficient",
            
            "default": "I'm your AI Crop Assistant! Ask me about:\n• How to grow specific crops\n• Best crops for your season\n• Pest and disease control\n• Soil preparation and fertilizer use\n• Irrigation management\n• Yield improvement tips\n• Weather-based farming advice\n\nWhat would you like to know?"
        }
        
        # Find best matching answer
        answer = knowledge_base.get("default")
        
        for key in knowledge_base.keys():
            if key != "default" and key in query:
                answer = knowledge_base[key]
                break
        
        return jsonify({
            "answer": answer,
            "status": "success"
        }), 200
        
    except Exception as e:
        print(f"LLM Assistant error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# ✅ Start Server
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)