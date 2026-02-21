'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth-layout';
import { AuthInput } from '@/components/auth-input';
import { Github, Mail, Check, Linkedin, Loader2, Mail as MailIcon, RefreshCw } from 'lucide-react';

// ─── Progress Step Indicator ───
function ProgressIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: 'Account Details' },
    { num: 2, label: 'Verify Email' },
    { num: 3, label: 'Setup Profile' },
  ];

  return (
    <div className="flex items-center justify-between mb-8 animate-fadeInUp" style={{ animationDelay: '80ms' }}>
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center flex-1">
          <div className="flex flex-col items-center relative">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                currentStep > step.num
                  ? 'bg-green-500 text-deep-bg shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-100'
                  : currentStep === step.num
                  ? 'bg-cyan-DEFAULT text-deep-bg shadow-[0_0_25px_rgba(0,240,255,0.5)] scale-110'
                  : 'bg-deep-card text-muted-foreground scale-90 opacity-60'
              }`}
            >
              {currentStep > step.num ? (
                <Check className="w-4 h-4 animate-scaleIn" />
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-[10px] mt-1.5 whitespace-nowrap transition-all duration-300 ${
                currentStep === step.num
                  ? 'text-cyan-DEFAULT font-medium'
                  : currentStep > step.num
                  ? 'text-green-400'
                  : 'text-muted-foreground/60'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 mx-3 mt-[-14px]">
              <div className="h-[2px] bg-deep-card rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: currentStep > step.num ? '100%' : '0%',
                    background: 'linear-gradient(90deg, #00f0ff, #22c55e)',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Custom Checkbox ───
function NeuCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-300 border ${
          checked
            ? 'bg-cyan-DEFAULT/20 border-cyan-DEFAULT shadow-[0_0_12px_rgba(0,240,255,0.3)]'
            : 'border-muted-foreground/30 neu-card-inset hover:border-muted-foreground/50'
        }`}
      >
        <svg
          viewBox="0 0 12 12"
          className={`w-3 h-3 transition-all duration-300 ${
            checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <path
            d="M2 6L5 9L10 3"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={checked ? 'animate-drawCheck' : ''}
            style={{
              strokeDasharray: 20,
              strokeDashoffset: checked ? 0 : 20,
              transition: 'stroke-dashoffset 0.3s ease-out',
            }}
          />
        </svg>
      </button>
      <span className="text-sm text-muted-foreground leading-relaxed">{children}</span>
    </label>
  );
}

// ─── Confetti Particle ───
function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; color: string; size: number; angle: number; speed: number }>
  >([]);

  useEffect(() => {
    if (!active) return;
    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50,
      color: ['#00f0ff', '#ff00ff', '#22c55e', '#eab308', '#ef4444', '#a855f7'][
        Math.floor(Math.random() * 6)
      ],
      size: Math.random() * 6 + 3,
      angle: Math.random() * 360,
      speed: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
    const timer = setTimeout(() => setParticles([]), 2000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            '--confetti-angle': `${p.angle}deg`,
            '--confetti-speed': `${p.speed}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Email Verification Modal ───
function VerifyEmailModal({
  email,
  onClose,
}: {
  email: string;
  onClose: () => void;
}) {
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(59);
    setCanResend(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-bg/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass rounded-2xl p-8 max-w-md w-full mx-4 animate-modalIn shadow-[0_0_60px_rgba(0,240,255,0.1)]">
        {/* Pulsing email icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-DEFAULT/20 to-secondary/20 flex items-center justify-center">
              <MailIcon className="w-10 h-10 text-cyan-DEFAULT animate-pulse-glow" />
            </div>
            <div className="absolute inset-0 rounded-full animate-ping-slow bg-cyan-DEFAULT/10" />
          </div>
        </div>

        <h2 className="text-2xl font-heading font-bold text-foreground text-center mb-2">
          Verify Your Email
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-6 leading-relaxed">
          We sent a verification link to{' '}
          <span className="text-cyan-DEFAULT font-medium">{email}</span>
        </p>

        {/* Resend */}
        <div className="text-center mb-6">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`text-sm flex items-center justify-center mx-auto transition-all duration-300 ${
              canResend
                ? 'text-cyan-DEFAULT hover:text-cyan-DEFAULT/80 cursor-pointer'
                : 'text-muted-foreground/50 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${!canResend ? '' : 'hover:rotate-180 transition-transform duration-500'}`} />
            {canResend ? 'Resend email' : `Resend in ${countdown}s`}
          </button>
        </div>

        {/* Open email button */}
        <button
          onClick={onClose}
          className="w-full neu-card rounded-lg py-3 px-4 font-semibold text-foreground hover:scale-[1.02] transition-all duration-200 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT/0 via-cyan-DEFAULT/20 to-cyan-DEFAULT/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative">Continue to Dashboard</span>
        </button>
      </div>
    </div>
  );
}

// ─── Social Login Button ───
function SocialButton({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1000);
      }}
      className="w-full neu-card rounded-lg py-3 px-4 flex items-center justify-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group animate-fadeInUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon
        className={`w-5 h-5 transition-all duration-500 ${
          clicked ? 'animate-spin' : 'group-hover:scale-110'
        }`}
      />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

// ─── Main Signup Page ───
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
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeForm, setShakeForm] = useState(false);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    setErrors((prev) => {
      if (prev[field]) {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      }
      return prev;
    });
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().split(/\s+/).length < 2) {
      newErrors.fullName = 'Please enter your first and last name';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakeForm(true);
      setTimeout(() => setShakeForm(false), 500);
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setShowConfetti(true);

      // Show modal after success animation
      setTimeout(() => {
        setStep(2);
        setShowModal(true);
      }, 1200);
    }, 1800);
  };

  const nameCharCount = formData.fullName.length;

  return (
    <AuthLayout>
      <Confetti active={showConfetti} />

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-6 animate-fadeInUp">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold gradient-text mb-1.5 text-balance">
            Create Your Account
          </h1>
          <p className="text-muted-foreground font-sub text-sm">
            Start building in under 60 seconds
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={step} />

        {step === 1 && !success ? (
          <>
            {/* Social Buttons */}
            <div className="flex flex-col gap-2.5 mb-5">
              <SocialButton icon={Github} label="Continue with GitHub" delay={160} />
              <div className="flex gap-2.5">
                <button
                  className="flex-1 neu-card rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 animate-fadeInUp"
                  style={{ animationDelay: '240ms' }}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Google</span>
                </button>
                <button
                  className="flex-1 neu-card rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 animate-fadeInUp"
                  style={{ animationDelay: '320ms' }}
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-5 animate-fadeInUp" style={{ animationDelay: '380ms' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-background text-muted-foreground tracking-wider uppercase">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col gap-4 ${shakeForm ? 'animate-shakeX' : ''}`}
              noValidate
            >
              {/* Full Name with char counter */}
              <div className="relative">
                <AuthInput
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={(value) => handleChange('fullName', value)}
                  error={errors.fullName}
                  icon="user"
                  animationDelay={440}
                />
                {formData.fullName.length > 0 && (
                  <span className="absolute -top-1 right-0 text-[10px] text-muted-foreground/60 animate-fadeIn">
                    {nameCharCount} chars
                  </span>
                )}
              </div>

              <AuthInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                error={errors.email}
                icon="email"
                animationDelay={520}
              />

              <AuthInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                error={errors.password}
                icon="lock"
                showPasswordStrength
                showPasswordRequirements
                animationDelay={600}
              />

              <AuthInput
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(value) => handleChange('confirmPassword', value)}
                error={errors.confirmPassword}
                icon="lock"
                confirmValue={formData.password}
                animationDelay={680}
              />

              {/* Terms & Conditions */}
              <div className="animate-fadeInUp" style={{ animationDelay: '760ms' }}>
                <NeuCheckbox checked={agreedToTerms} onChange={setAgreedToTerms}>
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-cyan-DEFAULT relative inline-block group/link"
                  >
                    Terms of Service
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-DEFAULT transition-all duration-300 group-hover/link:w-full" />
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-cyan-DEFAULT relative inline-block group/link"
                  >
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-DEFAULT transition-all duration-300 group-hover/link:w-full" />
                  </Link>
                </NeuCheckbox>
                {errors.terms && (
                  <p className="text-red-400 text-xs mt-1.5 ml-8 animate-slideDown">{errors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full neu-card rounded-lg py-3.5 px-4 font-semibold text-foreground hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100 mt-2 relative overflow-hidden group animate-fadeInUp"
                style={{ animationDelay: '840ms' }}
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT/0 via-cyan-DEFAULT/20 to-cyan-DEFAULT/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating your account...</span>
                    </>
                  ) : success ? (
                    <>
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-400 animate-scaleIn" />
                      </div>
                      <span className="text-green-400">Account Created!</span>
                    </>
                  ) : (
                    'Create Account'
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <p
              className="text-center text-muted-foreground text-sm mt-6 animate-fadeInUp"
              style={{ animationDelay: '920ms' }}
            >
              Already have an account?{' '}
              <Link
                href="/login"
                className="gradient-text hover:opacity-80 transition-opacity font-medium"
              >
                Sign in
              </Link>
            </p>
          </>
        ) : step === 2 ? (
          /* Step 2: Verification success state shown inline (modal also appears) */
          <div className="text-center animate-fadeInUp">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-DEFAULT/20 to-green-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.2)]">
              <Check className="w-10 h-10 text-green-400 animate-scaleIn" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
              Check Your Inbox
            </h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              We sent a verification link to{' '}
              <span className="text-cyan-DEFAULT">{formData.email}</span>
            </p>
            <Link
              href="/login"
              className="inline-block w-full neu-card rounded-lg py-3 px-4 font-semibold text-foreground hover:scale-[1.03] transition-all duration-200 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-DEFAULT/0 via-cyan-DEFAULT/20 to-cyan-DEFAULT/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Continue to Sign In</span>
            </Link>
          </div>
        ) : null}
      </div>

      {/* Verification Modal */}
      {showModal && (
        <VerifyEmailModal
          email={formData.email}
          onClose={() => setShowModal(false)}
        />
      )}
    </AuthLayout>
  );
}
