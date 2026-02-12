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
  const [cycleSetUp, setCycleSetUp] = useState(() => {
    const saved = localStorage.getItem('cycleSetup');
    return saved ? JSON.parse(saved).isSetUp : false;
  });
  const [showSetupForm, setShowSetupForm] = useState(false);
  const [showManualTracking, setShowManualTracking] = useState(false);
  const [setupData, setSetupData] = useState(() => {
    const saved = localStorage.getItem('cycleSetup');
    return saved ? JSON.parse(saved) : {
      lastPeriodDate: '',
      cycleLength: 28,
      periodLength: 5,
      manualPhase: null,
      manualDay: null,
    };
  });

  // Calculate current cycle day and phase
  const calculateCycleInfo = () => {
    if (!cycleSetUp || !setupData.lastPeriodDate) {
      return { currentDay: 0, currentPhase: null, nextPeriod: null, isManual: false };
    }

    // Use manual overrides if set
    if (setupData.manualPhase && setupData.manualDay) {
      const cycleLength = parseInt(setupData.cycleLength) || 28;
      const currentDay = parseInt(setupData.manualDay);
      const daysUntilNextPeriod = cycleLength - currentDay + 1;
      const today = new Date();
      const nextPeriodDate = new Date(today);
      nextPeriodDate.setDate(today.getDate() + daysUntilNextPeriod);
      const nextPeriod = nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      return {
        currentDay,
        currentPhase: setupData.manualPhase,
        nextPeriod,
        isManual: true
      };
    }

    // Auto-calculate from last period date
    const lastPeriod = new Date(setupData.lastPeriodDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastPeriod.setHours(0, 0, 0, 0);

    // Calculate days since last period
    const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));

    // Calculate current day in cycle (1-28+)
    const cycleLength = parseInt(setupData.cycleLength) || 28;
    const currentDay = (daysSinceLastPeriod % cycleLength) + 1;

    // Determine phase based on current day
    const periodLength = parseInt(setupData.periodLength) || 5;
    let currentPhase = '';

    if (currentDay <= periodLength) {
      currentPhase = 'Menstruation';
    } else if (currentDay <= 13) {
      currentPhase = 'Follicular';
    } else if (currentDay <= 16) {
      currentPhase = 'Ovulation';
    } else {
      currentPhase = 'Luteal';
    }

    // Calculate next period date
    const daysUntilNextPeriod = cycleLength - (daysSinceLastPeriod % cycleLength);
    const nextPeriodDate = new Date(today);
    nextPeriodDate.setDate(today.getDate() + daysUntilNextPeriod);
    const nextPeriod = nextPeriodDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return { currentDay, currentPhase, nextPeriod, isManual: false };
  };

  const { currentDay, currentPhase, nextPeriod, isManual } = calculateCycleInfo();

  const handleManualUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      ...setupData,
      isSetUp: true
    };
    localStorage.setItem('cycleSetup', JSON.stringify(updatedData));
    setSetupData(updatedData);
    setShowManualTracking(false);
  };

  // Get phase emoji
  const getPhaseEmoji = (phase) => {
    const emojis = {
      'Menstruation': '🩸',
      'Follicular': '🌱',
      'Ovulation': '🌕',
      'Luteal': '🍂',
    };
    return emojis[phase] || '🌸';
  };

  // Get phase description
  const getPhaseDescription = (phase) => {
    const descriptions = {
      'Menstruation': 'Rest and reset. Your body is shedding and renewing. Honor your need for slower pace and self-care.',
      'Follicular': 'Rising energy and creativity. You may feel more social, optimistic, and ready to start new projects.',
      'Ovulation': 'Peak energy and social connection. This is your power phase — great for important conversations, presentations, and creative projects.',
      'Luteal': 'Gradual energy decline and introspection. Focus on completing tasks and preparing for rest. Be gentle with yourself.',
    };
    return descriptions[phase] || '';
  };

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
    const updatedData = {
      ...setupData,
      isSetUp: true
    };
    localStorage.setItem('cycleSetup', JSON.stringify(updatedData));
    setCycleSetUp(true);
    setShowSetupForm(false);
  };

  // Generate month calendar with cycle data
  const generateMonthCalendar = () => {
    if (!cycleSetUp || !setupData.lastPeriodDate) return [];

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get first day of month and total days in month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const lastPeriod = new Date(setupData.lastPeriodDate);
    const cycleLength = parseInt(setupData.cycleLength) || 28;
    const periodLength = parseInt(setupData.periodLength) || 5;

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isEmpty: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0);

      // Calculate days since last period for this date
      const daysSinceLastPeriod = Math.floor((date - lastPeriod) / (1000 * 60 * 60 * 24));
      const cycleDay = (daysSinceLastPeriod % cycleLength) + 1;

      // Determine phase and styling
      let phase = '';
      let color = '';
      let emoji = '';

      if (cycleDay <= periodLength && daysSinceLastPeriod >= 0) {
        phase = 'period';
        color = 'bg-red-100 border-red-300';
        emoji = '🩸';
      } else if (cycleDay >= 14 && cycleDay <= 16 && daysSinceLastPeriod >= 0) {
        phase = 'ovulation';
        color = 'bg-rose/20 border-rose';
        emoji = '🌕';
      }

      const isToday = date.toDateString() === today.toDateString();

      days.push({
        date: day,
        cycleDay: daysSinceLastPeriod >= 0 ? cycleDay : null,
        phase,
        color,
        emoji,
        isToday,
        isEmpty: false
      });
    }

    return days;
  };

  const calendarDays = generateMonthCalendar();

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
        {!cycleSetUp || showSetupForm ? (
          <Card variant="gradient">
            <div className="text-center py-4">
              <div className="text-6xl mb-4">🌸</div>
              <h2 className="text-2xl font-serif text-white mb-3">
                {cycleSetUp ? 'Edit Your Cycle Settings' : 'Set Up Your Cycle Tracking'}
              </h2>
              <p className="text-white/90 font-light mb-6">
                {cycleSetUp
                  ? 'Update your cycle information to keep your tracking accurate.'
                  : 'Enter your last period date to start tracking your cycle and unlock personalized insights.'
                }
              </p>
              {!showSetupForm && !cycleSetUp ? (
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
                  <div className="flex gap-3">
                    {cycleSetUp && (
                      <Button
                        type="button"
                        onClick={() => setShowSetupForm(false)}
                        className="flex-1 bg-white/20 text-white hover:bg-white/30"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" className={`${cycleSetUp ? 'flex-1' : 'w-full'} bg-white text-rose hover:bg-white/90`}>
                      {cycleSetUp ? 'Save Changes' : 'Start Tracking'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        ) : (
          <Card variant="gradient">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="ai">
                ✦ CURRENT PHASE
              </Badge>
              {isManual && (
                <Badge variant="neutral" className="bg-white/20 text-white text-[10px]">
                  Manually adjusted
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{getPhaseEmoji(currentPhase)}</span>
              <div>
                <h2 className="text-2xl font-serif text-white mb-1">{currentPhase}</h2>
                <p className="text-white/90 text-sm">Day {currentDay} of {setupData.cycleLength}</p>
              </div>
            </div>
            <p className="text-white/95 font-light leading-relaxed">
              {getPhaseDescription(currentPhase)}
            </p>
            <div className="mt-4 pt-4 border-t border-white/20 text-sm text-white/90">
              Next period predicted: <strong>{nextPeriod}</strong>
            </div>
          </Card>
        )}

        {/* Manual Tracking Adjustment */}
        {cycleSetUp && !showSetupForm && (
          <Card variant="soft">
            {!showManualTracking ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted mb-3">
                  Not looking accurate? Adjust your cycle manually based on what's happening with your body.
                </p>
                <button
                  onClick={() => setShowManualTracking(true)}
                  className="text-sm text-rose font-medium hover:underline"
                >
                  Adjust manually →
                </button>
              </div>
            ) : (
              <form onSubmit={handleManualUpdate} className="space-y-4">
                <h3 className="font-serif text-lg text-deep mb-3">Update Your Current Cycle</h3>
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wide mb-2 block">
                    What phase are you in right now?
                  </label>
                  <select
                    value={setupData.manualPhase || ''}
                    onChange={(e) => setSetupData({ ...setupData, manualPhase: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-button border border-deep/20 bg-white text-deep focus:outline-none focus:ring-2 focus:ring-rose/50"
                  >
                    <option value="">Select your current phase</option>
                    <option value="Menstruation">🩸 Menstruation</option>
                    <option value="Follicular">🌱 Follicular</option>
                    <option value="Ovulation">🌕 Ovulation</option>
                    <option value="Luteal">🍂 Luteal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wide mb-2 block">
                    What day of your cycle are you on?
                  </label>
                  <input
                    type="number"
                    value={setupData.manualDay || ''}
                    onChange={(e) => setSetupData({ ...setupData, manualDay: e.target.value })}
                    min="1"
                    max={setupData.cycleLength}
                    required
                    placeholder={`1-${setupData.cycleLength}`}
                    className="w-full px-4 py-3 rounded-button border border-deep/20 bg-white text-deep placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose/50"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowManualTracking(false);
                      setSetupData({ ...setupData, manualPhase: null, manualDay: null });
                    }}
                    className="flex-1 bg-deep/10 text-deep hover:bg-deep/20"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-rose text-white hover:bg-rose/90">
                    Save
                  </Button>
                </div>
              </form>
            )}
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

        {/* Calendar - Only show if cycle is set up */}
        {cycleSetUp && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif text-deep">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <Badge variant="neutral" className="text-[10px]">
                Your Cycle Calendar
              </Badge>
            </div>

            {/* Week day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center
                    text-sm transition-all relative
                    ${day.isEmpty ? '' : 'hover:shadow-md cursor-pointer'}
                    ${day.color || 'bg-cream border border-deep/10'}
                    ${day.isToday ? 'ring-2 ring-deep font-bold' : ''}
                  `}
                >
                  {!day.isEmpty && (
                    <>
                      <span className={`${day.isToday ? 'text-deep' : 'text-deep/70'}`}>
                        {day.date}
                      </span>
                      {day.emoji && (
                        <span className="text-xs mt-0.5">{day.emoji}</span>
                      )}
                      {day.cycleDay && !day.emoji && (
                        <span className="text-[9px] text-muted/60">D{day.cycleDay}</span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-deep/10 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">🩸</span>
                <span className="text-muted">Period days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🌕</span>
                <span className="text-muted">Fertile window</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-deep" />
                <span className="text-muted">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted text-[10px]">D1</span>
                <span className="text-muted">Cycle day</span>
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

        {/* Cycle Settings - Only show if set up and not editing */}
        {cycleSetUp && !showSetupForm && (
          <Card variant="soft">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg text-deep mb-1">Cycle Settings</h3>
                <p className="text-xs text-muted">
                  Length: {setupData.cycleLength} days • Period: {setupData.periodLength} days
                </p>
              </div>
              <button
                onClick={() => setShowSetupForm(true)}
                className="text-sm text-rose font-medium hover:underline"
              >
                Edit →
              </button>
            </div>
          </Card>
        )}
      </div>

      <BottomNav active="cycle" />
    </div>
  );
}
