import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, Badge, Button } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

export default function DashboardPage() {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'there';
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // New user default state - all zeros
  const stats = {
    streak: 0,
    moodPositive: 0,
    habitsCompleted: 0,
    journalCount: 0,
  };

  // Empty cycle state for new users
  const cycleData = {
    currentDay: 0,
    totalDays: 28,
    phase: 'Not set',
    phaseEmoji: '🌸',
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-12 mb-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted mb-1">{today}</p>
          <h1 className="text-3xl font-serif text-deep mb-6">
            Good morning, <span className="italic text-rose">{username}</span>
          </h1>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/90 text-rose rounded-full text-sm font-medium">
              Daily
            </button>
            <button className="px-4 py-2 bg-white/30 text-deep rounded-full text-sm font-medium">
              Weekly
            </button>
            <button className="px-4 py-2 bg-white/30 text-deep rounded-full text-sm font-medium">
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-6">
        {/* AI Summary */}
        <Card variant="gradient">
          <Badge variant="ai" className="mb-3">
            ✦ WELCOME
          </Badge>
          <p className="text-white/95 leading-relaxed font-light">
            Start tracking your cycle, mood, and habits to unlock personalized AI insights. Your first summary will generate after a few days of logging. Everything you track is private and secure 🌸
          </p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link to="/track">
              <button className="text-white/90 hover:text-white text-sm font-medium">
                Get started →
              </button>
            </Link>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-serif text-deep mb-1">{stats.streak}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted">
              <span>🔥</span>
              <span>day streak</span>
            </div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-serif text-deep mb-1">{stats.moodPositive}%</div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted">
              <span>😌</span>
              <span>positive mood</span>
            </div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-serif text-deep mb-1">{stats.habitsCompleted}%</div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted">
              <span>✅</span>
              <span>habits</span>
            </div>
          </Card>

          <Card className="text-center">
            <div className="text-3xl font-serif text-deep mb-1">{stats.journalCount}</div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted">
              <span>✍️</span>
              <span>journals</span>
            </div>
          </Card>
        </div>

        {/* Cycle Wheel */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-deep">Your Cycle</h2>
            <Link to="/cycle">
              <button className="text-sm text-rose font-medium">View full →</button>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Simplified cycle wheel */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="#E5DDD8"
                  strokeWidth="12"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeDasharray={`${(cycleData.currentDay / cycleData.totalDays) * 352} 352`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4896A" />
                    <stop offset="100%" stopColor="#B07A8C" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <div className="text-2xl font-serif text-deep">Day {cycleData.currentDay}</div>
                <div className="text-xs text-muted">of {cycleData.totalDays}</div>
              </div>
            </div>

            <div className="flex-1">
              <Badge variant="mauve" className="mb-2">
                {cycleData.phaseEmoji} {cycleData.phase} Phase
              </Badge>
              <p className="text-sm text-muted font-light leading-relaxed">
                Peak energy and social connection. Great time for important conversations and
                creative work.
              </p>
            </div>
          </div>
        </Card>

        {/* Journal Preview */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-deep">Today's Journal</h2>
            <Link to="/track">
              <button className="text-sm text-rose font-medium">Add entry →</button>
            </Link>
          </div>

          <div className="bg-cream rounded-lg p-4 border border-dashed border-deep/20 text-center">
            <div className="text-3xl mb-2">✍️</div>
            <p className="text-sm text-muted font-light">
              No journal entry yet today. Tap above to log your mood and reflections.
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/track">
            <Card className="hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center text-2xl">
                  📝
                </div>
                <div>
                  <h3 className="font-serif text-lg text-deep">Log Today</h3>
                  <p className="text-xs text-muted">Add mood, habits & journal</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/insights">
            <Card className="hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-mauve/10 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h3 className="font-serif text-lg text-deep">View Insights</h3>
                  <p className="text-xs text-muted">Patterns & trends</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
