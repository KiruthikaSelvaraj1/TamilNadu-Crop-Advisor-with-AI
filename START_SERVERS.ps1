# Start both servers
Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "python" -ArgumentList "app.py" -WorkingDirectory "d:\Documents Archive\projectsdsagri\tamilnadu_crop_full_project1\backend"

Start-Sleep -Seconds 2

Write-Host "Starting Frontend..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "d:\Documents Archive\projectsdsagri\tamilnadu_crop_full_project1\frontend"

Start-Sleep -Seconds 5

Write-Host "`n✅ BOTH SERVERS STARTED!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nLogin credentials:" -ForegroundColor Yellow
Write-Host "Email: test@example.com" -ForegroundColor White
Write-Host "Password: test123" -ForegroundColor White

# Keep this window open
Read-Host "Press Enter to exit"
