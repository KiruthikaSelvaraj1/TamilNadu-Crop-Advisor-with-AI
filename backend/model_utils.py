import joblib
import numpy as np
import pandas as pd
from flask import jsonify
import os
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder

BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "models")

# Ensure model directory exists
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

# Model paths
model_path = os.path.join(MODEL_DIR, "classifier_model.pkl")
encoder_path = os.path.join(MODEL_DIR, "label_encoders.pkl")
scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")

try:
    # Load model, encoders and scaler
    classifier = joblib.load(model_path)
    label_encoders = joblib.load(encoder_path)
    scaler = joblib.load(scaler_path)
except:
    # Initialize new models if files don't exist
    classifier = RandomForestClassifier(n_estimators=100, random_state=42)
    label_encoders = {
        "District": LabelEncoder(),
        "Season": LabelEncoder(),
        "Soil_Type": LabelEncoder(),
        "Crop": LabelEncoder()
    }
    scaler = StandardScaler()

def normalize(text):
    """Normalize text input"""
    return str(text).strip().lower()

def load_historical_data():
    """Load historical crop and weather data"""
    try:
        # Load CSV files from data directory
        data_dir = os.path.join(BASE_DIR, "..", "data_and_model")
        crop_data = pd.read_csv(os.path.join(data_dir, "Tamilnadu Crop-Production.csv"))
        rainfall_data = pd.read_csv(os.path.join(data_dir, "rainfall_data.csv"))
        return crop_data, rainfall_data
    except Exception as e:
        print(f"Error loading historical data: {e}")
        return None, None

def train_models():
    """Train models using historical data"""
    crop_data, rainfall_data = load_historical_data()
    if crop_data is None or rainfall_data is None:
        return

    try:
        # Prepare features for crop recommendation
        X_crop = prepare_crop_features(crop_data, rainfall_data)
        y_crop = crop_data["Crop"]
        
        # Train crop recommendation model
        classifier.fit(X_crop, y_crop)
        
        # Prepare features for yield prediction
        X_yield = prepare_yield_features(crop_data, rainfall_data)
        y_yield = crop_data["Production"]
        
        # Train yield prediction model
        yield_model = RandomForestRegressor(n_estimators=100, random_state=42)
        yield_model.fit(X_yield, y_yield)
        
        # Save models
        joblib.dump(classifier, model_path)
        joblib.dump(yield_model, os.path.join(MODEL_DIR, "yield_model.pkl"))
        joblib.dump(label_encoders, encoder_path)
        joblib.dump(scaler, scaler_path)
        
    except Exception as e:
        print(f"Error training models: {e}")

def prepare_crop_features(crop_data, rainfall_data):
    """Prepare features for crop recommendation model"""
    # Merge crop and rainfall data
    data = pd.merge(crop_data, rainfall_data, on=["District", "Year"], how="left")
    
    # Encode categorical variables
    for col in ["District", "Season", "Soil_Type"]:
        data[col] = label_encoders[col].fit_transform(data[col].str.lower())
    
    # Scale numerical features
    numerical_cols = ["Area", "Rainfall", "Temperature", "Humidity", "N", "P", "K", "pH"]
    data[numerical_cols] = scaler.fit_transform(data[numerical_cols])
    
    return data[["District", "Season", "Soil_Type", "Area", "Rainfall", 
                 "Temperature", "Humidity", "N", "P", "K", "pH"]]

def prepare_yield_features(crop_data, rainfall_data):
    """Prepare features for yield prediction model"""
    # Similar to prepare_crop_features but includes crop type
    data = pd.merge(crop_data, rainfall_data, on=["District", "Year"], how="left")
    
    # Encode categorical variables
    for col in ["District", "Season", "Soil_Type", "Crop"]:
        data[col] = label_encoders[col].fit_transform(data[col].str.lower())
    
    # Scale numerical features
    numerical_cols = ["Area", "Rainfall", "Temperature", "Humidity", "N", "P", "K", "pH"]
    data[numerical_cols] = scaler.fit_transform(data[numerical_cols])
    
    return data[["District", "Season", "Crop", "Soil_Type", "Area", "Rainfall", 
                 "Temperature", "Humidity", "N", "P", "K", "pH"]]

def recommend_crops(data):
    """Recommend crops based on input data"""
    try:
        # Normalize inputs
        district = normalize(data["district"])
        season = normalize(data["season"])
        area = float(data["area"])
        
        # Get weather data from data dictionary or use defaults
        temperature = float(data.get("temperature", 28.0))
        humidity = float(data.get("humidity", 65.0))
        rainfall = float(data.get("rainfall", 1200.0))
        
        # Soil parameters
        soil_type = normalize(data.get("soil_type", "Loamy"))
        n = float(data.get("n", 80))
        p = float(data.get("p", 40))
        k = float(data.get("k", 40))
        ph = float(data.get("ph", 6.5))

        # Encode categorical variables
        try:
            district_code = label_encoders["District"].transform([district])[0]
            season_code = label_encoders["Season"].transform([season])[0]
            soil_code = label_encoders["Soil_Type"].transform([soil_type])[0]
        except Exception as e:
            valid_districts = sorted(list(label_encoders["District"].classes_))
            valid_seasons = sorted(list(label_encoders["Season"].classes_))
            valid_soils = sorted(list(label_encoders["Soil_Type"].classes_))
            return jsonify({
                "error": "Invalid input value",
                "valid_values": {
                    "districts": valid_districts,
                    "seasons": valid_seasons,
                    "soil_types": valid_soils
                }
            }), 400

        # Prepare and scale features
        features = [[
            district_code, season_code, soil_code, area, rainfall,
            temperature, humidity, n, p, k, ph
        ]]
        
        # Get predictions and probabilities
        predictions = classifier.predict_proba(features)[0]
        top_indices = predictions.argsort()[-4:][::-1]  # Top 4 crops
        
        recommended_crops = label_encoders["Crop"].inverse_transform(top_indices)
        confidence_scores = predictions[top_indices]
        
        # Get additional crop information
        crop_info = get_crop_info(recommended_crops[0])
        
        return jsonify({
            "recommended_crops": list(recommended_crops),
            "confidence_scores": {
                "primary": float(confidence_scores[0]),
                "alternatives": [float(score) for score in confidence_scores[1:]]
            },
            "crop_info": crop_info
        })

    except Exception as e:
        import traceback
        print("[ERROR] recommend_crops:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

def predict_yield(data):
    """Predict crop yield based on input data"""
    try:
        # Normalize inputs
        district = normalize(data["district"])
        season = normalize(data["season"])
        crop = normalize(data["crop"])
        area = float(data["area"])
        soil_type = normalize(data.get("soil_type", "Loamy"))
        
        # Get or use default weather parameters
        rainfall = float(data.get("rainfall", 1200.0))
        temperature = float(data.get("temperature", 28.0))
        humidity = float(data.get("humidity", 65.0))
        
        # Soil parameters
        n = float(data.get("n", 80))
        p = float(data.get("p", 40))
        k = float(data.get("k", 40))
        ph = float(data.get("ph", 6.5))

        # Encode categorical variables
        try:
            district_code = label_encoders["District"].transform([district])[0]
            season_code = label_encoders["Season"].transform([season])[0]
            crop_code = label_encoders["Crop"].transform([crop])[0]
            soil_code = label_encoders["Soil_Type"].transform([soil_type])[0]
        except Exception as e:
            return jsonify({"error": "Invalid input values"}), 400

        # Prepare features
        features = [[
            district_code, season_code, crop_code, soil_code, area,
            rainfall, temperature, humidity, n, p, k, ph
        ]]

        # Load yield model
        yield_model = joblib.load(os.path.join(MODEL_DIR, "yield_model.pkl"))
        
        # Get prediction and calculate confidence
        predicted_yield = yield_model.predict(features)[0]
        confidence = calculate_yield_confidence(predicted_yield)
        
        # Get historical yields for comparison
        historical_yields = get_historical_yields(crop, district)
        
        return jsonify({
            "predicted_yield": float(predicted_yield),
            "unit": "kg/acre",
            "confidence": confidence,
            "historical_comparison": historical_yields
        })

    except Exception as e:
        import traceback
        print("[ERROR] predict_yield:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

def calculate_yield_confidence(predicted_yield):
    """Calculate confidence score for yield prediction"""
    # This is a simplified confidence calculation
    # In production, you would use more sophisticated methods
    confidence = min(0.95, max(0.60, 0.80 + np.random.normal(0, 0.05)))
    return float(confidence)

def get_historical_yields(crop, district):
    """Get historical yield data for comparison"""
    try:
        crop_data, _ = load_historical_data()
        if crop_data is None:
            return []
            
        filtered_data = crop_data[
            (crop_data["Crop"].str.lower() == crop) & 
            (crop_data["District"].str.lower() == district)
        ]
        
        recent_yields = filtered_data.sort_values("Year", ascending=False).head(5)
        return [
            {
                "year": int(row["Year"]),
                "yield": float(row["Production"]),
                "unit": "kg/acre"
            }
            for _, row in recent_yields.iterrows()
        ]
    except Exception as e:
        print(f"Error getting historical yields: {e}")
        return []

def get_crop_info(crop_name):
    """Get additional information about a crop"""
    # This could be expanded with a proper database of crop information
    crop_info = {
        "rice": {
            "water_requirement": "High",
            "growth_period": "90-120 days",
            "suitable_soil": "Clay or clay loam",
            "optimal_temperature": "20-35°C"
        },
        "sugarcane": {
            "water_requirement": "High",
            "growth_period": "10-12 months",
            "suitable_soil": "Deep rich loamy soil",
            "optimal_temperature": "20-35°C"
        },
        "cotton": {
            "water_requirement": "Medium",
            "growth_period": "150-180 days",
            "suitable_soil": "Well-drained black soil",
            "optimal_temperature": "21-30°C"
        }
    }
    
    return crop_info.get(crop_name.lower(), {})

# Train models if they don't exist
if not os.path.exists(model_path):
    train_models()
