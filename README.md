# She Tracks 🌸

A beautiful, intimate wellbeing app that unifies cycle tracking, mood logging, journaling, and habits into one dashboard — with AI-powered insights.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then add your Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Set Up Database

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the entire contents of `database-schema.sql`
4. Paste and run it in the SQL Editor

**IMPORTANT:** The schema has RLS (Row Level Security) disabled for MVP. Add security policies before production.

### 4. Verify Database Connection

Start the dev server and visit the debug page:

```bash
npm run dev
```

Then navigate to `http://localhost:5173/debug` to verify all tables are accessible.

### 5. Create an Account

1. Visit `http://localhost:5173`
2. Click "Download the App" or "Sign In"
3. Create an account with your email
4. Complete the onboarding flow
5. Start tracking!

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Styled UI primitives (Button, Card, Input, etc.)
│   ├── BottomNav.jsx    # Bottom navigation component
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx  # Authentication context
├── pages/
│   ├── Landing.jsx      # Marketing landing page
│   ├── SignUp.jsx       # Account creation
│   ├── Login.jsx        # Sign in
│   ├── Debug.jsx        # Database connectivity test
│   ├── Dashboard.jsx    # Main home screen
│   ├── Track.jsx        # Daily entry form
│   ├── Cycle.jsx        # Cycle tracking view
│   ├── Insights.jsx     # AI insights & patterns
│   ├── Me.jsx           # Profile & settings
│   └── onboarding/
│       ├── Goals.jsx    # Goal selection
│       └── Plan.jsx     # Personalized plan
├── services/
│   ├── supabase.js      # Supabase client with timeout handling
│   └── api.js           # API utilities
├── lib/                 # Pure utilities
├── hooks/               # Custom React hooks
└── styles/
    └── globals.css      # Global styles + Tailwind
```

## 🎨 Design System

She Tracks uses a warm, organic, feminine design language:

### Colors
- **Rose** (#D4896A) - Primary CTA, active states
- **Mauve** (#B07A8C) - Gradient partner, accents
- **Deep Brown** (#2D1B14) - Headings, text
- **Cream** (#FAF5EF) - App background
- **Sage** (#8FA98A) - Positive states, streaks

### Typography
- **Display/Headings**: Cormorant Garamond (serif)
- **Body/UI**: DM Sans (sans-serif)

See `she-tracks-style-guide.jsx` for the complete design system.

## 🗺️ Routes

### Public Routes
- `/` - Landing page
- `/signup` - Account creation
- `/login` - Sign in
- `/debug` - Database connectivity test

### Protected Routes
- `/onboarding/goals` - Goal selection
- `/onboarding/plan` - Personalized plan preview
- `/dashboard` - Main home screen (default after login)
- `/track` - Daily entry form
- `/cycle` - Cycle tracking calendar
- `/insights` - AI patterns & insights
- `/me` - Profile & settings

## 🔐 Authentication

Uses Supabase Auth with email/password. Sessions are managed via `AuthContext`.

Protected routes require authentication and automatically redirect to `/login`.

## 🗄️ Database Schema

All tables with RLS disabled for MVP:

- `users` - User accounts
- `user_settings` - Cycle & tracking preferences
- `goals` - User-selected wellbeing goals
- `cycle_logs` - Daily cycle tracking
- `mood_logs` - Mood entries
- `journal_entries` - Journal entries
- `habit_definitions` - Custom habits
- `habit_logs` - Daily habit completion
- `ai_summaries` - AI-generated summaries (daily/weekly/monthly)
- `notifications` - Notification preferences

## ✨ Features

### Currently Implemented (MVP)
- ✅ Authentication (signup, login, logout)
- ✅ Onboarding flow with goal selection
- ✅ Dashboard with stats, cycle wheel, AI summary mock
- ✅ Daily tracking (mood, cycle day, energy, habits, journal)
- ✅ Cycle calendar with phase visualization
- ✅ Insights page (patterns, mood, wins) with mock data
- ✅ Profile & settings page
- ✅ Bottom navigation
- ✅ Database connectivity debug page

### Coming Soon
- 🔜 Real database integration (currently mock data)
- 🔜 Actual AI summary generation via Claude API
- 🔜 Data persistence for all tracking entries
- 🔜 Weekly & monthly pattern calculation
- 🔜 Notification system
- 🔜 Data export
- 🔜 Account deletion

## 🛠️ Development

### Available Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI** (future): Anthropic Claude API

## 📝 Next Steps

1. **Connect Real Database**
   - Wire up all pages to actual Supabase queries
   - Replace mock data with real user data

2. **Implement AI Summaries**
   - Set up Claude API integration
   - Generate summaries on entry save
   - Store in `ai_summaries` table

3. **Add Data Validation**
   - Form validation on all inputs
   - Error handling for all API calls

4. **Enable RLS**
   - Add Row Level Security policies
   - Test with multiple users

5. **Polish & Testing**
   - Mobile responsiveness
   - Loading states
   - Error boundaries

## 🌸 Philosophy

"Every design decision should make the user feel seen, not tracked."

She Tracks is a mirror, not a monitor. The design prioritizes intimacy, warmth, and empowerment over clinical accuracy.

---

Built with 🌸 for your wellbeing.
