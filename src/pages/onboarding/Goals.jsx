import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/ui';

const GOALS = [
  { id: 'body', label: 'Feel better in my body', emoji: '💪' },
  { id: 'cycle', label: 'Sync with my cycle', emoji: '🌙' },
  { id: 'habits', label: 'Build healthy habits', emoji: '✨' },
  { id: 'mood', label: 'Understand my mood', emoji: '🌈' },
  { id: 'energy', label: 'Boost my energy', emoji: '⚡' },
  { id: 'patterns', label: 'See my patterns', emoji: '📊' },
];

const WINDOWS = [
  { days: 30, label: '30 days', description: 'Quick start' },
  { days: 60, label: '60 days', description: 'Recommended' },
  { days: 90, label: '90 days', description: 'Deep insights' },
];

export default function OnboardingGoalsPage() {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedWindow, setSelectedWindow] = useState(60);

  const toggleGoal = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    // Store selections (would normally save to database)
    navigate('/onboarding/plan');
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-rose rounded-full" />
            <div className="h-1 w-12 bg-rose/20 rounded-full" />
          </div>
          <p className="text-xs text-muted uppercase tracking-wide">Step 1 of 2</p>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-deep mb-3">
            What brings you to <span className="italic text-rose">She Tracks?</span>
          </h1>
          <p className="text-muted">Select all that resonate with you</p>
        </div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {GOALS.map((goal) => (
            <Card
              key={goal.id}
              variant={selectedGoals.includes(goal.id) ? 'bordered' : 'default'}
              onClick={() => toggleGoal(goal.id)}
              className="cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{goal.emoji}</span>
                <span className="text-base font-medium text-deep">{goal.label}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Tracking Window */}
        <div className="mb-10">
          <h2 className="text-xl font-serif text-deep mb-4">Choose your tracking window</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {WINDOWS.map((window) => (
              <Card
                key={window.days}
                variant={selectedWindow === window.days ? 'gradient' : 'soft'}
                onClick={() => setSelectedWindow(window.days)}
                className={`cursor-pointer text-center ${
                  selectedWindow === window.days ? '' : 'hover:border-rose/30'
                }`}
              >
                <div
                  className={`text-2xl font-serif mb-1 ${
                    selectedWindow === window.days ? 'text-white' : 'text-deep'
                  }`}
                >
                  {window.label}
                </div>
                <div
                  className={`text-sm ${
                    selectedWindow === window.days ? 'text-white/90' : 'text-muted'
                  }`}
                >
                  {window.description}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          className="w-full"
          disabled={selectedGoals.length === 0}
          onClick={handleContinue}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}
