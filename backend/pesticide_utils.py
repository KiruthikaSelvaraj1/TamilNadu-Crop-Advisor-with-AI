from flask import jsonify

# Pesticide recommendations database
pesticide_db = {
    "rice": {
        "blast": "Tricyclazole",
        "bacterial leaf blight": "Streptocycline",
        "brown spot": "Carbendazim",
        "stem borer": "Carbofuran"
    },
    "cotton": {
        "bollworms": "Spinosad",
        "aphids": "Imidacloprid",
        "whitefly": "Acetamiprid",
        "pink bollworm": "Profenofos"
    },
    "sugarcane": {
        "early shoot borer": "Chlorantraniliprole",
        "internode borer": "Fipronil",
        "white grub": "Phorate",
        "pyrilla": "Chlorpyriphos"
    },
    "groundnut": {
        "leaf spot": "Hexaconazole",
        "rust": "Mancozeb",
        "stem rot": "Carbendazim",
        "leaf miner": "Quinalphos"
    }
}

def suggest_pesticide(data):
    try:
        crop = data.get("crop", "").lower()
        pest = data.get("pest", "").lower()
        
        if not crop:
            return jsonify({"error": "Crop name is required"}), 400
            
        if crop not in pesticide_db:
            return jsonify({"error": f"No pesticide data available for {crop}"}), 404
            
        if pest:
            # If specific pest is provided
            for pest_name, pesticide in pesticide_db[crop].items():
                if pest in pest_name.lower():
                    return jsonify({
                        "crop": crop,
                        "pest": pest_name,
                        "pesticide": pesticide
                    })
            return jsonify({"error": f"No specific pesticide found for {pest} in {crop}"}), 404
        else:
            # Return all pesticides for the crop
            return jsonify({
                "crop": crop,
                "pesticides": pesticide_db[crop]
            })
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500