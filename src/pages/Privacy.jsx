import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@/components/ui';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-deep/60 hover:text-deep mb-6 flex items-center gap-2 text-sm"
        >
          ← Back
        </button>

        <Card className="mb-6">
          <h1 className="text-4xl font-serif text-deep mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted mb-8">Last updated: February 2026</p>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-serif text-deep mb-3">Your Data is Private</h2>
              <p className="text-text mb-3">
                She Tracks is designed with your privacy as the foundation. All your data —
                including cycle logs, moods, journal entries, and habits — is stored securely and
                privately in your personal account.
              </p>
              <p className="text-text">
                We never sell, share, or use your personal wellbeing data for advertising or any
                purpose other than providing you with insights about yourself.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">What We Collect</h2>
              <ul className="list-disc list-inside space-y-2 text-text">
                <li>Email address (for authentication)</li>
                <li>Username and date of birth (profile information)</li>
                <li>Cycle tracking data (cycle day, phase, period dates)</li>
                <li>Mood and energy logs</li>
                <li>Journal entries (your written reflections)</li>
                <li>Habit completion records</li>
                <li>AI-generated summaries based on your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">How We Use Your Data</h2>
              <p className="text-text mb-3">Your data is used exclusively to:</p>
              <ul className="list-disc list-inside space-y-2 text-text">
                <li>Display your tracking dashboard and statistics</li>
                <li>Calculate cycle phases and predictions</li>
                <li>Generate AI-powered pattern insights</li>
                <li>Store your journal entries privately</li>
                <li>Track your habit completion over time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">Data Storage & Security</h2>
              <p className="text-text mb-3">
                Your data is stored securely using Supabase (PostgreSQL database) with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text">
                <li>Encrypted connections (SSL/TLS)</li>
                <li>Secure authentication (password hashing)</li>
                <li>Regular backups</li>
                <li>Industry-standard security practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">AI & Third-Party Services</h2>
              <p className="text-text mb-3">
                We use Anthropic's Claude AI to generate personalized summaries and insights. When
                generating summaries:
              </p>
              <ul className="list-disc list-inside space-y-2 text-text">
                <li>Your data is sent temporarily to Claude API</li>
                <li>Summaries are generated and stored in your account</li>
                <li>No data is retained by Anthropic after generation</li>
                <li>No data is used to train AI models</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">Your Rights</h2>
              <p className="text-text mb-3">You have full control over your data:</p>
              <ul className="list-disc list-inside space-y-2 text-text">
                <li>
                  <strong>Export Your Data:</strong> Download all your data at any time from your
                  profile settings
                </li>
                <li>
                  <strong>Delete Your Account:</strong> Permanently delete your account and all
                  associated data
                </li>
                <li>
                  <strong>Edit Your Information:</strong> Update your profile, settings, and
                  preferences anytime
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">Data Retention</h2>
              <p className="text-text">
                Your data is retained as long as your account is active. When you delete your
                account, all data is permanently removed from our systems within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-deep mb-3">Contact</h2>
              <p className="text-text">
                For privacy questions or concerns, please contact us at privacy@shetracks.app
              </p>
            </section>
          </div>
        </Card>

        <Button variant="secondary" className="w-full" onClick={() => navigate(-1)}>
          Back to Settings
        </Button>
      </div>
    </div>
  );
}
