import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Card } from '@/components/ui';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await signIn(formData.email, formData.password);

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
    } else if (data) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌸</div>
          <h1 className="text-3xl font-serif text-deep mb-2">
            Welcome back to <span className="italic text-rose">She Tracks</span>
          </h1>
          <p className="text-sm text-muted">Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose/10 border border-rose/20 rounded-lg text-sm">
            <div className="text-rose font-medium mb-1">⚠ {error}</div>
            {error.includes('Email not confirmed') && (
              <div className="text-xs text-muted mt-2">
                Please check your email for a confirmation link, or disable email confirmation in
                your Supabase Dashboard (Authentication → Settings).
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-rose font-medium hover:underline">
            Create one
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-muted">
          <Link to="/privacy" className="hover:text-rose transition-colors">
            Privacy Policy
          </Link>
        </div>
      </Card>
    </div>
  );
}
