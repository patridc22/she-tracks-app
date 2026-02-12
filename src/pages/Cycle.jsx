import { Card, Badge } from '@/components/ui';
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
  const currentDay = 14;
  const currentPhase = 'Ovulation';
  const nextPeriod = 'Feb 26';

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
        {/* Current Phase */}
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

        {/* 28-Day Calendar */}
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

        {/* All Phases Accordion */}
        <div className="space-y-3">
          <h2 className="text-xl font-serif text-deep">All Phases</h2>
          {PHASES.map((phase) => (
            <Card key={phase.name} variant={phase.name === currentPhase ? 'bordered' : 'soft'}>
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

        {/* Cycle Settings */}
        <Card variant="soft">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg text-deep mb-1">Cycle Settings</h3>
              <p className="text-xs text-muted">Length: 28 days • Period: 5 days</p>
            </div>
            <button className="text-sm text-rose font-medium">Edit →</button>
          </div>
        </Card>
      </div>

      <BottomNav active="cycle" />
    </div>
  );
}
