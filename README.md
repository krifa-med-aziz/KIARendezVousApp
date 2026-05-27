# KIA Rendez-Vous App

A React Native / Expo application that lets KIA vehicle owners manage their cars and book service appointments at authorised KIA agencies — all in one place.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) ~54 |
| Navigation | [Expo Router](https://expo.github.io/router) v6 (file-system routing) |
| UI | React Native 0.81 + [NativeWind](https://www.nativewind.dev) v4 (Tailwind CSS) |
| Auth | Keycloak (OpenID Connect / Resource Owner Password flow) |
| Storage | `expo-secure-store` for tokens |
| Icons | [Lucide React Native](https://lucide.dev) |
| Validation | [Zod](https://zod.dev) v4 |
| Fonts | Plus Jakarta Sans + Manrope (via `@expo-google-fonts`) |
| HTTP | Native `fetch` wrapped in `lib/api/http.ts` |
| Animation | React Native Reanimated + Worklets |

---

## Project Structure

```
KIARendezVousApp/
├── app/                          # Expo Router screens (file = route)
│   ├── _layout.tsx               # Root layout — providers, fonts, splash
│   ├── index.tsx                 # Entry: shows splash, then redirects
│   ├── login.tsx                 # Sign-in screen
│   ├── signup.tsx                # Registration screen
│   ├── verify-otp.tsx            # OTP verification screen
│   ├── notifications.tsx         # Notifications list
│   ├── add-vehicle.tsx           # Legacy alias → vehicles/add
│   ├── vehicle-details.tsx       # Single vehicle detail screen
│   ├── (main)/                   # Authenticated tab layout
│   │   ├── _layout.tsx           # Bottom tab navigator
│   │   ├── index.tsx             # Home dashboard
│   │   ├── bookings.tsx          # Booking history
│   │   ├── vehicles.tsx          # My garage / vehicle list
│   │   └── profile.tsx           # Profile tab (re-exports profile/index)
│   ├── booking/                  # Multi-step booking wizard
│   │   ├── _layout.tsx
│   │   ├── select-vehicle.tsx    # Step 1 — pick a vehicle
│   │   ├── select-service.tsx    # Step 2 — pick a service
│   │   ├── select-agency.tsx     # Step 3 — pick an agency
│   │   ├── select-appointment.tsx# Step 4 — pick date & time
│   │   ├── confirmation.tsx      # Step 5 — review & confirm
│   │   ├── success.tsx           # Booking success screen
│   │   └── tracking.tsx          # Appointment tracking
│   ├── profile/
│   │   ├── index.tsx             # Profile overview
│   │   └── edit.tsx              # Edit profile
│   ├── settings/
│   │   ├── index.tsx             # Settings overview
│   │   └── password.tsx          # Change password
│   └── vehicles/
│       ├── _layout.tsx
│       └── add.tsx               # Add vehicle (manual or OCR scan)
│
├── components/
│   ├── layout/
│   │   └── AppHeader.tsx         # Shared page header
│   ├── ui/                       # Reusable design-system components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   └── Skeleton.tsx
│   ├── SettingsItem.tsx
│   ├── SettingsSection.tsx
│   ├── SplashScreen.tsx
│   ├── Stepper.tsx               # Booking progress stepper
│   └── TimelineItem.tsx
│
├── constants/
│   ├── config.ts                 # App-wide UI constants (image URLs, durations, etc.)
│   ├── env.ts                    # Environment / API URL constants (reads from .env)
│   ├── routes.ts                 # Typed route paths
│   ├── shadows.ts                # Reusable React Native shadow styles
│   └── theme.ts                  # Colour tokens, spacing, typography
│
├── context/
│   ├── AppointmentsContext.tsx   # Appointments list state + refresh
│   ├── AuthContext.tsx           # Auth state (user, signIn, signOut)
│   ├── BookingContext.tsx        # Multi-step booking wizard state
│   ├── ToastContext.tsx          # Global toast notifications
│   └── VehicleContext.tsx        # Vehicles list state
│
├── data/
│   └── types.ts                  # Re-exports from lib/types (convenience)
│
├── hooks/
│   └── useAuth.ts                # Consumes AuthContext
│
├── lib/
│   ├── api/
│   │   ├── http.ts               # Base apiFetch wrapper (auth headers, error handling)
│   │   ├── kiaApi.ts             # Business API calls (services, agencies, appointments)
│   │   └── vehicleApi.ts         # Vehicle API calls + OCR scan endpoint
│   ├── appointmentFilters.ts     # Filter/sort helpers for appointments
│   ├── bookingFormat.ts          # Date/time formatting for booking flow
│   ├── bookingSlots.ts           # Slot generation utilities
│   ├── bookingSuccessParams.ts   # Encode/decode booking success route params
│   ├── routeParams.ts            # Route param helpers
│   ├── types.ts                  # Shared domain types
│   └── validation/
│       └── addVehicleSchema.ts   # Zod schemas for add-vehicle forms
│
├── services/
│   ├── authService.ts            # Keycloak login / register / OTP calls
│   └── vehicleService.ts         # Thin service layer over kiaApi
│
├── types/
│   └── vehicle.ts                # Vehicle + OCR scan result types
│
├── assets/                       # Images and icons
├── .env.example                  # Template for required environment variables
├── app.json                      # Expo app config
├── babel.config.js
├── global.css                    # NativeWind / Tailwind base styles
├── metro.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+ and npm / yarn
- **Expo CLI**: `npm install -g expo-cli` (or use `npx expo`)
- **iOS**: Xcode 15+ (macOS only)
- **Android**: Android Studio + an emulator, or a physical device
- A running **backend API** (see environment variables below)
- A running **Keycloak** instance with the `kia-app` realm configured

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd KIARendezVousApp

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in the values for your environment
```

### Environment Variables

Create a `.env` file at the project root (never commit it). All variables are prefixed with `EXPO_PUBLIC_` so they are accessible at runtime on the device.

| Variable | Description | Example |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | Base URL of the backend REST API | `http://192.168.1.10:3000` |
| `EXPO_PUBLIC_KEYCLOAK_URL` | Full Keycloak token endpoint | `http://192.168.1.10:8080/realms/kia-app/protocol/openid-connect/token` |
| `EXPO_PUBLIC_KEYCLOAK_CLIENT_ID` | Keycloak client ID for this app | `kia-mobile` |

> **Note:** When running on a physical device, `localhost` won't resolve to your dev machine. Use your machine's local IP address instead (e.g. `192.168.x.x`).

### Running the App

```bash
# Start the Expo development server
npm start

# Open on a connected Android device or emulator
npm run android

# Open in iOS simulator (macOS only)
npm run ios

# Open in a web browser
npm run web
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start Expo Dev Server (interactive) |
| `npm run android` | Start and open on Android |
| `npm run ios` | Start and open on iOS |
| `npm run web` | Start and open in browser |

---

## Key Features

- **Authentication** — Email/password login via Keycloak, OTP-verified registration
- **My Garage** — Register vehicles manually or by scanning the *carte grise* (registration document) via OCR
- **Booking Wizard** — 5-step flow: select vehicle → service → agency → date/time → confirm
- **Booking History** — View upcoming, completed, and cancelled appointments; cancel bookings
- **Home Dashboard** — Quick actions, upcoming appointment card, draft booking resume
- **Notifications** — Service reminders and promotional offers

---

## Architecture Notes

- **Routing**: Expo Router with file-system routes. Auth guard lives in `app/index.tsx` (splash redirect).
- **State**: React Context for auth, vehicles, appointments, the booking wizard, and toasts. No external state manager.
- **API layer**: All HTTP calls go through `lib/api/http.ts` (`apiFetch`) which attaches the Bearer token, handles 401 token expiry, and unwraps the `{ success, data }` envelope.
- **Environment**: All URLs and secrets live in `.env`/`constants/env.ts`. No IP addresses or credentials are hardcoded in source files.

---

## Contributing

1. Branch off `main`: `git checkout -b feat/your-feature`
2. Commit with conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`
3. Open a pull request against `main`

---

## License

Private — All rights reserved. KIA Motors / internal project.
