# AccountableCoach – Development Dashboard

Welcome to the internal development dashboard for the **AccountableCoach** platform. This document outlines key components, routes, features, and dev tips to help orient yourself or your team when building or contributing.

---

## 📁 Project Structure

```
/src
  ├── App.tsx                 # Main app entry with routing
  ├── components/             # Reusable UI components
  │   ├── NavBar.tsx         # Navigation bar
  │   ├── CheckInForm.tsx    # Weekly check-in form
  │   ├── VoiceFeedback.tsx  # Audio response player
  │   ├── GoalCard.tsx       # Displays user goals
  │   └── ClientList.tsx     # Coach's list of clients
  ├── pages/                 # Page components
  │   ├── CoachDashboard.tsx # Coach view dashboard
  │   └── ClientDashboard.tsx# Client view dashboard
  ├── hooks/                 # Custom React hooks
  │   ├── useAuth.ts        # Authentication hook
  │   └── useVoice.ts       # ElevenLabs integration
  ├── utils/                 # Helper functions
  │   ├── api.ts            # API client
  │   └── date.ts           # Date formatting
  ├── types/                 # TypeScript types
  │   └── index.ts          # Shared types
  └── styles/               # Styling
      └── globals.css       # Tailwind + custom styles
```

---

## 🧠 Component Documentation

### Core Components

#### `CheckInForm`
- **Purpose**: Client weekly progress submission
- **Props**:
  ```typescript
  interface CheckInFormProps {
    goalId: string;
    questions: string[];
    onSubmit: (data: CheckInData) => Promise<void>;
  }
  ```
- **Features**:
  - Traffic light responses (green/yellow/red)
  - Mood tracking
  - Notes (500 char limit)
  - Form validation
  - Loading states

#### `VoiceFeedback`
- **Purpose**: AI voice message playback
- **Props**:
  ```typescript
  interface VoiceFeedbackProps {
    audioUrl?: string;
    transcript?: string;
    createdAt?: string;
    voiceType?: 'motivational' | 'empathetic' | 'professional' | 'friendly';
  }
  ```
- **Features**:
  - Audio player controls
  - Transcript toggle
  - Loading states
  - Error handling

#### `GoalCard`
- **Purpose**: Goal visualization
- **Props**:
  ```typescript
  interface GoalCardProps {
    title: string;
    category: GoalCategory;
    progress: GoalProgress;
    status: GoalStatus;
    startDate: string;
    endDate: string;
  }
  ```
- **Features**:
  - Progress bar
  - Status indicators
  - Date formatting
  - Category icons

#### `ClientList`
- **Purpose**: Client management for coaches
- **Props**:
  ```typescript
  interface ClientListProps {
    clients: Client[];
    onSelectClient: (client: Client) => void;
    selectedClientId?: string;
  }
  ```
- **Features**:
  - Status indicators
  - Avatar/initials
  - Last check-in time
  - Active goals counter

---

## 🌐 Routing Structure

```typescript
// App.tsx routing setup
<Routes>
  <Route path="/coach" element={<CoachDashboard />}>
    <Route path=":clientId" element={<ClientDetail />} />
  </Route>
  <Route path="/client" element={<ClientDashboard />}>
    <Route path="goals/:goalId" element={<GoalDetail />} />
    <Route path="checkin" element={<CheckInForm />} />
  </Route>
</Routes>
```

---

## 🎨 Styling Guidelines

### Tailwind Patterns

```typescript
// Common patterns for consistent styling
const commonStyles = {
  card: 'bg-white rounded-lg shadow p-4',
  button: 'px-4 py-2 rounded-md font-medium',
  buttonPrimary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  buttonSecondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  input: 'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
  label: 'block text-sm font-medium text-gray-700'
};
```

### Status Colors
```typescript
const statusColors = {
  active: { bg: 'bg-green-50', text: 'text-green-700' },
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  inactive: { bg: 'bg-gray-50', text: 'text-gray-700' },
  overdue: { bg: 'bg-red-50', text: 'text-red-700' }
};
```

---

## 📦 Development Roadmap

### Phase 1 (Current)
- [x] Basic component structure
- [x] TypeScript integration
- [x] Tailwind styling
- [ ] Firebase auth
- [ ] Firestore setup

### Phase 2
- [ ] ElevenLabs integration
- [ ] Stripe billing
- [ ] Coach branding
- [ ] Mobile responsiveness
- [ ] Analytics dashboard

### Phase 3
- [ ] Group coaching
- [ ] Health app integrations
- [ ] Custom templates
- [ ] Webhook system

---

## ✅ Development Tips

### State Management
- Use React Query for API data
- Keep auth state in context
- Use local storage for preferences

### Performance
- Implement virtualization for long lists
- Lazy load audio content
- Cache check-in responses

### Testing
```bash
# Run test suite
npm test

# Run with coverage
npm test -- --coverage

# Update snapshots
npm test -- -u
```

### Common Issues
1. **Audio playback**: Add `| cat` to audio file operations
2. **Firebase auth**: Clear cache on token issues
3. **Date handling**: Always use UTC for storage

---

## 🔧 Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

4. Run Firebase emulator:
```bash
npm run firebase:emulate
```

---

## Contact

For architecture support, feature proposals, or issues:
📧 hello@accountablecoach.app 