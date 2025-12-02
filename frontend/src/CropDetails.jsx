import React from 'react';

const cropDetails = {
  "paddy": {
    icon: "🌾",
    waterNeeds: "High",
    growthPeriod: "110-150 days",
    idealTemp: "24-30°C",
    soilType: "Clay or clay loam",
    keyNutrients: ["Nitrogen", "Phosphorus", "Potassium"],
    commonVarieties: [
      "ADT 36", "ADT 43", "CO 51", "TKM 13",
      "பொன்னி | Ponni",
      "குருவை | Kuruvai",
      "சம்பா | Samba",
      "கருப்புகவுனி | Karuppukavuni",
      "மாப்பிள்ளை சம்பா | Mappillai Samba",
      "கிச்சடி சம்பா | Kitchadi Samba"
    ],
    seasons: ["Kuruvai (Jun-Sep)", "Samba (Aug-Jan)", "Thaladi (Sep-Feb)"],
    tips: [
      "Follow SRI method for better yields",
      "Maintain proper water level",
      "Use organic fertilizers",
      "Traditional seed treatment methods"
    ],
    tamilName: "நெல்",
    traditionalUses: [
      "Medicinal value in traditional varieties",
      "Special uses in festivals",
      "High nutritional content"
    ]
  },
  "blackgram": {
    icon: "🫘",
    waterNeeds: "Moderate",
    growthPeriod: "70-90 days",
    idealTemp: "25-35°C",
    soilType: "Well-drained loamy soil",
    keyNutrients: ["Phosphorus", "Potassium"],
    commonVarieties: [
      "VBN 1", "VBN 2", "VBN 3",
      "தமிழ் உளுந்து | Tamil Ulundu",
      "காஞ்சிபுரம் | Kanchipuram",
      "மதுரை உளுந்து | Madurai Black"
    ],
    seasons: ["Rabi", "Summer"],
    tips: [
      "Good for crop rotation",
      "Minimal irrigation needed",
      "Natural nitrogen fixing"
    ],
    tamilName: "உளுந்து",
    traditionalUses: [
      "Important in Tamil cuisine",
      "Soil health improvement",
      "Traditional medicine"
    ]
  },
  "ragi": {
    icon: "🌾",
    waterNeeds: "Low to Moderate",
    growthPeriod: "90-120 days",
    idealTemp: "26-32°C",
    soilType: "Red soils, lateritic soils",
    keyNutrients: ["Nitrogen", "Phosphorus"],
    commonVarieties: [
      "CO 13", "CO 14", "CO 15",
      "பழைய ராகி | Heritage Ragi",
      "மலை ராகி | Hill Ragi",
      "சிவப்பு ராகி | Red Ragi"
    ],
    seasons: ["June-July", "October-November"],
    tips: [
      "Drought resistant crop",
      "Good for mixed cropping",
      "Minimal pest problems"
    ],
    tamilName: "கேழ்வரகு",
    traditionalUses: [
      "High nutritional value",
      "Traditional health food",
      "Long storage life"
    ]
  },
  "sesame": {
    icon: "🌱",
    waterNeeds: "Low",
    growthPeriod: "80-100 days",
    idealTemp: "25-35°C",
    soilType: "Well-drained sandy loam",
    keyNutrients: ["Nitrogen", "Phosphorus"],
    commonVarieties: [
      "TMV 3", "TMV 4", "CO 1",
      "காரெள்ளு | Black Sesame",
      "வெள்ளெள்ளு | White Sesame",
      "பழைய எள்ளு | Heritage Sesame"
    ],
    seasons: ["January-February", "June-July"],
    tips: [
      "Good for dry farming",
      "Requires less maintenance",
      "High oil content"
    ],
    tamilName: "எள்ளு",
    traditionalUses: [
      "Traditional oil extraction",
      "Medicinal properties",
      "Religious significance"
    ]
  },
  "cotton": {
    icon: "🧶",
    waterNeeds: "Moderate",
    growthPeriod: "150-180 days",
    idealTemp: "21-30°C",
    soilType: "Deep black soil",
    keyNutrients: ["Nitrogen", "Potassium", "Magnesium"],
    commonVarieties: [
      "MCU 5", "MCU 7", "SVPR 2",
      "கருப்பு பருத்தி | Black Cotton",
      "செங்கல்பட்டு | Chengalpattu",
      "திருப்பூர் | Tiruppur"
    ],
    seasons: ["July-August", "January-February"],
    tips: [
      "Regular monitoring for bollworms",
      "Timely defoliation",
      "Maintain optimal spacing"
    ],
    tamilName: "பருத்தி",
    traditionalUses: [
      "Traditional textile industry",
      "Medicinal cotton varieties",
      "Oil extraction from seeds"
    ]
  },
  "sugarcane": {
    icon: "🎋",
    waterNeeds: "High",
    growthPeriod: "300-360 days",
    idealTemp: "20-35°C",
    soilType: "Well-drained loamy soil",
    keyNutrients: ["Nitrogen", "Phosphorus", "Potassium"],
    commonVarieties: [
      "CO 86032", "CO 419", "COC 671",
      "கரும்பு | Native Sugarcane",
      "தென்னை கரும்பு | Southern Variety",
      "செங்கரும்பு | Red Sugarcane"
    ],
    seasons: ["December-March", "June-September"],
    tips: [
      "Regular irrigation essential",
      "Proper trash mulching",
      "Timely earthing up"
    ],
    tamilName: "கரும்பு",
    traditionalUses: [
      "Traditional sugar production",
      "Festival significance",
      "Organic jaggery making"
    ]
  },
  "groundnut": {
    icon: "🥜",
    waterNeeds: "Moderate",
    growthPeriod: "90-120 days",
    idealTemp: "25-30°C",
    soilType: "Sandy loam",
    keyNutrients: ["Calcium", "Phosphorus", "Potassium"],
    commonVarieties: [
      "TMV 7", "VRI 2", "CO 6",
      "வேர்க்கடலை | Traditional",
      "செங்கடலை | Red Groundnut",
      "பொன்னி வேர்க்கடலை | Ponni"
    ],
    seasons: ["June-September", "December-March"],
    tips: [
      "Gypsum application important",
      "Maintain soil moisture during pod formation",
      "Regular weeding"
    ],
    tamilName: "வேர்க்கடலை",
    traditionalUses: [
      "Traditional oil extraction",
      "Festival snacks",
      "Soil enrichment crop"
    ]
  }
};

const CropDetails = ({ cropName }) => {
  const crop = cropDetails[cropName.toLowerCase()];
  
  if (!crop) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{crop.icon}</span>
        <div>
          <h3 className="text-lg font-semibold capitalize">{cropName}</h3>
          {crop.tamilName && (
            <p className="text-sm text-gray-600">{crop.tamilName}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Water Requirement</p>
          <p className="font-medium">{crop.waterNeeds}</p>
        </div>
        <div>
          <p className="text-gray-600">Growth Period</p>
          <p className="font-medium">{crop.growthPeriod}</p>
        </div>
        <div>
          <p className="text-gray-600">Ideal Temperature</p>
          <p className="font-medium">{crop.idealTemp}</p>
        </div>
        <div>
          <p className="text-gray-600">Soil Type</p>
          <p className="font-medium">{crop.soilType}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">Key Nutrients</p>
        <div className="flex gap-2 mt-1">
          {crop.keyNutrients.map((nutrient, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm"
            >
              {nutrient}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">Common Varieties</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {crop.commonVarieties.map((variety, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
            >
              {variety}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">Cultivation Tips</p>
        <ul className="mt-1 space-y-1">
          {crop.tips.map((tip, idx) => (
            <li key={idx} className="text-sm flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {crop.traditionalUses && (
        <div className="mt-4 bg-amber-50 rounded-lg p-3">
          <p className="text-amber-800 font-semibold mb-2">பாரம்பரிய பயன்கள் | Traditional Uses</p>
          <ul className="space-y-1">
            {crop.traditionalUses.map((use, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span className="text-gray-700">{use}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {crop.seasons && (
        <div className="mt-4 bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 font-semibold mb-2">பருவகாலங்கள் | Growing Seasons</p>
          <div className="flex flex-wrap gap-2">
            {crop.seasons.map((season, idx) => (
              <span key={idx} className="px-2 py-1 bg-white text-blue-700 rounded text-sm">
                {season}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDetails;