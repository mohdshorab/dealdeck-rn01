# 🛍️ Dealdeck

Dealdeck is a **cross-platform eCommerce mobile application** built using **React Native**.  
It features a modern shopping experience with authentication, product browsing, cart functionality, Google Sign-In, and real-time updates via **CodePush**.  

---

## 🚀 Features

- 🔐 **Authentication**  
  - Email/password login & signup  
  - Google Sign-In  
  - Forgot password functionality  

- 🏪 **E-Commerce Essentials**  
  - Product listings & categories  
  - Product detail screens  
  - Add to cart (supports guest users)  
  - Favorite products  
  - Saved cards & addresses  
  - Checkout-ready cart management  

- 🎨 **UI/UX**  
  - Shimmer effects for smooth loading states  
  - Responsive design with `react-native-responsive-fontsize`  
  - Custom loaders, modals, and toast messages  

- 🔔 **Real-Time Updates**  
  - OTA updates powered by **Microsoft CodePush**  
  - In-app update progress modal  

- 🌐 **Network Awareness**  
  - Real-time internet connection detection using `@react-native-community/netinfo`

- 📱 **Cross-Platform**  
  - Full support for both iOS and Android  

---

## 🖼️ Screens

- FlashScreen  
- LogIn / SignUp  
- ForgotPassword  
- HomeScreen  
- ProductDetail  
- ProductsOfCategory  
- ProductsYouMayLike  
- Cart  
- FavProducts  
- Category  
- MyOrders  
- SavedAddresses  
- SavedCards  
- Profile  

---

## 🛠️ Tech Stack

| Technology                | Purpose                                  |
|---------------------------|------------------------------------------|
| React Native (0.71.8)     | Cross-platform development framework     |
| React Navigation          | Navigation (stack, drawer, bottom tabs) |
| Firebase                  | Auth, Firestore, and cloud backend       |
| MobX                      | State management                        |
| Axios                     | API calls                               |
| CodePush                  | Over-the-air updates                    |
| Google Sign-In            | Google authentication                   |
| Vector Icons              | Icons library                           |
| Moment.js                 | Date formatting                         |

---

## 📦 Project Structure

```plaintext
src/
  ├── components/        # Reusable UI components (e.g., Toast)
  ├── navigation/        # App navigation setup
  ├── screens/           # All app screens
  ├── services/          # API & Firebase services
  ├── store/             # MobX store setup
  └── utils/             # Utility functions
App.js                   # Entry point with CodePush integration
````

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/dealdeck.git
cd dealdeck
```

### 2. Install dependencies

```bash
npm install
```

### 3. iOS setup

```bash
cd ios && pod install && cd ..
```

### 4. Run the app

```bash
# For Android
npm run android

# For iOS
npm run ios
```

---

## 📜 Available Scripts

| Script                  | Description                         |
| ----------------------- | ----------------------------------- |
| `npm start`             | Starts Metro bundler                |
| `npm run android`       | Runs the app on Android             |
| `npm run ios`           | Runs the app on iOS                 |
| `npm run pod-install`   | Installs iOS CocoaPods dependencies |
| `npm run gradlew-clean` | Cleans Android build cache          |
| `npm run build-release` | Builds Android release APK          |
| `npm run lint`          | Lints the codebase using ESLint     |
| `npm run test`          | Runs tests with Jest                |

---

## 🔐 Environment Variables

To enable Google Sign-In, update your credentials in `App.js`:

```javascript
GoogleSignin.configure({
  webClientId: '<YOUR_WEB_CLIENT_ID>',
  iosClientId: '<YOUR_IOS_CLIENT_ID>'
});
```

---

## 📝 Commit History Highlights

* ✅ Google Sign-In setup and Firebase integration
* ✅ Shimmer effect for product listings
* ✅ Cart functionality with guest checkout
* ✅ Product sharing and favorite products feature
* ✅ OTA updates via CodePush
* ✅ Profile, SavedCards, and SavedAddresses screens

---

## 👨‍💻 Author

Developed by **Mohd Shorab**
