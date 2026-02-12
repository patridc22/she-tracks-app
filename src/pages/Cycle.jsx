import { useState } from 'react';
import { Card, Badge, Button, Input } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

const PHASES = [
  {
    name: 'Menstruation',
    emoji: '🩸',
    days: '1-5',
    color: 'bg-red-100 text-red-700',
    description: 'Rest and reset. Low energy, introspective mood.',
  },
  {
    name: 'Follicular',
    emoji: '🌱',
    days: '6-13',
    color: 'bg-green-100 text-green-700',
    description: 'Rising energy, creative and optimistic.',
  },
  {
    name: 'Ovulation',
    emoji: '🌕',
    days: '14-16',
    color: 'bg-rose/20 text-rose',
    description: 'Peak energy, social and confident.',
  },
  {
    name: 'Luteal',
    emoji: '🍂',
    days: '17-28',
    color: 'bg-mauve/20 text-mauve',
    description: 'Gradual energy decline, introspective.',
  },
];

export default function CyclePage() {
  // Track if user has set up their cycle
  const [cycleSetUp, setCycleSetUp] = useState(false);
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [setupData, setSetupData] = useState({
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 5,
  });

  const currentDay = cycleSetUp ? 14 : 0;
  const currentPhase = cycleSetUp ? 'Ovulation' : null;
  const nextPeriod = cycleSetUp ? 'Feb 26' : null;

  // Calculate moon phase
  const getMoonPhase = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Simple moon phase calculation (approximate)
    const c = Math.floor((year - 1900) / 100);
    const e = (c - Math.floor(c / 4) - Math.floor((8 * c + 13) / 25) + 19 * year % 19) % 30;
    const phase = ((e + (11 * month) + day) % 30) / 30;

    if (phase < 0.125) return { name: 'New Moon', emoji: '🌑' };
    if (phase < 0.25) return { name: 'Waxing Crescent', emoji: '🌒' };
    if (phase < 0.375) return { name: 'First Quarter', emoji: '🌓' };
    if (phase < 0.5) return { name: 'Waxing Gibbous', emoji: '🌔' };
    if (phase < 0.625) return { name: 'Full Moon', emoji: '🌕' };
    if (phase < 0.75) return { name: 'Waning Gibbous', emoji: '🌖' };
    if (phase < 0.875) return { name: 'Last Quarter', emoji: '🌗' };
    return { name: 'Waning Crescent', emoji: '🌘' };
  };

  const moonPhase = getMoonPhase();

  const handleSetupSubmit = (e) => {
    e.preventDefault();
    setCycleSetUp(true);
    setShowSetupForm(false);
  };

  // Mock calendar data
  const generateCalendar = () => {
    const days = [];
    for (let i = 1; i <= 28; i++) {
      let phase = '';
      let color = '';
      if (i <= 5) {
        phase = 'menstruation';
        color = 'bg-red-200';
      } else if (i <= 13) {
        phase = 'follicular';
        color = 'bg-green-200';
      } else if (i <= 16) {
        phase = 'ovulation';
        color = 'bg-rose';
      } else {
        phase = 'luteal';
        color = 'bg-mauve';
      }
      days.push({ day: i, phase, color, isCurrent: i === currentDay });
    }
    return days;
  };

  const calendarDays = generateCalendar();

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif text-deep mb-2">
            Your <span className="italic text-rose">Cycle</span>
          </h1>
          <p className="text-sm text-muted">Track and understand your monthly rhythm</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Setup Form or Current Phase */}
        {!cycleSetUp ? (
          <Card variant="gradient">
            <div className="text-center py-4">
              <div className="text-6xl mb-4">🌸</div>
              <h2 className="text-2xl font-serif text-white mb-3">Set Up Your Cycle Tracking</h2>
              <p className="text-white/90 font-light mb-6">
                Enter your last period date to start tracking your cycle and unlock personalized
                insights.
              </p>
              {!showSetupForm ? (
                <Button
                  onClick={() => setShowSetupForm(true)}
                  className="bg-white text-rose hover:bg-white/90"
                >
                  Get Started →
                </Button>
              ) : (
                <form onSubmit={handleSetupSubmit} className="space-y-4 text-left mt-6">
                  <div>
                    <label className="text-xs font-medium text-white/90 uppercase tracking-wide mb-2 block">
                      When did your last period start?
                    </label>
                    <input
                      type="date"
                      value={setupData.lastPeriodDate}
                      onChange={(e) =>
                        setSetupData({ ...setupData, lastPeriodDate: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-button border-2 border-white/30 bg-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-white/90 uppercase tracking-wide mb-2 block">
                        Cycle length
                      </label>
                      <input
                        type="number"
                        value={setupData.cycleLength}
                        onChange={(e) =>
                          setSetupData({ ...setupData, cycleLength: e.target.value })
                        }
                        min="21"
                        max="35"
                        required
                        className="w-full px-4 py-3 rounded-button border-2 border-white/30 bg-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white"
                        placeholder="28"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/90 uppercase tracking-wide mb-2 block">
                        Period length
                      </label>
                      <input
                        type="number"
                        value={setupData.periodLength}
                        onChange={(e) =>
                          setSetupData({ ...setupData, periodLength: e.target.value })
                        }
                        min="3"
                        max="7"
                        required
                        className="w-full px-4 py-3 rounded-button border-2 border-white/30 bg-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white"
                        placeholder="5"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-white text-rose hover:bg-white/90">
                    Start Tracking
                  </Button>
                </form>
              )}
            </div>
          </Card>
        ) : (
          <Card variant="gradient">
            <Badge variant="ai" className="mb-3">
              ✦ CURRENT PHASE
            </Badge>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">🌕</span>
              <div>
                <h2 className="text-2xl font-serif text-white mb-1">{currentPhase}</h2>
                <p className="text-white/90 text-sm">Day {currentDay} of 28</p>
              </div>
            </div>
            <p className="text-white/95 font-light leading-relaxed">
              Peak energy and social connection. This is your power phase — great for important
              conversations, presentations, and creative projects.
            </p>
            <div className="mt-4 pt-4 border-t border-white/20 text-sm text-white/90">
              Next period predicted: <strong>{nextPeriod}</strong>
            </div>
          </Card>
        )}

        {/* Moon Phase */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Current Moon Phase</h2>
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-deep/5 to-mauve/5 rounded-button">
            <div className="text-6xl">{moonPhase.emoji}</div>
            <div>
              <h3 className="text-lg font-serif text-deep mb-1">{moonPhase.name}</h3>
              <p className="text-sm text-muted font-light">
                The moon's cycle can influence your energy and emotions, just like your menstrual cycle.
              </p>
            </div>
          </div>
        </Card>

        {/* 28-Day Calendar - Only show if cycle is set up */}
        {cycleSetUp && (
          <Card>
            <h2 className="text-xl font-serif text-deep mb-4">28-Day Overview</h2>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => (
                <div
                  key={day.day}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center
                    text-sm font-medium transition-all
                    ${day.color}
                    ${day.isCurrent ? 'ring-4 ring-deep scale-110 shadow-lg' : ''}
                    ${day.isCurrent ? 'text-white' : 'text-deep/70'}
                  `}
                >
                  {day.day}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-deep/10 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-200" />
                <span className="text-muted">Menstruation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-200" />
                <span className="text-muted">Follicular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-rose" />
                <span className="text-muted">Ovulation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-mauve" />
                <span className="text-muted">Luteal</span>
              </div>
            </div>
          </Card>
        )}

        {/* All Phases Info - Always visible */}
        <div className="space-y-3">
          <h2 className="text-xl font-serif text-deep">Understanding Your Phases</h2>
          {PHASES.map((phase) => (
            <Card
              key={phase.name}
              variant={cycleSetUp && phase.name === currentPhase ? 'bordered' : 'soft'}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{phase.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg text-deep">{phase.name}</h3>
                    <Badge variant="neutral" className="text-[10px]">
                      Days {phase.days}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted font-light">{phase.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cycle Settings - Only show if set up */}
        {cycleSetUp && (
          <Card variant="soft">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-deep mb-1">Cycle Settings</h3>
                <p className="text-xs text-muted">
                  Length: {setupData.cycleLength} days • Period: {setupData.periodLength} days
                </p>
              </div>
              <button className="text-sm text-rose font-medium">Edit →</button>
            </div>
          </Card>
        )}
      </div>

      <BottomNav active="cycle" />
    </div>
  );
}
