'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { AuthInput } from '@/components/auth-input';
import { Github, Mail, Check } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold gradient-text mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Start building in under 60 seconds</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step >= s
                    ? 'bg-cyan-DEFAULT text-deep-bg glow-cyan'
                    : 'bg-deep-card text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 transition-all ${step > s ? 'bg-cyan-DEFAULT' : 'bg-deep-card'}`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 ? (
          <>
            {/* Social buttons */}
            <div className="space-y-3 mb-6 animate-fadeIn" style={{ animationDelay: '200ms' }}>
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
            <div className="relative mb-6 animate-fadeIn" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn" style={{ animationDelay: '400ms' }}>
              <AuthInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(value) => handleChange('fullName', value)}
                error={errors.fullName}
              />

              <AuthInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                error={errors.email}
                icon="email"
              />

              <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                error={errors.password}
                icon="lock"
                showPasswordStrength
              />

              <AuthInput
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(value) => handleChange('confirmPassword', value)}
                error={errors.confirmPassword}
                icon="lock"
              />

              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-deep-card cursor-pointer mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link href="/terms" className="text-cyan-DEFAULT hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-cyan-DEFAULT hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full neu-card rounded-lg py-3 px-4 font-semibold text-foreground hover:scale-105 transition-all duration-200 disabled:opacity-50 mt-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT/0 via-cyan-DEFAULT/20 to-cyan-DEFAULT/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">{loading ? 'Creating account...' : 'Create Account'}</span>
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-muted-foreground mt-6 animate-fadeIn" style={{ animationDelay: '500ms' }}>
              Already have an account?{' '}
              <Link href="/login" className="gradient-text hover:opacity-80 transition-opacity">
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-DEFAULT to-secondary rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-deep-bg" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Account Created!</h2>
            <p className="text-muted-foreground mb-6">Check your email to verify your account</p>
            <button className="w-full neu-card rounded-lg py-3 px-4 font-semibold text-foreground hover:scale-105 transition-all duration-200">
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
