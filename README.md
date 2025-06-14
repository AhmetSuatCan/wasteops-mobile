# WasteOps Mobile

WasteOps Mobile is a cross-platform mobile application developed for waste management operations. The app provides features for both employees and administrators to manage waste collection operations, team management, and shift scheduling.

## Features

### Employee Features
- **Home Screen**
  - View personal information
  - View team details and members
  - See team member roles (Driver/Collector)
  - Track team member join dates

- **Shifts Screen**
  - View upcoming shifts
  - View shift history
  - Track shift status and times
  - Real-time shift updates

### Admin Features
- **Human Resources**
  - Employee management
  - Team creation and management
  - Join code generation
  - Employment status tracking

- **Operations**
  - Team management
  - Shift scheduling
  - Route management
  - Facility management

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: Zustand
- **UI Components**: React Native Paper
- **Icons**: Material Community Icons, Ionicons
- **API Communication**: Axios
- **Secure Storage**: Expo SecureStore

## Project Structure

```
wasteops_mobile/
├── app/                    # Main application screens
│   ├── (auth)/            # Authentication screens
│   ├── (dashboard)/       # Admin dashboard screens
│   ├── (employee)/        # Employee screens
│   └── (profile)/         # Profile management screens
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── services/             # API services and utilities
│   └── api/              # API endpoints and configurations
├── store/                # State management
└── utils/                # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd wasteops_mobile
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```

4. Run on your preferred platform
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
API_BASE_URL=your_api_base_url
```

## API Integration

The app integrates with the following API endpoints:

- Authentication (`/api/v1/auth/`)
- Human Resources (`/api/v1/human-resources/`)
- Operations (`/api/v1/operations/`)
- Organization (`/api/v1/organization/`)

## Authentication Flow

1. User registration with role selection (Admin/Employee)
2. Email verification
3. Login with credentials
4. JWT token management for authenticated requests
