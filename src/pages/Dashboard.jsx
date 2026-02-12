import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, Badge, Button } from '@/components/ui';
import BottomNav from '@/components/BottomNav';
import { trackingService } from '@/services/trackingService';

const DAILY_AFFIRMATIONS = [
  "You are exactly where you need to be 🌸",
  "Your feelings are valid and deserve attention",
  "You're doing better than you think",
  "Rest is productive, not lazy",
  "You deserve the same compassion you give others",
  "Your worth isn't measured by your productivity",
  "It's okay to prioritize yourself today",
];

function getDailyAffirmation() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return DAILY_AFFIRMATIONS[dayOfYear % DAILY_AFFIRMATIONS.length];
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [timeView, setTimeView] = useState('daily');
  const [journalEntry, setJournalEntry] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);
  const [latestEntry, setLatestEntry] = useState(null);
  const [allEntries, setAllEntries] = useState([]);

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'there';

  const handleSaveJournal = async () => {
    // Save journal to localStorage
    const today = new Date().toISOString().split('T')[0];
    const updatedEntry = { ...latestEntry, journal: journalEntry, date: today };
    localStorage.setItem('latestEntry', JSON.stringify(updatedEntry));

    await new Promise((resolve) => setTimeout(resolve, 500));
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 2000);
  };

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        // Try to load from Supabase first
        const [latest, entries] = await Promise.all([
          trackingService.getLatestEntry(user.id),
          trackingService.getUserEntries(user.id, 30)
        ]);

        setLatestEntry(latest);
        setAllEntries(entries);
        if (latest?.journal) {
          setJournalEntry(latest.journal);
        }
      } catch (error) {
        console.error('Error loading from Supabase, falling back to localStorage:', error);
        // Fallback to localStorage
        const latest = JSON.parse(localStorage.getItem('latestEntry') || 'null');
        const entries = JSON.parse(localStorage.getItem('trackingEntries') || '[]');
        setLatestEntry(latest);
        setAllEntries(entries);
        if (latest?.journal) {
          setJournalEntry(latest.journal);
        }
      }
    }

    loadData();
  }, [user]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Calculate stats from entries
  const calculateStats = () => {
    if (allEntries.length === 0) {
      return { streak: 0, moodPositive: 0, habitsCompleted: 0, journalCount: 0 };
    }

    // Calculate streak
    const sortedEntries = [...allEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      const dayDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));

      if (dayDiff === streak) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate positive mood percentage
    const positiveMoods = ['happy', 'calm', 'energized', 'relaxed'];
    const moodEntries = allEntries.filter(e => e.moods && e.moods.length > 0);
    const positiveCount = moodEntries.filter(e =>
      e.moods.some(mood => positiveMoods.includes(mood))
    ).length;
    const moodPositive = moodEntries.length > 0
      ? Math.round((positiveCount / moodEntries.length) * 100)
      : 0;

    // Calculate habits completed
    const entriesWithHabits = allEntries.filter(e =>
      e.waterGlasses > 0 || e.sleepHours > 0 || e.movementType || e.meals > 0
    );
    const habitsCompleted = allEntries.length > 0
      ? Math.round((entriesWithHabits.length / allEntries.length) * 100)
      : 0;

    // Count journal entries
    const journalCount = allEntries.filter(e => e.journal && e.journal.trim().length > 0).length;

    return { streak, moodPositive, habitsCompleted, journalCount };
  };

  const stats = calculateStats();

  // Get cycle data from latest entry
  const cycleData = latestEntry?.cyclePhase ? {
    currentDay: latestEntry.cycleDay || 0,
    totalDays: 28,
    phase: latestEntry.cyclePhase.charAt(0).toUpperCase() + latestEntry.cyclePhase.slice(1),
    phaseEmoji: getPhaseEmoji(latestEntry.cyclePhase),
  } : {
    currentDay: 0,
    totalDays: 28,
    phase: 'Not set',
    phaseEmoji: '🌸',
  };

  function getPhaseEmoji(phase) {
    const emojis = {
      menstruation: '🩸',
      follicular: '🌱',
      ovulation: '🌕',
      luteal: '🍂',
    };
    return emojis[phase] || '🌸';
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-12 mb-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted mb-1">{today}</p>
          <h1 className="text-3xl font-serif text-deep mb-2">
            Hey <span className="italic text-rose">{username}</span>, how are you doing today?
          </h1>
          <p className="text-sm text-muted font-light">Take a moment to check in with yourself 🌸</p>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setTimeView('daily')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeView === 'daily'
                  ? 'bg-white/90 text-rose'
                  : 'bg-white/30 text-deep hover:bg-white/50'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeView('weekly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeView === 'weekly'
                  ? 'bg-white/90 text-rose'
                  : 'bg-white/30 text-deep hover:bg-white/50'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeView('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeView === 'monthly'
                  ? 'bg-white/90 text-rose'
                  : 'bg-white/30 text-deep hover:bg-white/50'
              }`}
            >
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
            <button
              onClick={handleSaveJournal}
              className="text-sm text-rose font-medium hover:underline"
            >
              {journalSaved ? '✓ Saved!' : 'Save →'}
            </button>
          </div>

          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?..."
            className="w-full min-h-[120px] bg-cream rounded-lg p-4 border border-deep/20 text-deep placeholder:text-muted font-light leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-rose/50 focus:border-rose"
            rows={5}
          />
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

          <Link to="/track">
            <Card className="hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-mauve/10 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <div>
                  <h3 className="font-serif text-lg text-deep">Glow Up</h3>
                  <p className="text-xs text-muted">Affirmations & meditations</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Daily Affirmation */}
        <Card variant="gradient" className="mt-6">
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-xl font-serif text-white mb-2">Today's Affirmation</p>
            <p className="text-white/95 font-light leading-relaxed text-lg">
              {getDailyAffirmation()}
            </p>
          </div>
        </Card>

        {/* Insights Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-serif text-deep mb-4">
            Your <span className="italic text-rose">Insights</span>
          </h2>

          {allEntries.length === 0 ? (
            <Card variant="soft">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-serif text-deep mb-3">No Insights Yet</h3>
                <p className="text-sm text-muted font-light leading-relaxed max-w-md mx-auto">
                  Start tracking your daily moods, habits, and cycle to unlock AI-powered insights.
                  Patterns will appear after a few days of consistent logging.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              <Card>
                <h3 className="font-serif text-xl text-deep mb-4">Mood Distribution</h3>
                <div className="space-y-3">
                  {[
                    { mood: 'Calm', emoji: '🍃', percent: 35, color: 'bg-sage' },
                    { mood: 'Happy', emoji: '😊', percent: 28, color: 'bg-rose' },
                    { mood: 'Energized', emoji: '⚡', percent: 22, color: 'bg-mauve' },
                  ].map((item) => (
                    <div key={item.mood}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <span>{item.emoji}</span>
                          <span className="text-deep font-medium">{item.mood}</span>
                        </div>
                        <span className="text-sm text-muted">{item.percent}%</span>
                      </div>
                      <div className="h-2 bg-deep/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}
