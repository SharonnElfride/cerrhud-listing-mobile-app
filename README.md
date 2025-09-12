# CERRHUD Lab Mobile App

📱 Mobile application for **Cerrhud (CEntre de Recherche en Reproduction Humaine et en Démographie)** based in Cotonou, Benin <br>
It allows clients to browse the catalog of biomedical analyses, view descriptions and prices, and request an appointment through existing communication channel (WhatsApp).

## 🚀 Features
- **Medical tests catalog** (list + details + price).
- **Search & filters**.
- **Booking system**:
  - Form to fill out.
  - Message on WhatsApp.
- **Local SQLite storage** for offline access.

## 🛠️ Tech Stack
- [React Native](https://reactnative.dev/) (cross-platform mobile framework).
- [Expo](https://expo.dev/) (production-grade React Native Framework)
- [SQLite](https://www.sqlite.org/index.html) (local database).
- Native integration for **WhatsApp**.

## 📂 Project Structure
```bash
/app          -> App routing
/assets       -> App assets
/docs         -> Project documents
/src          -> App source code
/components   -> UI components
/database     -> SQLite schema & helpers
/hooks        -> custom React hooks
/models       -> data models / interfaces
/screens      -> Screens / UI rendering (Medical Tests Catalog, Medical Tests Details, Booking)
/services     -> logic (API calls, WhatsApp/Email integration)
/utils        -> helpers
```

## ⚙️ Getting Started
### Prerequisites
- Node.js (>= 18)
- Yarn or npm
- Expo CLI

### Installation
```bash
git clone https://github.com/SharonnElfride/cerrhud-listing-mobile-app.git
cd cerrhud-listing-mobile-app
npm install
npm run android
# or npm run ios
```

## 📖 Documentation

The full **specifications** are available in `docs/cerrhud-specifications-v1.pdf`.

## 📜 License
This project is **not open-source**.  
The source code is shared publicly for **portfolio and educational purposes only**.  
Unauthorized use, modification, or redistribution is not permitted.
