import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Textarea, Badge } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

const MOODS = [
  { id: 'energized', label: 'energized', emoji: '⚡' },
  { id: 'happy', label: 'happy', emoji: '😊' },
  { id: 'calm', label: 'calm', emoji: '🍃' },
  { id: 'relaxed', label: 'relaxed', emoji: '😌' },
  { id: 'tired', label: 'tired', emoji: '😴' },
  { id: 'anxious', label: 'anxious', emoji: '😰' },
  { id: 'sad', label: 'sad', emoji: '😢' },
  { id: 'frustrated', label: 'frustrated', emoji: '😤' },
  { id: 'angry', label: 'angry', emoji: '😠' },
  { id: 'self-conscious', label: 'self-conscious', emoji: '😳' },
  { id: 'self-doubt', label: 'self-doubt', emoji: '😔' },
  { id: 'apathetic', label: 'apathetic', emoji: '😐' },
  { id: 'numb', label: 'numb', emoji: '😶' },
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
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    cycleDay: '',
    cyclePhase: '',
    moods: [],
    energyScore: 3,
    journal: '',
    proudOf: '',
    gratefulFor: '',
    manifestation: '',
    habits: {},
    waterGlasses: 0,
    sleepHours: 0,
    movementType: '',
    meals: 0,
    snacks: 0,
  });

  const CYCLE_PHASES = [
    { id: 'menstruation', label: 'Menstruation', emoji: '🩸' },
    { id: 'follicular', label: 'Follicular', emoji: '🌱' },
    { id: 'ovulation', label: 'Ovulation', emoji: '🌕' },
    { id: 'luteal', label: 'Luteal', emoji: '🍂' },
  ];

  const MOVEMENT_TYPES = [
    { id: 'none', label: 'None', emoji: '🛋️' },
    { id: 'yoga', label: 'Yoga', emoji: '🧘' },
    { id: 'running', label: 'Running', emoji: '🏃' },
    { id: 'walking', label: 'Walking', emoji: '🚶' },
    { id: 'gym', label: 'Gym', emoji: '🏋️' },
    { id: 'dance', label: 'Dance', emoji: '💃' },
    { id: 'cycling', label: 'Cycling', emoji: '🚴' },
    { id: 'swimming', label: 'Swimming', emoji: '🏊' },
    { id: 'other', label: 'Other', emoji: '✨' },
  ];

  const handleMoodSelect = (moodId) => {
    const currentMoods = formData.moods;
    const isSelected = currentMoods.includes(moodId);

    setFormData({
      ...formData,
      moods: isSelected
        ? currentMoods.filter(id => id !== moodId)
        : [...currentMoods, moodId]
    });
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

    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    const savedData = {
      ...formData,
      date: today,
      timestamp: new Date().toISOString(),
    };

    // Get existing entries
    const existingEntries = JSON.parse(localStorage.getItem('trackingEntries') || '[]');

    // Remove any existing entry for today and add new one
    const updatedEntries = existingEntries.filter(entry => entry.date !== today);
    updatedEntries.push(savedData);

    localStorage.setItem('trackingEntries', JSON.stringify(updatedEntries));
    localStorage.setItem('latestEntry', JSON.stringify(savedData));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    setShowSuccess(true);

    // Show success animation for 2 seconds then navigate
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const habitsCompleted = Object.values(formData.habits).filter(Boolean).length;
  const habitsTotal = DEFAULT_HABITS.length;

  return (
    <div className="min-h-screen bg-cream pb-24 relative">
      {/* Success Sparkle Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep/20 backdrop-blur-sm animate-fadeIn">
          <div className="text-center animate-scaleIn">
            <div className="text-8xl mb-4 animate-bounce">✨</div>
            <h2 className="text-3xl font-serif text-deep mb-2">Amazing!</h2>
            <p className="text-lg text-muted">Your day has been saved</p>
            <div className="flex gap-4 justify-center mt-4 text-4xl">
              <span className="animate-pulse">🌸</span>
              <span className="animate-pulse delay-100">✨</span>
              <span className="animate-pulse delay-200">💫</span>
            </div>
          </div>
        </div>
      )}
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
        {/* Cycle Phase */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Where are you in your cycle?</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {CYCLE_PHASES.map((phase) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => setFormData({ ...formData, cyclePhase: phase.id })}
                className={`p-4 rounded-button border-2 transition-all ${
                  formData.cyclePhase === phase.id
                    ? 'border-mauve bg-mauve/10'
                    : 'border-deep/10 hover:border-mauve/30'
                }`}
              >
                <div className="text-3xl mb-2">{phase.emoji}</div>
                <div className="text-xs font-medium text-deep">{phase.label}</div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-deep/10">
            <label className="text-sm font-medium text-deep mb-2 block">
              Cycle Day (Optional)
            </label>
            <Input
              type="number"
              min="1"
              max="60"
              value={formData.cycleDay}
              onChange={(e) => setFormData({ ...formData, cycleDay: e.target.value })}
              placeholder="e.g. 14"
            />
            <p className="text-xs text-muted mt-2">
              Day 1 is the first day of your period.
            </p>
          </div>
        </Card>

        {/* Mood */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Mood</h2>
          <p className="text-xs text-muted mb-3">Select all that apply</p>
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                type="button"
                onClick={() => handleMoodSelect(mood.id)}
                className={`p-4 rounded-button border-2 transition-all ${
                  formData.moods.includes(mood.id)
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
        {formData.moods.length > 0 && (
          <Card>
            <h2 className="text-xl font-serif text-deep mb-4">Energy Level</h2>
            <div className="mb-4">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.energyScore}
                onChange={(e) =>
                  setFormData({ ...formData, energyScore: parseInt(e.target.value) })
                }
                className="w-full h-3 bg-deep/10 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8
                  [&::-webkit-slider-thumb]:h-8
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-br
                  [&::-webkit-slider-thumb]:from-rose
                  [&::-webkit-slider-thumb]:to-mauve
                  [&::-webkit-slider-thumb]:shadow-rose-glow
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-8
                  [&::-moz-range-thumb]:h-8
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-gradient-to-br
                  [&::-moz-range-thumb]:from-rose
                  [&::-moz-range-thumb]:to-mauve
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-2 px-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({ ...formData, energyScore: num })}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      formData.energyScore === num
                        ? 'bg-gradient-to-br from-rose to-mauve text-white shadow-rose-glow'
                        : 'bg-deep/5 text-deep hover:bg-deep/10'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted px-1">
              <span>🔋 Low</span>
              <span>⚡ High</span>
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
              <div key={habit.id}>
                {habit.id === 'water' ? (
                  <div className="p-4 rounded-button border-2 border-deep/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{habit.emoji}</span>
                        <span className="text-sm font-medium text-deep">{habit.label}</span>
                      </div>
                      {formData.waterGlasses > 0 && (
                        <span className="text-sage text-xl">✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            waterGlasses: Math.max(0, formData.waterGlasses - 1),
                          })
                        }
                        className="w-10 h-10 rounded-full bg-deep/10 hover:bg-deep/20 flex items-center justify-center text-deep font-bold"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-serif text-deep">
                          {formData.waterGlasses}
                        </div>
                        <div className="text-xs text-muted">glasses (250ml)</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            waterGlasses: formData.waterGlasses + 1,
                          })
                        }
                        className="w-10 h-10 rounded-full bg-sage/20 hover:bg-sage/30 flex items-center justify-center text-sage font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : habit.id === 'sleep' ? (
                  <div className="p-4 rounded-button border-2 border-deep/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{habit.emoji}</span>
                        <span className="text-sm font-medium text-deep">{habit.label}</span>
                      </div>
                      {formData.sleepHours > 0 && (
                        <span className="text-sage text-xl">✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            sleepHours: Math.max(0, formData.sleepHours - 0.5),
                          })
                        }
                        className="w-10 h-10 rounded-full bg-deep/10 hover:bg-deep/20 flex items-center justify-center text-deep font-bold"
                      >
                        −
                      </button>
                      <div className="flex-1 text-center">
                        <div className="text-2xl font-serif text-deep">
                          {formData.sleepHours}
                        </div>
                        <div className="text-xs text-muted">hours</div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            sleepHours: formData.sleepHours + 0.5,
                          })
                        }
                        className="w-10 h-10 rounded-full bg-sage/20 hover:bg-sage/30 flex items-center justify-center text-sage font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : habit.id === 'movement' ? (
                  <div className="p-4 rounded-button border-2 border-deep/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{habit.emoji}</span>
                        <span className="text-sm font-medium text-deep">{habit.label}</span>
                      </div>
                      {formData.movementType && (
                        <span className="text-sage text-xl">✓</span>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {MOVEMENT_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              movementType: formData.movementType === type.id ? '' : type.id,
                            })
                          }
                          className={`p-2 rounded-button border-2 transition-all ${
                            formData.movementType === type.id
                              ? 'border-sage bg-sage/10'
                              : 'border-deep/10 hover:border-sage/30'
                          }`}
                        >
                          <div className="text-2xl mb-1">{type.emoji}</div>
                          <div className="text-[10px] font-medium text-deep">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : habit.id === 'meals' ? (
                  <div className="p-4 rounded-button border-2 border-deep/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{habit.emoji}</span>
                        <span className="text-sm font-medium text-deep">{habit.label}</span>
                      </div>
                      {(formData.meals > 0 || formData.snacks > 0) && (
                        <span className="text-sage text-xl">✓</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted mb-2 text-center">Meals</div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                meals: Math.max(0, formData.meals - 1),
                              })
                            }
                            className="w-8 h-8 rounded-full bg-deep/10 hover:bg-deep/20 flex items-center justify-center text-deep font-bold text-sm"
                          >
                            −
                          </button>
                          <div className="flex-1 text-center text-xl font-serif text-deep">
                            {formData.meals}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                meals: formData.meals + 1,
                              })
                            }
                            className="w-8 h-8 rounded-full bg-sage/20 hover:bg-sage/30 flex items-center justify-center text-sage font-bold text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted mb-2 text-center">Snacks</div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                snacks: Math.max(0, formData.snacks - 1),
                              })
                            }
                            className="w-8 h-8 rounded-full bg-deep/10 hover:bg-deep/20 flex items-center justify-center text-deep font-bold text-sm"
                          >
                            −
                          </button>
                          <div className="flex-1 text-center text-xl font-serif text-deep">
                            {formData.snacks}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                snacks: formData.snacks + 1,
                              })
                            }
                            className="w-8 h-8 rounded-full bg-sage/20 hover:bg-sage/30 flex items-center justify-center text-sage font-bold text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
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
                )}
              </div>
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

        {/* Reflections */}
        <Card variant="soft">
          <h2 className="text-xl font-serif text-deep mb-4">✨ Reflections</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-deep mb-2 block">
                What I'm proud of myself for today
              </label>
              <Textarea
                value={formData.proudOf}
                onChange={(e) => setFormData({ ...formData, proudOf: e.target.value })}
                placeholder="Celebrate your wins, big or small..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-deep mb-2 block">
                What I'm grateful for today
              </label>
              <Textarea
                value={formData.gratefulFor}
                onChange={(e) => setFormData({ ...formData, gratefulFor: e.target.value })}
                placeholder="What brought you joy or peace today?"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-deep mb-2 block">
                ✨ What I want to manifest/create/attract next
              </label>
              <Textarea
                value={formData.manifestation}
                onChange={(e) => setFormData({ ...formData, manifestation: e.target.value })}
                placeholder="Set your intentions and dreams..."
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button
          type="submit"
          className="w-full text-base py-4"
          disabled={formData.moods.length === 0 || saving}
        >
          {saving ? 'Saving...' : 'Save & Generate Summary'}
        </Button>
      </form>

      <BottomNav active="track" />
    </div>
  );
}
