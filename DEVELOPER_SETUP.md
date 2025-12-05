# 🚀 Hint App - Developer Setup Guide

## 📋 System Requirements

### Required Software
- **Node.js**: Version 20.19.4 or higher (recommended: 20.x LTS)
- **npm**: Version 10.x or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code, Cursor, or any preferred IDE

### Platform-Specific Requirements

#### macOS
- **Xcode**: Latest version from App Store (for iOS development)
- **Xcode Command Line Tools**: Run `xcode-select --install`
- **CocoaPods**: Install via `sudo gem install cocoapods` (for iOS)
- **Watchman**: Install via Homebrew `brew install watchman`

#### Windows
- **Android Studio**: For Android development
- **Java Development Kit (JDK)**: Version 11 or higher
- Enable **Windows Subsystem for Linux (WSL2)** for better performance

#### Linux
- **Android Studio**: For Android development
- **Java Development Kit (JDK)**: Version 11 or higher

## 🛠️ Installation Steps

### 1. Install Node.js

#### Option A: Using Node Version Manager (Recommended)

**macOS/Linux:**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then install Node
nvm install 20
nvm use 20
```

**Windows:**
```bash
# Use nvm-windows from: https://github.com/coreybutler/nvm-windows
nvm install 20.19.4
nvm use 20.19.4
```

#### Option B: Direct Download
Download from [nodejs.org](https://nodejs.org/) and install the LTS version.

### 2. Install Expo CLI

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
```

### 3. Clone and Setup the Project

```bash
# Clone the repository (replace with actual repo URL)
git clone <repository-url>
cd Hint-1

# Navigate to the app directory
cd HintApp

# Install dependencies
npm install
```

### 4. Install Expo Go on Your Mobile Device

**For testing on physical devices:**
- **iOS**: [Expo Go on App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Expo Go on Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🏃‍♂️ Running the Application

### Basic Development Server

```bash
# Start the Expo development server
npm start

# Or use Expo CLI directly
npx expo start
```

### Platform-Specific Commands

```bash
# Run on iOS Simulator (macOS only)
npm run ios

# Run on Android Emulator
npm run android

# Run in web browser
npm run web

# Clear cache and start fresh
npx expo start -c
```

### Testing on Physical Devices

1. Make sure your phone and computer are on the **same WiFi network**
2. Run `npm start`
3. Scan the QR code that appears:
   - **iOS**: Use the Camera app
   - **Android**: Use Expo Go app's QR scanner
4. The app will load on your device

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Node Version Warnings
```
npm warn EBADENGINE Unsupported engine
```
**Solution**: Update Node.js to version 20.19.4 or higher
```bash
nvm install 20.19.4
nvm use 20.19.4
```

#### 2. Metro Bundler Issues
```
Error: Unable to resolve module
```
**Solution**: Clear cache and reinstall
```bash
npx expo start -c
rm -rf node_modules
npm install
```

#### 3. Permission Errors (macOS/Linux)
```
Error: EACCES: permission denied
```
**Solution**: Fix npm permissions
```bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 4. Network Connection Issues
```
Error: Network response timed out
```
**Solution**: 
- Check firewall settings
- Ensure devices are on same network
- Try using tunnel mode: `npx expo start --tunnel`

#### 5. Android Emulator Not Found
**Solution**: 
1. Open Android Studio
2. Go to AVD Manager
3. Create a new Virtual Device
4. Start the emulator before running `npm run android`

## 📱 Development Workflow

### 1. Making Changes
- Edit files in your code editor
- Save changes - the app will **hot reload** automatically
- Press `r` in terminal to manually reload

### 2. Debugging
- Press `m` in terminal to open developer menu
- Press `j` to open debugger
- Use React Native Debugger or Chrome DevTools

### 3. Type Checking
```bash
# Run TypeScript type checking
npx tsc --noEmit

# Watch for type errors
npx tsc --noEmit --watch
```

### 4. Linting
```bash
# Run ESLint
npx eslint src/

# Fix auto-fixable issues
npx eslint src/ --fix
```

## 📦 Project Structure

```
HintApp/
├── src/                      # Source code
│   ├── components/          # Reusable components
│   │   └── QuestionTypes/  # Question type components
│   ├── context/            # React Context providers
│   ├── data/              # Static data (JSON files)
│   ├── screens/           # Screen components
│   └── utils/             # Utility functions and types
├── assets/                 # Images, fonts, etc.
├── App.tsx                # Main application entry
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── app.json             # Expo configuration
```

## 🔄 Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update Expo SDK
expo upgrade
```

## 🚢 Building for Production

### Prerequisites
- Expo account: Create at [expo.dev](https://expo.dev)
- EAS CLI: `npm install -g eas-cli`

### Build Commands

```bash
# Login to Expo
expo login

# Configure EAS Build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

## 🔗 Useful Resources

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [React DevTools](https://github.com/facebook/react/tree/main/packages/react-devtools)
- [Expo Snack](https://snack.expo.dev/) - Online playground
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

### Community
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

## 📝 Environment Variables

Create a `.env` file in the HintApp directory for environment-specific configs:

```bash
# Example .env file
API_URL=http://localhost:3000
ENVIRONMENT=development
```

To use environment variables:
```javascript
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.API_URL;
```

## 🧪 Testing

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 💡 Pro Tips

1. **Use Expo Go for rapid development** - No need for native builds during development
2. **Enable Fast Refresh** - Already enabled by default
3. **Use TypeScript** - Already configured for better type safety
4. **Keep dependencies updated** - Run `expo doctor` regularly
5. **Test on real devices** - Simulators don't catch all issues
6. **Use absolute imports** - Configure in `tsconfig.json` for cleaner imports

## ❓ Need Help?

If you encounter issues not covered here:
1. Check the [Expo troubleshooting guide](https://docs.expo.dev/workflow/debugging/)
2. Search for existing issues on GitHub
3. Ask in the Expo Discord server
4. Create an issue with detailed error logs

---

**Happy coding! 🎉**
