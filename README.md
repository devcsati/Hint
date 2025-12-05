# 🎯 Hint React Native App

A romantic relationship enhancement app built with React Native, Expo, and TypeScript. The app features a comprehensive onboarding flow to collect user preferences and generate personalized daily romantic missions.

## 📋 Prerequisites

- Node.js (v20+)
- npm or yarn
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## 🚀 Installation and Setup

1. **Navigate to the project directory:**
```bash
cd HintApp
```

2. **Install dependencies (if needed):**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
# or
npx expo start
```

4. **Testing on different platforms:**
   - **iOS Simulator:** Press `i` in terminal (Mac only)
   - **Android Emulator:** Press `a` in terminal
   - **Physical Device:** Scan the QR code with Expo Go app
   - **Web Browser:** Press `w` in terminal

## 📁 Project Structure

```
HintApp/
├── App.tsx          # Main application component
├── assets/          # Images, icons
├── package.json     # Project dependencies
├── tsconfig.json    # TypeScript configuration
└── app.json         # Expo configuration
```

## 🛠️ Key Features

The application currently includes:
- ✅ TypeScript support
- ✅ Counter example (state management)
- ✅ Responsive design
- ✅ Basic styles and components
- ✅ ScrollView for better navigation

## 📱 Useful Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Clear cache
npx expo start -c

# Type check
npx tsc --noEmit
```

## 🔧 Development Tips

1. **Hot Reload:** The app automatically reloads when you save a file
2. **Expo Dev Tools:** Use the browser interface to modify various settings
3. **Debugging:** Press `m` in terminal to open the developer menu

## 🚦 Next Steps

1. **Add Navigation:** 
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

2. **State Management (Redux/Context):**
```bash
npm install @reduxjs/toolkit react-redux
```

3. **Install UI Library:**
```bash
npm install react-native-elements react-native-vector-icons
```

## 📚 Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript React Native](https://reactnative.dev/docs/typescript)

## 📖 Developer Documentation

### Quick Start Guides
- **[🚀 Quick Start Guide](./QUICK_START.md)** - Get up and running in 5 minutes
- **[📖 Complete Developer Setup](./DEVELOPER_SETUP.md)** - Detailed installation and configuration instructions

### Key Features
- ✨ **Onboarding Module** - Multi-step questionnaire with different input types
- 📱 **Cross-Platform** - iOS, Android, and Web support via Expo
- 🎨 **TypeScript** - Full type safety throughout the application
- 💾 **Local Storage** - AsyncStorage for persisting user preferences
- 🎯 **Personalized Content** - Daily romantic missions based on user input

## 🤝 Contributing

Feel free to enhance the application and add new features!

### Development Commands

```bash
# Start development server
npm start

# Clean install
npm run clean

# Type checking
npm run type-check

# Clear cache
npm run clean:cache
```

---

**Happy coding! 🎉**
