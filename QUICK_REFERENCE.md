# 🎯 QUICK COMMAND REFERENCE

## 🚀 START SERVERS

### PowerShell (Windows)
```powershell
# Navigate to project directory
cd "d:\Documents Archive\projectsdsagri\tamilnadu_crop_full_project1"

# Auto-start both servers
.\START_PROJECT.ps1
```

### Manual Start (2 Terminal Windows)

**Terminal 1 - Backend:**
```bash
cd "d:\Documents Archive\projectsdsagri\tamilnadu_crop_full_project1\backend"
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd "d:\Documents Archive\projectsdsagri\tamilnadu_crop_full_project1\frontend"
npm run dev
```

---

## 🌐 ACCESS

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
```

---

## 📧 TEST ACCOUNT

```
Email:     test@example.com
Password:  test123
```

---

## 🔧 TROUBLESHOOTING

### Kill Running Processes
```powershell
taskkill /F /IM python.exe /T
taskkill /F /IM node.exe /T
```

### Install Dependencies
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

### Clear Cache
```powershell
# Browser: Ctrl+Shift+Del
# Node modules:
cd frontend
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📚 DOCUMENTATION FILES

| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `DEMO_GUIDE.md` | Detailed demo walkthrough |
| `DEMO_READY.md` | Summary with talking points |
| `QUICK_DEMO.txt` | Visual status overview |
| `FINAL_STATUS_REPORT.md` | Comprehensive status report |
| `START_PROJECT.ps1` | Auto-start script |

---

## ✨ QUICK DEMO FLOW

```
1. Open http://localhost:3000
2. Login: test@example.com / test123
3. Dashboard → Explore Features
4. Show Results to Audience
5. Highlight Professional Design
```

---

## 🎯 DEMO TALKING POINTS

- Real-world agricultural solution
- Full-stack development showcase
- Machine learning integration
- Professional UI/UX design
- Bilingual support
- Responsive layout

---

## 📊 FEATURES TO DEMO

- ✅ User Authentication (Login/Register)
- ✅ Crop Recommendation (AI-powered)
- ✅ Yield Prediction (ML model)
- ✅ Pesticide Suggestions
- ✅ Weather Integration
- ✅ User Profile
- ✅ AI Assistant

---

**Everything ready! Go live! 🚀**
