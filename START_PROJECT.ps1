# Tamil Nadu Agricultural System - Quick Start Script

Write-Host "🚀 Starting Tamil Nadu Agricultural System..." -ForegroundColor Green
Write-Host ""

# Check if Python is installed
Write-Host "✓ Checking Python..." -ForegroundColor Cyan
python --version

# Check if Node.js is installed
Write-Host "✓ Checking Node.js..." -ForegroundColor Cyan
node --version

Write-Host ""
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
cd ".\backend"
python -m pip install -r requirements.txt -q
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
cd "..\frontend"
npm install -q
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host "✨ Starting Servers..." -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Start Backend in background
Write-Host "🔵 Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
cd "..\backend"
Start-Process powershell -ArgumentList "-Command", "cd '$(Get-Location)'; python app.py" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend in background
Write-Host "🔵 Starting Frontend Server (Port 3000)..." -ForegroundColor Cyan
cd "..\frontend"
Start-Process powershell -ArgumentList "-Command", "cd '$(Get-Location)'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ SERVERS STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "🔌 Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "📧 Test Account:" -ForegroundColor Yellow
Write-Host "   Email:    test@example.com" -ForegroundColor Yellow
Write-Host "   Password: test123" -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 For detailed demo guide, see DEMO_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
