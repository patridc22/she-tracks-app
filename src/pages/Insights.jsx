import { useState } from 'react';
import { Card, Badge } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState('patterns');
  const [hasData, setHasData] = useState(false); // Set to true once user has tracked data

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif text-deep mb-2">
            Your <span className="italic text-rose">Insights</span>
          </h1>
          <p className="text-sm text-muted">AI-powered patterns from your tracking</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'patterns'
                ? 'bg-rose text-white'
                : 'bg-white text-muted hover:bg-rose/10'
            }`}
          >
            Patterns
          </button>
          <button
            onClick={() => setActiveTab('mood')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'mood'
                ? 'bg-rose text-white'
                : 'bg-white text-muted hover:bg-rose/10'
            }`}
          >
            Mood
          </button>
          <button
            onClick={() => setActiveTab('wins')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'wins'
                ? 'bg-rose text-white'
                : 'bg-white text-muted hover:bg-rose/10'
            }`}
          >
            Wins
          </button>
        </div>

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div className="space-y-4">
            {!hasData ? (
              <Card variant="soft">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-serif text-deep mb-3">No Patterns Yet</h3>
                  <p className="text-sm text-muted font-light leading-relaxed max-w-md mx-auto">
                    Start tracking your daily moods, habits, and cycle to unlock AI-powered insights.
                    Patterns will appear after a few days of consistent logging.
                  </p>
                </div>
              </Card>
            ) : (
              <>
            <Card variant="gradient">
              <Badge variant="ai" className="mb-3">
                ✦ WEEKLY PATTERN
              </Badge>
              <p className="text-white/95 font-light leading-relaxed mb-3">
                Your sleep quality is strongly linked to your mood the next day. On days when you
                logged 7+ hours, your mood was 85% more likely to be positive or calm.
              </p>
              <div className="text-xs text-white/80">Based on 7 days of tracking</div>
            </Card>

            <Card>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">🌙</span>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-deep mb-1">Cycle Phase Connection</h3>
                  <p className="text-sm text-muted font-light leading-relaxed">
                    During your ovulation phase (Days 13-16), you consistently log higher energy
                    scores and complete 40% more habits.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-deep/10 text-xs text-muted">
                Strength: <strong className="text-rose">High</strong>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">💧</span>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-deep mb-1">Hydration Impact</h3>
                  <p className="text-sm text-muted font-light leading-relaxed">
                    On days when you complete the water habit, your energy score averages 4.2 vs
                    3.1 on days you skip it.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-deep/10 text-xs text-muted">
                Strength: <strong className="text-rose">Medium</strong>
              </div>
            </Card>

            <Card variant="soft">
              <div className="text-center py-4">
                <div className="text-3xl mb-2">📈</div>
                <p className="text-sm text-muted font-light">
                  Keep tracking to unlock more insights. Monthly patterns available after 28 days.
                </p>
              </div>
            </Card>
            </>
            )}
          </div>
        )}

        {/* Mood Tab */}
        {activeTab === 'mood' && (
          <div className="space-y-4">
            <Card>
              <h3 className="font-serif text-xl text-deep mb-4">Mood Distribution</h3>
              <div className="space-y-3">
                {[
                  { mood: 'Calm', emoji: '🍃', percent: 35, color: 'bg-sage' },
                  { mood: 'Happy', emoji: '😊', percent: 28, color: 'bg-rose' },
                  { mood: 'Energized', emoji: '⚡', percent: 22, color: 'bg-mauve' },
                  { mood: 'Tired', emoji: '😴', percent: 10, color: 'bg-deep/30' },
                  { mood: 'Anxious', emoji: '😰', percent: 5, color: 'bg-red-300' },
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

            <Card variant="gradient">
              <Badge variant="ai" className="mb-3">
                ✦ MOOD INSIGHT
              </Badge>
              <p className="text-white/95 font-light leading-relaxed">
                74% of your logged moods this month were positive (calm, happy, energized). Your
                most common mood is "calm", particularly during Days 6-13 of your cycle.
              </p>
            </Card>
          </div>
        )}

        {/* Wins Tab */}
        {activeTab === 'wins' && (
          <div className="space-y-4">
            <Card variant="gradient">
              <div className="text-center py-4">
                <div className="text-6xl mb-3">🔥</div>
                <div className="text-5xl font-serif text-white mb-2">14</div>
                <div className="text-white/90 text-sm font-light">Day Tracking Streak</div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <div className="text-4xl font-serif text-deep mb-1">11</div>
                <div className="text-xs text-muted">Journal Entries</div>
              </Card>
              <Card className="text-center">
                <div className="text-4xl font-serif text-deep mb-1">68%</div>
                <div className="text-xs text-muted">Habit Completion</div>
              </Card>
            </div>

            <Card>
              <h3 className="font-serif text-lg text-deep mb-3">Recent Wins</h3>
              <div className="space-y-3">
                {[
                  { text: 'Completed all 4 habits for 3 days in a row', date: 'Feb 10-12' },
                  { text: 'Logged your mood every day this week', date: 'Week of Feb 5' },
                  { text: 'Wrote 5 journal entries this month', date: 'February 2026' },
                ].map((win, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-sage/10 rounded-lg">
                    <span className="text-xl">🏆</span>
                    <div>
                      <p className="text-sm text-deep font-medium">{win.text}</p>
                      <p className="text-xs text-muted mt-0.5">{win.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="soft">
              <div className="text-center py-3">
                <p className="text-sm text-muted font-light">
                  Keep going! Reach 30 days to unlock monthly achievements 🌟
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>

      <BottomNav active="insights" />
    </div>
  );
}
