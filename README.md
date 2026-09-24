# DeadlineHub AI - Never Miss a Deadline Again. - LIVE WORKING, NO DEMO DATA

Premium React Native App - 100% Live Working

## 🔴 LIVE WORKING - NO DEMO DATA
Ye app me kahi bhi hardcoded demo data nahi hai. Saara data live Firebase Firestore + WatermelonDB se aata hai.
- HomeScreen: Real events from Firestore, no "Google Girl Hackathon" hardcoded
- Todo, Notes, Documents: Real live CRUD from Firestore
- Calendar: Real deadlines marked from live data
- Statistics: Real counts from your actual data

## Features - A to Z Live Working
- ✅ Splash + Onboarding
- ✅ Firebase Auth LIVE - Google, Email, Forgot Password - Real auth, no bypass
- ✅ Home Dashboard LIVE - Real greeting, real countdown from your deadlines, real stats
- ✅ Event Manager LIVE - Create unlimited real events, saves to Firestore, schedules real local notifications via Notifee
- ✅ Live Notification - Works when app closed, phone locked, offline, background - Notifee + FCM + Boot Restore - Real Trigger Notifications
- ✅ Calendar LIVE - Real marked dates from Firestore
- ✅ Todo Manager LIVE - Real tasks from Firestore, toggle complete
- ✅ Notes LIVE - Real notes from Firestore
- ✅ Document Vault LIVE - Real file picker + Firebase Storage upload + Firestore meta
- ✅ Countdown LIVE - Real animated countdown from your deadline
- ✅ Hackathon Tracker LIVE - Filters real hackathon events
- ✅ Assignment Tracker LIVE - Filters real assignment events
- ✅ Internship Tracker LIVE - Filters real internship events
- ✅ Statistics LIVE - Real charts from your data
- ✅ AI Screenshot Import LIVE - Real Gemini Vision API, extracts Title/Date/Time and creates real event
- ✅ Settings LIVE - Real logout, real toggles
- ✅ Offline Support - WatermelonDB (SQLite) - Unlimited free, works offline, auto sync when online
- ✅ Premium UI - Material 3, Gradients #6750A4 -> #7D5260, Glassmorphism, Rounded Cards 24dp, Empty States

## Backend, DB, Other Libs - Free Without Limit

### Backend
**Hybrid Recommended - Free Without Limit:**
- Firebase Auth + Firestore + Storage + FCM - Free tier 50k reads/day (MVP ke liye enough)
- Node Microservice for AI - Render Free - Gemini Vision
- **Truly Unlimited Free:** PocketBase (single binary) on Oracle Cloud Always Free (2 VM, 200GB Forever Free) - No limit ever

### DB
- **Local (Offline):** WatermelonDB (SQLite) - Unlimited, offline-first, no limit, works without internet
- **Cloud:** Firestore (NoSQL, real-time, offline persistence) + Supabase Free 500MB as backup
- **Why Offline Works?** All data saved locally first, syncs to cloud when internet returns. Notifications are local alarms via Notifee, no server needed.

### Other Libs Used
- UI: react-native-paper (Material 3), reanimated, lottie-react-native, linear-gradient, blur (glassmorphism), vector-icons
- Navigation: @react-navigation/bottom-tabs + native-stack
- Notifications: @notifee/react-native (most powerful, works app closed, background, actions)
- Calendar: react-native-calendars
- Database: @nozbe/watermelondb + @react-native-community/datetimepicker
- Storage: @react-native-firebase/storage + document-picker + fs + image-picker
- Charts: react-native-chart-kit + svg
- AI: @google/generative-ai (Gemini 1.5 Flash Free - 60 req/min free)
- Search: fuse.js
- State: zustand + date-fns

## Offline? YES 100%
- Events, Tasks, Notes, Calendar, Countdown, Documents (downloaded) - Works offline
- Create/Edit offline -> Auto sync when online
- Notifications work offline - Local trigger, no internet needed, restores after reboot

## How to Run - 100% Live Working
1. Firebase Console -> Create project -> Add Android app -> Download google-services.json -> Put in android/app/
2. Firestore + Auth + Storage enable
3. aistudio.google.com -> Get Gemini API Key Free -> Put in src/services/aiService.ts
4. npm install
5. npx react-native run-android

No demo data anywhere - Everything live from Firestore.

## Color Theme - Premium
Primary: #6750A4, Tertiary: #7D5260, Background: #FFFBFE, SurfaceVariant: #E7E0EC
Gradients, Glassmorphism, Rounded 24dp, Material 3 Typography

## GitHub
Branch: deadlinehub-ai - Full working live app
Main branch me bhi push hoga
