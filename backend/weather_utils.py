import requests
from flask import jsonify
from datetime import datetime, timedelta
import logging
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Tamil Nadu district coordinates
DISTRICT_COORDINATES = {
    "chennai": {"lat": 13.0827, "lon": 80.2707},
    "coimbatore": {"lat": 11.0168, "lon": 76.9558},
    "madurai": {"lat": 9.9252, "lon": 78.1198},
    "salem": {"lat": 11.6643, "lon": 78.1460},
    "trichy": {"lat": 10.7905, "lon": 78.7047},
    "vellore": {"lat": 12.9165, "lon": 79.1325},
    "thanjavur": {"lat": 10.7870, "lon": 79.1378},
    "tirunelveli": {"lat": 8.7139, "lon": 77.7567}
}

def get_district_coordinates(district):
    """Get coordinates for a district"""
    return DISTRICT_COORDINATES.get(
        district.lower(), 
        {"lat": 11.1271, "lon": 78.6569}  # Default to Tamil Nadu center
    )

def fetch_weather(district=None, lat=None, lon=None):
    """Fetch weather data using Open-Meteo API"""
    try:
        # Get coordinates from district if not provided directly
        if district and not (lat and lon):
            coords = get_district_coordinates(district)
            lat = coords["lat"]
            lon = coords["lon"]

        if not lat or not lon:
            return jsonify({"error": "Missing coordinates"}), 400

        # Fetch current weather and forecast
        api_url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={lat}&longitude={lon}"
            f"&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m"
            f"&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m"
            f"&daily=temperature_2m_max,temperature_2m_min,precipitation_sum"
            f"&timezone=Asia/Kolkata"
        )

        response = requests.get(api_url)
        
        if response.status_code == 200:
            data = response.json()
            
            # Process weather data
            current = data["current"]
            daily = data["daily"]
            
            # Generate agricultural advisory
            advisory = generate_agricultural_advisory(
                current["temperature_2m"],
                current["relative_humidity_2m"],
                current["precipitation"]
            )
            
            weather_info = {
                "current": {
                    "temperature": round(current["temperature_2m"], 1),
                    "humidity": round(current["relative_humidity_2m"]),
                    "rainfall": round(current["precipitation"], 1),
                    "wind_speed": round(current["wind_speed_10m"], 1)
                },
                "forecast": [
                    {
                        "date": daily["time"][i],
                        "max_temp": round(daily["temperature_2m_max"][i], 1),
                        "min_temp": round(daily["temperature_2m_min"][i], 1),
                        "rainfall": round(daily["precipitation_sum"][i], 1)
                    }
                    for i in range(len(daily["time"]))
                ],
                "agricultural_advisory": advisory,
                "last_updated": datetime.now().isoformat()
            }
            
            return jsonify(weather_info)
        else:
            logger.error(f"Weather API error: {response.status_code}")
            return get_mock_weather_data(district)

    except Exception as e:
        logger.error(f"Error fetching weather: {e}")
        return get_mock_weather_data(district)

def generate_agricultural_advisory(temperature, humidity, rainfall):
    """Generate agricultural advisory based on weather conditions"""
    advisories = []
    
    # Temperature advisories
    if temperature > 35:
        advisories.append({
            "tamil": "அதிக வெப்பநிலை எச்சரிக்கை: போதுமான பாசனம் மற்றும் பயிர்களுக்கான பாதுகாப்பு நடவடிக்கைகளை மேற்கொள்ளவும்.",
            "english": "High temperature alert: Ensure adequate irrigation and protect crops."
        })
    elif temperature < 15:
        advisories.append({
            "tamil": "குறைந்த வெப்பநிலை எச்சரிக்கை: குளிர் பாதிப்பிலிருந்து பயிர்களை பாதுகாக்கவும்.",
            "english": "Low temperature alert: Protect crops from cold damage."
        })

    # Humidity advisories
    if humidity > 80:
        advisories.append({
            "tamil": "அதிக ஈரப்பதம் எச்சரிக்கை: பூஞ்சை நோய்களை கண்காணிக்கவும்.",
            "english": "High humidity alert: Monitor for fungal diseases."
        })
    elif humidity < 30:
        advisories.append({
            "tamil": "குறைந்த ஈரப்பதம் எச்சரிக்கை: பாசன அளவை அதிகரிக்கவும்.",
            "english": "Low humidity alert: Increase irrigation frequency."
        })

    # Rainfall advisories
    if rainfall > 10:
        advisories.append({
            "tamil": "கனமழை எச்சரிக்கை: வடிகால் வசதியை உறுதி செய்யவும்.",
            "english": "Heavy rainfall alert: Ensure proper drainage."
        })
    elif rainfall > 0:
        advisories.append({
            "tamil": "லேசான மழை: பெரும்பாலான பயிர்களுக்கு நல்ல நிலைமை.",
            "english": "Light rainfall: Good conditions for most crops."
        })
    else:
        advisories.append({
            "tamil": "மழையில்லை: வழக்கமான பாசன அட்டவணையை பராமரிக்கவும்.",
            "english": "No rainfall: Maintain regular irrigation schedule."
        })

    return advisories

def get_mock_weather_data(district):
    """Generate mock weather data when API fails"""
    current_temp = 28 + round(random.normalvariate(0, 2), 1)
    current_humidity = 65 + round(random.normalvariate(0, 5))
    current_rainfall = round(random.uniform(0, 2), 1)
    
    mock_data = {
        "current": {
            "temperature": current_temp,
            "humidity": min(100, max(0, current_humidity)),
            "rainfall": current_rainfall,
            "wind_speed": round(random.uniform(5, 15), 1)
        },
        "forecast": [
            {
                "date": (datetime.now() + timedelta(days=i)).strftime("%Y-%m-%d"),
                "max_temp": round(current_temp + random.uniform(2, 4), 1),
                "min_temp": round(current_temp - random.uniform(2, 4), 1),
                "rainfall": round(random.uniform(0, 5), 1)
            }
            for i in range(7)
        ],
        "agricultural_advisory": generate_agricultural_advisory(
            current_temp, current_humidity, current_rainfall
        ),
        "last_updated": datetime.now().isoformat()
    }
    
    return jsonify(mock_data)
