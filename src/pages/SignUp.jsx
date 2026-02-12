import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Card } from '@/components/ui';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    dateOfBirth: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signUpError } = await signUp(formData.email, formData.password, {
      username: formData.username,
      date_of_birth: formData.dateOfBirth,
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else if (data) {
      navigate('/onboarding/goals');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌸</div>
          <h1 className="text-3xl font-serif text-deep mb-2">
            Welcome to <span className="italic text-rose">She Tracks</span>
          </h1>
          <p className="text-sm text-muted">Create your account to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose/10 border border-rose/20 rounded-lg text-sm text-rose">
            ⚠ {error}
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
            label="Username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            placeholder="Choose a username"
          />

          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="Create a secure password"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-rose font-medium hover:underline">
            Sign in
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-muted">
          By signing up, you agree to our{' '}
          <Link to="/privacy" className="text-rose hover:underline">
            Privacy Policy
          </Link>
        </div>
      </Card>
    </div>
  );
}
