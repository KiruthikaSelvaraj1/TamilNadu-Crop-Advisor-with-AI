import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data_and_model")

def load_and_merge_data():
    # Load datasets
    crop_path = os.path.join(DATA_DIR, "Tamilnadu Crop-Production.csv")
    rainfall_path = os.path.join(DATA_DIR, "rainfall_data.csv")

    crop_data = pd.read_csv(crop_path)

    # rainfall file may contain extra header rows; find correct header line containing 'District'
    with open(rainfall_path, "r", encoding="utf-8") as f:
        header_row = None
        for i, line in enumerate(f):
            if 'District' in line:
                header_row = i
                break
    if header_row is None:
        rainfall_data = pd.read_csv(rainfall_path, error_bad_lines=False)
    else:
        rainfall_data = pd.read_csv(rainfall_path, header=header_row)

    # Normalize district names to a common case
    crop_data['District'] = crop_data['District'].astype(str).str.strip().str.lower()
    rainfall_cols = [c for c in rainfall_data.columns if 'istrict' in c.lower()]
    if len(rainfall_cols) == 0:
        rainfall_data.columns = ['col' + str(i) for i in range(len(rainfall_data.columns))]
        if rainfall_data.shape[1] > 1:
            rainfall_data = rainfall_data.rename(columns={rainfall_data.columns[1]: 'District'})
        else:
            rainfall_data['District'] = None
    else:
        rainfall_data = rainfall_data.rename(columns={rainfall_cols[0]: 'District'})

    rainfall_data['District'] = rainfall_data['District'].astype(str).str.strip().str.lower()

    # Simplify rainfall to a single numeric column by summing numeric columns
    numeric_cols = rainfall_data.select_dtypes(include=[np.number]).columns.tolist()
    if len(numeric_cols) == 0:
        numeric = rainfall_data.apply(pd.to_numeric, errors='coerce')
        numeric_cols = numeric.select_dtypes(include=[np.number]).columns.tolist()
        rainfall_data[numeric_cols] = numeric[numeric_cols]

    if len(numeric_cols) > 0:
        rainfall_data['Rainfall'] = rainfall_data[numeric_cols].sum(axis=1)
    else:
        rainfall_data['Rainfall'] = np.nan

    rainfall_slim = rainfall_data[['District', 'Rainfall']]
    # Ensure District is string and normalized
    rainfall_slim['District'] = rainfall_slim['District'].astype(str).str.strip().str.lower()
    # Keep only rows where District looks like a name (letters and spaces)
    rainfall_slim = rainfall_slim[rainfall_slim['District'].str.match(r'^[a-zA-Z\s]+$', na=False)]

    # Merge datasets on normalized District
    df = pd.merge(crop_data, rainfall_slim, on='District', how='left')
    
    # Add synthetic soil and weather data for demonstration
    np.random.seed(42)
    n_samples = len(df)
    
    df['Temperature'] = np.random.uniform(20, 35, n_samples)  # Temperature in Celsius
    df['Humidity'] = np.random.uniform(40, 90, n_samples)     # Humidity percentage
    df['Soil_Type'] = np.random.choice(['clay', 'loamy', 'sandy', 'black'], n_samples)
    df['N'] = np.random.uniform(0, 140, n_samples)  # Nitrogen content
    df['P'] = np.random.uniform(5, 145, n_samples)  # Phosphorus content
    df['K'] = np.random.uniform(5, 205, n_samples)  # Potassium content
    df['pH'] = np.random.uniform(4.5, 8.5, n_samples)  # pH levels
    
    return df

def train_model():
    print("🔄 Loading and preprocessing data...")
    df = load_and_merge_data()
    
    # Initialize label encoders
    label_encoders = {}
    categorical_columns = ['District', 'Season', 'Crop', 'Soil_Type']
    
    # Normalize categorical columns to lowercase strings and encode
    for col in categorical_columns:
        df[col] = df[col].astype(str).str.strip().str.lower()
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
    
    # Prepare features
    feature_columns = [
        'District', 'Season', 'Area', 'Rainfall', 
        'Temperature', 'Humidity', 'Soil_Type',
        'N', 'P', 'K', 'pH'
    ]
    
    X = df[feature_columns]
    y = df['Crop']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale numerical features
    scaler = StandardScaler()
    numerical_cols = ['Area', 'Rainfall', 'Temperature', 'Humidity', 'N', 'P', 'K', 'pH']
    X_train[numerical_cols] = scaler.fit_transform(X_train[numerical_cols])
    X_test[numerical_cols] = scaler.transform(X_test[numerical_cols])
    
    print("🔄 Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    
    # Calculate accuracy
    train_accuracy = model.score(X_train, y_train)
    test_accuracy = model.score(X_test, y_test)
    
    print(f"✅ Model trained successfully!")
    print(f"📊 Training Accuracy: {train_accuracy:.2%}")
    print(f"📊 Testing Accuracy: {test_accuracy:.2%}")
    
    # Save model and encoders
    model_dir = BASE_DIR
    joblib.dump(model, os.path.join(model_dir, "classifier_model.pkl"))
    joblib.dump(label_encoders, os.path.join(model_dir, "label_encoders.pkl"))
    joblib.dump(scaler, os.path.join(model_dir, "scaler.pkl"))
    
    print("✅ Model and encoders saved successfully!")
    return model, label_encoders, scaler

if __name__ == "__main__":
    train_model()
