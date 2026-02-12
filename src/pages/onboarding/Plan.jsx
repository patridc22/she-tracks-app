import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '@/components/ui';

export default function OnboardingPlanPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-rose rounded-full" />
            <div className="h-1 w-12 bg-rose rounded-full" />
          </div>
          <p className="text-xs text-muted uppercase tracking-wide">Step 2 of 2</p>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-4xl font-serif text-deep mb-3">
            Your personalized <span className="italic text-rose">plan</span> is ready
          </h1>
          <p className="text-muted">Here's what your first 7 days will look like</p>
        </div>

        {/* AI Summary - Mock */}
        <Card variant="gradient" className="mb-6">
          <Badge variant="ai" className="mb-4">
            ✦ AI Generated
          </Badge>
          <p className="text-white/95 leading-relaxed font-light text-sm">
            Based on your goals to feel better in your body and sync with your cycle, we recommend
            starting with daily morning check-ins. Track your cycle day, log your mood, and
            complete 2-3 simple habits. After 7 days, you'll unlock pattern insights that show
            connections between your cycle phase and how you're feeling.
          </p>
        </Card>

        {/* Plan Cards */}
        <div className="space-y-4 mb-10">
          <Card variant="soft">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌅</span>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-deep mb-1">Daily Morning Check-In</h3>
                <p className="text-sm text-muted font-light">
                  5 minutes to log your cycle day, mood, and habits. Builds your dashboard in
                  real-time.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="soft">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📝</span>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-deep mb-1">Optional Journaling</h3>
                <p className="text-sm text-muted font-light">
                  Add a journal entry anytime. The AI will use your words to personalize your
                  summaries.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="soft">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔔</span>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-deep mb-1">Gentle Reminders</h3>
                <p className="text-sm text-muted font-light">
                  We'll send a daily reminder at 8am. You can adjust or turn off anytime in
                  settings.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="soft">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-deep mb-1">Insights Unlock in 7 Days</h3>
                <p className="text-sm text-muted font-light">
                  After one week, you'll see your first AI pattern insights and weekly summary.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Start Button */}
        <Button className="w-full text-base py-4" onClick={handleStart}>
          Start Tracking →
        </Button>

        <p className="text-center text-xs text-muted mt-4">
          You can change your preferences anytime in Settings
        </p>
      </div>
    </div>
  );
}
