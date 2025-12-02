# Create folders
New-Item -ItemType Directory -Force -Path frontend\public
New-Item -ItemType Directory -Force -Path frontend\src

# index.html
@"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tamil Nadu Crop Prediction</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
"@ | Set-Content frontend\public\index.html

# index.js
@"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
"@ | Set-Content frontend\src\index.js

# index.css
@"
body {
  font-family: Arial;
  padding: 20px;
}
select, input {
  margin: 5px;
  padding: 8px;
}
button {
  padding: 8px 12px;
  margin-top: 10px;
}
"@ | Set-Content frontend\src\index.css

# Create empty files (we'll edit them later)
New-Item frontend\src\App.js -ItemType File
New-Item frontend\src\CropForm.js -ItemType File
New-Item frontend\src\YieldForm.js -ItemType File
New-Item frontend\src\Weather.js -ItemType File

# Create basic package.json
@"
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start"
  }
}
"@ | Set-Content frontend\package.json
