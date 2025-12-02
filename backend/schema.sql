-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    district TEXT NOT NULL,
    village TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crop recommendations table
CREATE TABLE IF NOT EXISTS crop_recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    soil_type TEXT NOT NULL,
    area FLOAT NOT NULL,
    season TEXT NOT NULL,
    recommended_crop TEXT NOT NULL,
    confidence_score FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Yield predictions table
CREATE TABLE IF NOT EXISTS yield_predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    crop TEXT NOT NULL,
    area FLOAT NOT NULL,
    season TEXT NOT NULL,
    predicted_yield FLOAT NOT NULL,
    confidence_score FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Weather records table
CREATE TABLE IF NOT EXISTS weather_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    district TEXT NOT NULL,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    rainfall FLOAT,
    description TEXT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Pesticide suggestions table
CREATE TABLE IF NOT EXISTS pesticide_suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    crop TEXT NOT NULL,
    problem_type TEXT NOT NULL,
    pesticide_name TEXT NOT NULL,
    is_organic BOOLEAN NOT NULL,
    application_method TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Crop records table
CREATE TABLE IF NOT EXISTS crop_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    crop_name TEXT NOT NULL,
    area FLOAT NOT NULL,
    season TEXT NOT NULL,
    yield_amount FLOAT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_crop_recommendations_user ON crop_recommendations(user_email);
CREATE INDEX IF NOT EXISTS idx_yield_predictions_user ON yield_predictions(user_email);
CREATE INDEX IF NOT EXISTS idx_weather_records_user ON weather_records(user_email);
CREATE INDEX IF NOT EXISTS idx_pesticide_suggestions_user ON pesticide_suggestions(user_email);
CREATE INDEX IF NOT EXISTS idx_crop_records_user ON crop_records(user_email);