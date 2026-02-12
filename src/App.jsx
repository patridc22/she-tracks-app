import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import DebugPage from './pages/Debug';
import PrivacyPage from './pages/Privacy';

// Onboarding pages
import OnboardingGoalsPage from './pages/onboarding/Goals';
import OnboardingPlanPage from './pages/onboarding/Plan';

// Protected pages
import DashboardPage from './pages/Dashboard';
import TrackPage from './pages/Track';
import CyclePage from './pages/Cycle';
import InsightsPage from './pages/Insights';
import MePage from './pages/Me';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* Onboarding routes */}
        <Route
          path="/onboarding/goals"
          element={
            <ProtectedRoute>
              <OnboardingGoalsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/plan"
          element={
            <ProtectedRoute>
              <OnboardingPlanPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/track"
          element={
            <ProtectedRoute>
              <TrackPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cycle"
          element={
            <ProtectedRoute>
              <CyclePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <MePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
