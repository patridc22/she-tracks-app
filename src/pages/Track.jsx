import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Textarea, Badge } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

const MOODS = [
  { id: 'energized', label: 'energized', emoji: '⚡' },
  { id: 'happy', label: 'happy', emoji: '😊' },
  { id: 'calm', label: 'calm', emoji: '🍃' },
  { id: 'tired', label: 'tired', emoji: '😴' },
  { id: 'anxious', label: 'anxious', emoji: '😰' },
  { id: 'sad', label: 'sad', emoji: '😢' },
];

const DEFAULT_HABITS = [
  { id: 'water', label: 'Water', emoji: '💧' },
  { id: 'sleep', label: 'Sleep', emoji: '💤' },
  { id: 'movement', label: 'Movement', emoji: '🏃' },
  { id: 'meals', label: 'Nourishing Meals', emoji: '🥗' },
];

export default function TrackPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    cycleDay: '',
    mood: '',
    energyScore: 3,
    journal: '',
    habits: {},
  });

  const handleMoodSelect = (moodId) => {
    setFormData({ ...formData, mood: moodId });
  };

  const toggleHabit = (habitId) => {
    setFormData({
      ...formData,
      habits: {
        ...formData.habits,
        [habitId]: !formData.habits[habitId],
      },
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Mock save - would actually save to database and generate AI summary
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    navigate('/dashboard');
  };

  const habitsCompleted = Object.values(formData.habits).filter(Boolean).length;
  const habitsTotal = DEFAULT_HABITS.length;

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-deep/60 hover:text-deep mb-4 flex items-center gap-2 text-sm"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-serif text-deep">
            How are you <span className="italic text-rose">today?</span>
          </h1>
          <p className="text-sm text-muted mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Cycle Day */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Cycle Day</h2>
          <Input
            type="number"
            min="1"
            max="60"
            value={formData.cycleDay}
            onChange={(e) => setFormData({ ...formData, cycleDay: e.target.value })}
            placeholder="Enter day of cycle (e.g. 14)"
            required
          />
          <p className="text-xs text-muted mt-2">
            Day 1 is the first day of your period. If you're not sure, make your best guess.
          </p>
        </Card>

        {/* Mood */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Mood</h2>
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                type="button"
                onClick={() => handleMoodSelect(mood.id)}
                className={`p-4 rounded-button border-2 transition-all ${
                  formData.mood === mood.id
                    ? 'border-rose bg-rose/10'
                    : 'border-deep/10 hover:border-rose/30'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-xs font-medium text-deep">{mood.label}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Energy Score */}
        {formData.mood && (
          <Card>
            <h2 className="text-xl font-serif text-deep mb-4">Energy Level</h2>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.energyScore}
                onChange={(e) =>
                  setFormData({ ...formData, energyScore: parseInt(e.target.value) })
                }
                className="flex-1 h-2 bg-deep/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-br
                  [&::-webkit-slider-thumb]:from-rose
                  [&::-webkit-slider-thumb]:to-mauve
                  [&::-webkit-slider-thumb]:shadow-rose-glow"
              />
              <div className="text-2xl font-serif text-deep w-12 text-center">
                {formData.energyScore}
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>Low</span>
              <span>High</span>
            </div>
          </Card>
        )}

        {/* Habits */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-deep">Today's Habits</h2>
            <Badge variant="sage">
              {habitsCompleted}/{habitsTotal}
            </Badge>
          </div>
          <div className="space-y-3">
            {DEFAULT_HABITS.map((habit) => (
              <button
                key={habit.id}
                type="button"
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center justify-between p-4 rounded-button border-2 transition-all ${
                  formData.habits[habit.id]
                    ? 'border-sage bg-sage/10'
                    : 'border-deep/10 hover:border-sage/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  <span className="text-sm font-medium text-deep">{habit.label}</span>
                </div>
                {formData.habits[habit.id] && <span className="text-sage text-xl">✓</span>}
              </button>
            ))}
          </div>
        </Card>

        {/* Journal */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Journal Entry (Optional)</h2>
          <Textarea
            value={formData.journal}
            onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
            placeholder="How are you feeling today? What's on your mind?"
            rows={6}
          />
          <p className="text-xs text-muted mt-2">
            Your words help the AI personalize your summaries. Everything is private.
          </p>
        </Card>

        {/* Save Button */}
        <Button
          type="submit"
          className="w-full text-base py-4"
          disabled={!formData.cycleDay || !formData.mood || saving}
        >
          {saving ? 'Saving...' : 'Save & Generate Summary'}
        </Button>
      </form>

      <BottomNav active="track" />
    </div>
  );
}
