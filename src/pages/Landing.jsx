import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-white/12 pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[20%] w-[200px] h-[200px] rounded-full bg-mauve/10 pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose to-mauve flex items-center justify-center text-2xl shadow-rose-glow">
              🌸
            </div>
            <h1 className="text-3xl font-serif font-light text-deep">
              Her <span className="italic text-rose">Daily</span>
            </h1>
          </div>
          <Link to="/login">
            <Button variant="secondary">Sign In</Button>
          </Link>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-light text-deep leading-tight mb-6">
            Stay attuned to your{' '}
            <span className="italic text-rose">wellbeing</span>
          </h2>
          <p className="text-lg text-muted mb-8 font-light leading-relaxed">
            Unify cycle tracking, mood logging, journaling, and habits into one beautiful
            dashboard. See the patterns behind how you feel with AI-powered insights.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-base px-12 py-5">
              Start Here →
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/40 backdrop-blur-sm rounded-card p-8 text-center">
            <div className="text-4xl mb-4">🌙</div>
            <h3 className="text-xl font-serif text-deep mb-3">Track Your Cycle</h3>
            <p className="text-sm text-muted font-light leading-relaxed">
              Understand your phase, predict your period, and see how your cycle affects your mood
              and energy.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-card p-8 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-serif text-deep mb-3">AI Insights</h3>
            <p className="text-sm text-muted font-light leading-relaxed">
              Get personalized daily, weekly, and monthly summaries that connect the dots between
              your patterns.
            </p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-card p-8 text-center">
            <div className="text-4xl mb-4">💖</div>
            <h3 className="text-xl font-serif text-deep mb-3">One Dashboard</h3>
            <p className="text-sm text-muted font-light leading-relaxed">
              No more juggling apps. Mood, journal, habits, and cycle all in one intimate,
              beautiful space.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-muted text-sm mb-4">Join women who choose to understand themselves better</p>
          <Link to="/signup">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-deep/10 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-muted mb-4">
            <Link to="/privacy" className="hover:text-rose transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/debug" className="hover:text-rose transition-colors">
              System Status
            </Link>
            <span>·</span>
            <a href="mailto:hello@herdaily.app" className="hover:text-rose transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-muted">© 2026 Her Daily. Made with 🌸 for your wellbeing.</p>
        </footer>
      </div>
    </div>
  );
}
