# Agricultural knowledge base for Tamil Nadu farming
from typing import Dict, List, Optional, Tuple
import re
from difflib import get_close_matches
from datetime import datetime

def get_current_season() -> str:
    """Determine current agricultural season based on date"""
    month = datetime.now().month
    if 6 <= month <= 9:
        return "kharif"
    elif 10 <= month <= 2:
        return "rabi"
    else:
        return "summer"

def get_similarity_score(text1: str, text2: str) -> float:
    """Calculate similarity between two text strings"""
    text1_words = set(text1.lower().split())
    text2_words = set(text2.lower().split())
    intersection = text1_words & text2_words
    union = text1_words | text2_words
    return len(intersection) / len(union) if union else 0.0

# Knowledge base structure
crop_info = {
    "rice": {
        "seasons": {
            "kuruvai": "June-July to September-October",
            "samba": "August-September to January-February",
            "thaladi": "September-October to January-February",
            "navarai": "December-January to March-April"
        },
        "varieties": {
            "short_duration": ["ADT 36", "ADT 43", "CO 51", "TRY 3"],
            "medium_duration": ["CO 50", "ADT 49", "TPS 5"],
            "long_duration": ["CR 1009", "ADT 50"]
        },
        "practices": [
            "Land preparation: Puddling and leveling are essential for good water management",
            "Seed selection: Use certified seeds of recommended varieties",
            "Nursery management: Prepare raised seed beds of 10cm height",
            "Transplanting: 15-20 days old seedlings for short duration varieties",
            "Water management: Maintain 2.5cm water level during early stages",
            "Fertilizer application: Apply NPK as per soil test recommendations",
            "Pest management: Regular monitoring and IPM practices"
        ],
        "suitable_regions": ["Coimbatore", "Thanjavur", "Tirunelveli", "Madurai"],
        "soil_requirements": "Clay loam or alluvial soils with good water retention"
    },
    "sugarcane": {
        "seasons": {
            "main": "December-January (12-month crop)",
            "special": "June-July (10-month crop)"
        },
        "practices": [
            "Deep ploughing and field preparation",
            "Use disease-free seed material",
            "Plant two-budded setts in furrows",
            "Maintain proper spacing of 90cm between rows",
            "Regular irrigation at critical stages",
            "Earthing up at 45 and 90 days after planting",
            "Trash mulching for moisture conservation"
        ],
        "suitable_regions": ["Coimbatore", "Salem", "Tirunelveli"],
        "soil_requirements": "Well-drained loamy soils rich in organic matter"
    },
    "cotton": {
        "seasons": {
            "winter": "September-October to February-March",
            "summer": "February-March to July-August"
        },
        "practices": [
            "Deep ploughing in summer",
            "Seed treatment with fungicides",
            "Maintain optimal plant population",
            "Integrated nutrient management",
            "Regular pest monitoring",
            "Timely irrigation at critical stages",
            "Proper weed management"
        ],
        "suitable_regions": ["Coimbatore", "Salem", "Madurai", "Tirunelveli"],
        "soil_requirements": "Well-drained black cotton soils or red loamy soils"
    }
}

seasonal_crops = {
    "kharif": ["rice", "cotton", "sugarcane", "groundnut", "maize"],
    "rabi": ["rice", "pulses", "oilseeds", "vegetables"],
    "summer": ["rice", "pulses", "cotton", "vegetables"]
}

crop_info["groundnut"] = {
    "seasons": {
        "kharif": "June-July to October-November",
        "rabi": "November-December to March-April"
    },
    "practices": [
        "Deep ploughing and fine tilth preparation",
        "Seed treatment with Trichoderma viride",
        "Spacing of 30x10 cm for bunch type",
        "Gypsum application at flowering stage",
        "Light irrigation during pegging stage",
        "Timely harvesting at maturity"
    ],
    "varieties": {
        "bunch_type": ["TMV 7", "TMV 13", "CO 6"],
        "spreading_type": ["TMV 1", "TMV 10", "CO 3"]
    },
    "suitable_regions": ["Coimbatore", "Salem", "Tirunelveli"],
    "soil_requirements": "Well-drained sandy loam or red loam soils"
}

crop_info["maize"] = {
    "seasons": {
        "kharif": "June-July to September-October",
        "rabi": "October-November to January-February",
        "summer": "January-February to April-May"
    },
    "practices": [
        "Deep ploughing and field leveling",
        "Seed treatment with fungicides",
        "Proper spacing of 60x20 cm",
        "Nitrogen application in splits",
        "Irrigation at critical stages",
        "Regular monitoring for fall armyworm"
    ],
    "varieties": {
        "hybrid": ["CO 6", "CO MH 5", "NK 6240"],
        "composite": ["CO 1", "CO 2"]
    },
    "suitable_regions": ["Coimbatore", "Salem", "Madurai"],
    "soil_requirements": "Well-drained loamy soils rich in organic matter"
}

district_specific = {
    "coimbatore": {
        "major_crops": ["cotton", "maize", "sugarcane", "rice", "pulses", "groundnut"],
        "soil_types": ["red loamy", "black", "sandy loam"],
        "annual_rainfall": "700-900mm",
        "avg_temperature": "20-35°C",
        "irrigation_sources": ["Bhavani River", "Noyyal River", "Well irrigation"],
        "major_seasons": {
            "kharif": "June to September",
            "rabi": "October to February",
            "summer": "March to May"
        },
        "climate_zones": ["Western Zone", "North Western Zone"],
        "specialty_crops": ["cotton", "maize"],
        "weather_risks": [
            "Occasional drought in summer",
            "Heavy winds during monsoon",
            "Erratic rainfall distribution"
        ],
        "agricultural_infrastructure": [
            "Tamil Nadu Agricultural University",
            "Cotton Research Station",
            "Multiple Farmer Producer Organizations"
        ],
        "best_practices": [
            "Drip irrigation for efficient water use",
            "Integrated farming systems",
            "Crop rotation with pulses",
            "Conservation tillage practices"
        ]
    },
    "thanjavur": {
        "major_crops": ["rice", "sugarcane", "banana", "coconut", "pulses", "sesame"],
        "soil_types": ["alluvial", "clay loam", "black soil"],
        "annual_rainfall": "1000-1200mm",
        "avg_temperature": "24-36°C",
        "irrigation_sources": ["Cauvery River", "Grand Anaicut Canal", "Tank irrigation"],
        "major_seasons": {
            "kuruvai": "June to September",
            "samba": "August to January",
            "thaladi": "September to February"
        },
        "climate_zones": ["Cauvery Delta Zone"],
        "specialty_crops": ["rice", "coconut"],
        "weather_risks": [
            "Cyclones during northeast monsoon",
            "Flooding in delta regions",
            "Salt water intrusion in coastal areas"
        ],
        "agricultural_infrastructure": [
            "Rice Research Station",
            "Multiple Rice Mills",
            "Strong Cooperative Societies"
        ],
    },
    "madurai": {
        "major_crops": ["paddy", "cotton", "sugarcane", "millets", "vegetables"],
        "soil_types": ["black cotton soil", "red sandy soil", "clay loam"],
        "annual_rainfall": "850-950mm",
        "avg_temperature": "23-38°C",
        "irrigation_sources": ["Vaigai River", "Tank irrigation", "Well irrigation"],
        "major_seasons": {
            "kharif": "June to September",
            "rabi": "October to February",
            "summer": "March to May"
        },
        "climate_zones": ["Southern Zone"],
        "specialty_crops": ["jasmine", "vegetables"],
        "weather_risks": [
            "Summer heat stress",
            "Irregular monsoon",
            "Occasional flooding"
        ],
        "agricultural_infrastructure": [
            "Agricultural College and Research Institute",
            "Flower Market",
            "Modern Cold Storage Facilities"
        ],
    },
    "tirunelveli": {
        "major_crops": ["paddy", "cotton", "groundnut", "pulses", "banana"],
        "soil_types": ["red soil", "black soil", "sandy coastal"],
        "annual_rainfall": "800-950mm",
        "best_practices": [
            "System of Rice Intensification (SRI)",
            "Proper drainage management",
            "Green manuring",
            "Integrated pest management"
        ]
    }
}

def extract_month(query: str) -> Optional[int]:
    """Extract month information from query"""
    months = {
        "january": 1, "february": 2, "march": 3, "april": 4,
        "may": 5, "june": 6, "july": 7, "august": 8,
        "september": 9, "october": 10, "november": 11, "december": 12
    }
    words = query.lower().split()
    for word in words:
        if word in months:
            return months[word]
    return None

def analyze_query(query: str) -> Tuple[str, Dict]:
    """Analyze query to determine intent and extract relevant information"""
    query = query.lower()
    
    # Enhanced intent recognition
    intents = {
        "cultivation": [
            "how to grow", "how to cultivate", "farming", "practice", "method",
            "steps", "guide", "instruction", "procedure", "cultivation tips"
        ],
        "season": [
            "when to grow", "season", "time to plant", "sowing time",
            "planting period", "harvest time", "crop calendar", "best time"
        ],
        "variety": [
            "variety", "varieties", "types", "which variety", "breeds",
            "best variety", "recommended variety", "suitable variety"
        ],
        "location": [
            "where to grow", "suitable area", "best region", "which district",
            "grow well", "suitable location", "recommended area"
        ],
        "soil": [
            "soil type", "soil requirement", "which soil", "soil condition",
            "soil preparation", "land preparation", "soil quality"
        ],
        "problem": [
            "pest", "disease", "issue", "problem", "damage", "symptoms",
            "treatment", "control", "prevent", "cure"
        ],
        "weather": [
            "weather", "climate", "rainfall", "temperature", "humidity",
            "monsoon", "drought", "rain"
        ]
    }
    
    # Determine primary intent
    max_score = 0
    primary_intent = None
    for intent, keywords in intents.items():
        for keyword in keywords:
            if keyword in query:
                score = get_similarity_score(query, keyword)
                if score > max_score:
                    max_score = score
                    primary_intent = intent
    
    # Extract location if present
    locations = district_specific.keys()
    location = next((loc for loc in locations if loc in query), None)
    
    # Extract crop if present
    crops = crop_info.keys()
    crop = next((c for c in crops if c in query), None)
    
    # Extract season if present
    seasons = seasonal_crops.keys()
    season = next((s for s in seasons if s in query), None)
    if not season and "current" in query:
        season = get_current_season()
    
    return primary_intent, {
        "location": location,
        "crop": crop,
        "season": season,
        "confidence": max_score
    }

def get_response(query: str) -> Dict:
    """Generate response based on the query using the knowledge base"""
    intent, context = analyze_query(query)
    response = {"answer": "", "confidence": context["confidence"]}
    
    # Handle crop-specific queries
    if context["crop"]:
        crop = context["crop"]
        if intent == "cultivation" or "practice" in query:
            response["answer"] = f"Here are the recommended practices for {crop} cultivation:\n"
            response["answer"] += "\n".join(f"- {practice}" for practice in crop_info[crop]["practices"])
            if "varieties" in crop_info[crop]:
                response["answer"] += f"\n\nRecommended varieties:\n"
                for type_name, vars in crop_info[crop]["varieties"].items():
                    response["answer"] += f"- {type_name.replace('_', ' ').title()}: {', '.join(vars)}\n"
            response["confidence"] = 0.9
            return response
            
        elif intent == "season" or "when" in query:
            response["answer"] = f"Recommended growing seasons for {crop}:\n"
            response["answer"] += "\n".join(f"- {season}: {period}" for season, period in crop_info[crop]["seasons"].items())
            response["confidence"] = 0.9
            return response
    
    # Handle location-specific queries
    if context["location"]:
        district = context["location"]
        dist_info = district_specific[district]
        
        if intent == "cultivation" or "practice" in query:
            response["answer"] = f"Agricultural Information for {district.title()}:\n\n"
            response["answer"] += f"Climate & Weather:\n"
            response["answer"] += f"- Average Temperature: {dist_info['avg_temperature']}\n"
            response["answer"] += f"- Annual Rainfall: {dist_info['annual_rainfall']}\n"
            response["answer"] += f"- Climate Zones: {', '.join(dist_info['climate_zones'])}\n"
            
            response["answer"] += f"\nSoil Types:\n"
            response["answer"] += "\n".join(f"- {soil}" for soil in dist_info['soil_types'])
            
            response["answer"] += f"\n\nIrrigation Sources:\n"
            response["answer"] += "\n".join(f"- {source}" for source in dist_info['irrigation_sources'])
            
            if "weather_risks" in dist_info:
                response["answer"] += f"\n\nWeather-related Risks:\n"
                response["answer"] += "\n".join(f"- {risk}" for risk in dist_info['weather_risks'])
            
            if "agricultural_infrastructure" in dist_info:
                response["answer"] += f"\n\nAgricultural Support Infrastructure:\n"
                response["answer"] += "\n".join(f"- {infra}" for infra in dist_info['agricultural_infrastructure'])
            
            response["confidence"] = 0.95
            return response
        elif "crop" in query or intent == "location":
            crops_list = district_specific[district]["major_crops"]
            current_season = get_current_season()
            seasonal_crops_list = [crop for crop in crops_list if crop in seasonal_crops[current_season]]
            
            response["answer"] = f"Major crops grown in {district.title()}:\n"
            response["answer"] += "\n".join(f"- {crop}" for crop in crops_list)
            if seasonal_crops_list:
                response["answer"] += f"\n\nRecommended crops for current {current_season} season:\n"
                response["answer"] += "\n".join(f"- {crop}" for crop in seasonal_crops_list)
            response["confidence"] = 0.9
            return response
    
    # Handle seasonal queries
    if context["season"] or "season" in query:
        season = context["season"] or get_current_season()
        if context["location"]:
            district = context["location"]
            dist_info = district_specific[district]
            
            response["answer"] = f"Crop Recommendations for {season.title()} Season in {district.title()}\n\n"
            
            # Get intersection of district and seasonal crops
            district_crops = set(dist_info["major_crops"])
            season_crops = set(seasonal_crops[season])
            recommended_crops = district_crops.intersection(season_crops)
            
            response["answer"] += "Primary Recommended Crops:\n"
            response["answer"] += "\n".join(f"- {crop.title()}" for crop in recommended_crops)
            
            # Add district-specific climate considerations
            response["answer"] += f"\n\nSeasonal Climate Considerations:\n"
            response["answer"] += f"- Temperature Range: {dist_info['avg_temperature']}\n"
            response["answer"] += f"- Expected Rainfall: {dist_info['annual_rainfall']}\n"
            
            # Add weather risks if available
            if "weather_risks" in dist_info:
                relevant_risks = [risk for risk in dist_info["weather_risks"] 
                                if any(term in risk.lower() for term in [season, "monsoon", "rain", "temperature"])]
                if relevant_risks:
                    response["answer"] += "\nSeasonal Weather Risks to Consider:\n"
                    response["answer"] += "\n".join(f"- {risk}" for risk in relevant_risks)
            
            # Add cultivation tips if available
            response["answer"] += "\n\nGeneral Cultivation Tips:\n"
            if "best_practices" in dist_info:
                response["answer"] += "\n".join(f"- {practice}" for practice in dist_info["best_practices"])
            
            # Add irrigation information
            response["answer"] += f"\n\nAvailable Irrigation Sources:\n"
            response["answer"] += "\n".join(f"- {source}" for source in dist_info["irrigation_sources"])
            
            response["confidence"] = 0.95
            return response
        else:
            response["answer"] = f"Recommended crops for {season} season in Tamil Nadu:\n"
            response["answer"] += "\n".join(f"- {crop}" for crop in seasonal_crops[season])
            response["answer"] += "\n\nNote: Crop suitability may vary by district. Specify a district for more accurate recommendations."
            response["confidence"] = 0.8
            return response
    
    # Default response with helpful suggestions
    crops_list = sorted(list(crop_info.keys()))
    districts_list = sorted(list(district_specific.keys()))
    current_season = get_current_season()
    
    response["answer"] = ("I can help you with farming information in Tamil Nadu. Try asking about:\n\n"
                         f"Crops: {', '.join(crops_list)}\n"
                         f"Districts: {', '.join(d.title() for d in districts_list)}\n"
                         f"Current Season: {current_season}\n\n"
                         "You can ask questions like:\n"
                         "- How to grow [crop name]?\n"
                         "- What crops grow well in [district]?\n"
                         "- Best varieties of [crop] for Tamil Nadu?\n"
                         "- When to plant [crop]?\n"
                         f"- What to grow in {current_season} season?")
    response["confidence"] = 0.5
    return response