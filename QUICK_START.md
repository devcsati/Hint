# 🚀 Hint App - Quick Start Guide

## 📦 Minimum Requirements

- **Node.js 20+** and **npm 10+**
- **Expo Go app** on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Install Node.js (if not already installed)

```bash
# Check your version
node --version  # Need 20+
npm --version   # Need 10+
```

If missing or outdated: download from → [nodejs.org](https://nodejs.org/)

### 2️⃣ Start the Project

```bash
# Navigate to the project directory
cd HintApp

# Install packages (first time only)
npm install

# Start the app
npm start
```

### 3️⃣ Testing on Your Phone

1. Install **Expo Go** app on your phone
2. Make sure your phone and computer are on the same WiFi network
3. Scan the QR code:
   - **iPhone**: Camera app
   - **Android**: Expo Go app QR scanner

## 🎮 Useful Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Starts the development server |
| `npm run web` | Opens in web browser |
| `npm run ios` | iOS simulator (Mac only) |
| `npm run android` | Android emulator |
| `npx expo start -c` | Clear cache + restart |

## 🔥 Terminal Shortcuts

After starting (`npm start`):

- **`r`** - Reload the app
- **`m`** - Open developer menu
- **`w`** - Open web browser
- **`j`** - Start debugger
- **`Ctrl+C`** - Exit

## 🐛 Common Issues

### "Module not found" error
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### App won't load on phone
- ✅ Are you on the same WiFi network?
- ✅ Is firewall blocking?
- Try: `npx expo start --tunnel`

### Node version warning
```bash
# Install newer Node (recommended: use nvm)
nvm install 20
nvm use 20
```

## 📱 Testing the Onboarding

The app automatically shows the onboarding flow on first launch.

**To restart onboarding:**
1. Open the app
2. Scroll down on the main screen
3. Press: "⚙️ Update Preferences"

## 🔄 Development Workflow

1. **Edit the code** → automatic reload
2. **Save** (`Cmd+S` / `Ctrl+S`) → see changes instantly
3. **If error occurs** → check terminal or phone screen

## 📂 File Structure

```
HintApp/
├── App.tsx                    # Main application
├── src/
│   ├── screens/              # Screens
│   │   └── OnboardingScreen.tsx
│   ├── components/           # Components
│   │   └── QuestionTypes/   # Question types
│   ├── context/             # State management
│   └── data/               # Questions (JSON)
└── assets/                # Images, icons
```

## ✨ You're Ready!

The Hint App is now running! 🎉

**Need help?** Check [DEVELOPER_SETUP.md](./DEVELOPER_SETUP.md) for more detailed information.
