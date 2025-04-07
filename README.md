# AccountableCoach Mobile App

A React Native mobile application for the AccountableCoach platform.

## Features

- Client management
- Goal tracking
- Check-ins
- Voice feedback
- Progress monitoring

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- iOS development environment (Xcode)
- CocoaPods
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brettearl18/IOSapp.git
cd IOSapp
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

4. Start the development server:
```bash
npx expo start
```

### Development

- Run on iOS simulator:
```bash
npx expo run:ios
```

## Project Structure

```
src/
├── api/          # API integration
├── components/   # Reusable components
├── config/       # Configuration files
├── contexts/     # React contexts
├── hooks/        # Custom hooks
└── navigation/   # Navigation setup
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License.
