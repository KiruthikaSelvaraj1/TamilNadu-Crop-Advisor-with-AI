
# Tamil Nadu Smart Crop Prediction Website 🌾

A final year project that uses LLM and ML to predict crop yield and suggest crops for any season/location. This smart system supports Tamil + English text/voice input and includes live weather automation.

---

## 📁 Project Structure

```
tamilnadu_crop_full_project/
├── backend/               ← Flask API + ML model
├── frontend/              ← React UI (Tamil/English + voice input)
├── data_and_model/        ← Datasets + ML model training script
├── README.txt             ← This guide
```

---

## ⚙️ Backend Setup (ML + Weather)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:5000` with:

- `/predict`: POST crop + field data
- `/weather`: GET real-time weather from Open-Meteo

---

## 💻 Frontend Setup (UI)

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000`

- Tamil + English UI
- Text & voice input
- Dropdowns: District → City
- Auto weather fetch
- Crop prediction with LLM + ML

---

## 🧠 ML + LLM

Train your ML model:

```bash
cd data_and_model
python train_model.py
```

This will generate:
- `classifier_model.pkl`
- `label_encoders.pkl`

LLM handles:
- Crop recommendations
- Smart interpretation of Tamil/English voice input

---

## 📦 Requirements

**Backend:**
- Flask
- flask-cors
- pandas
- scikit-learn
- joblib
- requests

**Frontend:**
- React
- TailwindCSS
- Web Speech API (for voice)
- Google Translate (for Tamil input handling)

---

## 🔐 Optional: Farmer Accounts

Coming soon (basic template in frontend):
- Signup/Login
- Farmer crop history tracking

---

## 🌦️ Weather API (Open-Meteo)

Used to get temperature/humidity using district/city geo coordinates:
- API: `https://api.open-meteo.com/v1/forecast?latitude=...`

---

## ✅ Final Features

- Tamil/English inputs (text + voice)
- District → City selection
- Auto weather + soil factor use
- Smart LLM suggestions
- ML yield prediction
- Clean UI for farmers
- Profile structure included

---

🎓 Best of luck on your submission!
