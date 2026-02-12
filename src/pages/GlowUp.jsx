import { useState } from 'react';
import { Card, Badge } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

const AFFIRMATIONS = [
  {
    category: 'Self-Love',
    items: [
      "I am worthy of love and belonging exactly as I am",
      "My body is my home, and I treat it with kindness",
      "I honor my feelings without judgment",
      "I am enough, just as I am in this moment",
    ]
  },
  {
    category: 'Cycle Alignment',
    items: [
      "I trust the natural rhythm of my body",
      "Each phase of my cycle brings unique gifts",
      "I honor my need for rest during menstruation",
      "My cycle is a source of power, not inconvenience",
    ]
  },
  {
    category: 'Daily Strength',
    items: [
      "I am capable of handling whatever today brings",
      "Rest is productive and necessary",
      "I choose progress over perfection",
      "My worth is not determined by my productivity",
    ]
  },
];

const MEDITATIONS = [
  {
    title: "Morning Grounding",
    duration: "5 min",
    description: "Start your day centered and calm",
    emoji: "🌅",
    audioUrl: "#" // Placeholder
  },
  {
    title: "Cycle Sync",
    duration: "10 min",
    description: "Connect with your body's natural rhythm",
    emoji: "🌙",
    audioUrl: "#"
  },
  {
    title: "Evening Wind Down",
    duration: "8 min",
    description: "Release the day and prepare for rest",
    emoji: "✨",
    audioUrl: "#"
  },
  {
    title: "Self-Compassion",
    duration: "7 min",
    description: "Cultivate kindness towards yourself",
    emoji: "💖",
    audioUrl: "#"
  },
];

export default function GlowUpPage() {
  const [activeTab, setActiveTab] = useState('affirmations');

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif text-deep mb-2">
            Your <span className="italic text-rose">Glow Up</span>
          </h1>
          <p className="text-sm text-muted">Affirmations & meditations for your wellbeing</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('affirmations')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'affirmations'
                ? 'bg-rose text-white'
                : 'bg-white text-muted hover:bg-rose/10'
            }`}
          >
            Affirmations
          </button>
          <button
            onClick={() => setActiveTab('meditations')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'meditations'
                ? 'bg-rose text-white'
                : 'bg-white text-muted hover:bg-rose/10'
            }`}
          >
            Meditations
          </button>
        </div>

        {/* Affirmations Tab */}
        {activeTab === 'affirmations' && (
          <div className="space-y-6">
            {AFFIRMATIONS.map((category) => (
              <Card key={category.category}>
                <h3 className="font-serif text-lg text-deep mb-4 flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((affirmation, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gradient-to-br from-rose/5 to-mauve/5 rounded-button"
                    >
                      <p className="text-sm text-deep font-light leading-relaxed">
                        {affirmation}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Meditations Tab */}
        {activeTab === 'meditations' && (
          <div className="space-y-4">
            {MEDITATIONS.map((meditation) => (
              <Card key={meditation.title} className="hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose to-mauve flex items-center justify-center text-3xl shadow-rose-glow">
                    {meditation.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-lg text-deep">{meditation.title}</h3>
                      <Badge variant="neutral" className="text-[10px]">
                        {meditation.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted font-light mb-3">
                      {meditation.description}
                    </p>
                    <button className="text-sm text-rose font-medium hover:underline">
                      Play →
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            <Card variant="soft">
              <div className="text-center py-4">
                <p className="text-sm text-muted font-light">
                  More meditations coming soon! 🎧
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>

      <BottomNav active="glowup" />
    </div>
  );
}
