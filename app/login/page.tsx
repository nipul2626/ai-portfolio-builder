'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { AuthInput } from '@/components/auth-input';
import { Github, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      // Here you would call your auth API
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Continue building amazing portfolios</p>
        </div>

        {/* Social buttons */}
        <div className="space-y-3 mb-6 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <button className="w-full neu-card rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 group">
            <Github className="w-5 h-5 group-hover:animate-spin" />
            <span>Continue with GitHub</span>
          </button>
          <button className="w-full neu-card rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200">
            <Mail className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">OR</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            error={errors.email}
            icon="email"
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            error={errors.password}
            icon="lock"
          />

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-deep-card cursor-pointer"
              />
              <span className="text-foreground">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-cyan-DEFAULT hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full neu-card rounded-lg py-3 px-4 font-semibold text-foreground hover:scale-105 transition-all duration-200 disabled:opacity-50 mt-6 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT/0 via-cyan-DEFAULT/20 to-cyan-DEFAULT/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-muted-foreground mt-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
          Don't have an account?{' '}
          <Link href="/signup" className="gradient-text hover:opacity-80 transition-opacity">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
