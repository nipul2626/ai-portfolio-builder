'use client';

import { useState, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, Check, X, User } from 'lucide-react';

interface AuthInputProps {
  label: string;
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: 'email' | 'lock' | 'user';
  showPasswordStrength?: boolean;
  showPasswordRequirements?: boolean;
  confirmValue?: string;
  animationDelay?: number;
}

export function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  showPasswordStrength,
  showPasswordRequirements,
  confirmValue,
  animationDelay = 0,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isPassword = type === 'password';
  const displayType = isPassword && showPassword ? 'text' : type;

  const isFloating = isFocused || value.length > 0;

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = showPasswordStrength ? getPasswordStrength(value) : 0;
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthBarColors = [
    'bg-muted',
    'bg-red-500',
    'bg-yellow-500',
    'bg-yellow-400',
    'bg-green-500',
  ];

  // Email validation
  const isValidEmail = type === 'email' && value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isInvalidEmail = type === 'email' && value.length > 0 && !isValidEmail;

  // Confirm password matching
  const passwordsMatch = confirmValue !== undefined && value.length > 0 && value === confirmValue;
  const passwordsDontMatch = confirmValue !== undefined && value.length > 0 && value !== confirmValue;

  // Full name validation (minimum 2 words)
  const isValidName = type === 'text' && icon === 'user' && value.trim().split(/\s+/).length >= 2;

  const requirements = [
    { label: 'At least 8 characters', met: value.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(value) },
    { label: 'One number', met: /[0-9]/.test(value) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(value) },
  ];

  const IconComponent = icon === 'email' ? Mail : icon === 'lock' ? Lock : icon === 'user' ? User : null;

  return (
    <div
      className="w-full animate-fadeInUp"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative">
        <div
          className={`neu-card-inset rounded-lg flex items-center transition-all duration-300 cursor-text ${
            error
              ? 'ring-2 ring-red-500/70 shadow-[0_0_15px_rgba(255,0,0,0.15)]'
              : isFocused
              ? 'ring-2 ring-cyan-DEFAULT/70 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
              : ''
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Icon */}
          {IconComponent && (
            <div className={`absolute left-3 transition-all duration-300 ${
              isFocused ? 'text-cyan-DEFAULT scale-110' : 'text-muted-foreground'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>
          )}

          {/* Floating label */}
          <label
            className={`absolute transition-all duration-300 pointer-events-none ${
              IconComponent ? 'left-11' : 'left-4'
            } ${
              isFloating
                ? '-top-2.5 text-xs px-1 bg-[#131320] rounded'
                : 'top-1/2 -translate-y-1/2 text-sm'
            } ${
              isFocused
                ? 'text-cyan-DEFAULT'
                : error
                ? 'text-red-400'
                : 'text-muted-foreground'
            }`}
          >
            {label}
          </label>

          <input
            ref={inputRef}
            type={displayType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-1 bg-transparent px-4 py-3.5 outline-none text-foreground ${
              IconComponent ? 'pl-11' : ''
            }`}
            aria-label={label}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 text-muted-foreground hover:text-foreground transition-all duration-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <div className="relative w-5 h-5">
                <Eye className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${showPassword ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <EyeOff className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${showPassword ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
              </div>
            </button>
          )}

          {/* Validation indicators for non-password fields */}
          {!isPassword && value.length > 0 && (
            <div className="px-3">
              {(isValidEmail || isValidName) && !error ? (
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center animate-scaleIn">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                </div>
              ) : (isInvalidEmail || (icon === 'user' && !isValidName)) && !error ? (
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center animate-scaleIn">
                  <X className="w-3.5 h-3.5 text-red-400" />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Confirm password match indicator */}
      {confirmValue !== undefined && value.length > 0 && (
        <div className={`mt-2 flex items-center text-xs transition-all duration-300 animate-fadeInUp ${
          passwordsMatch ? 'text-green-500' : 'text-red-400'
        }`}>
          {passwordsMatch ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1" />
              <span>Passwords match</span>
            </>
          ) : (
            <>
              <X className="w-3.5 h-3.5 mr-1" />
              <span>{"Passwords don't match"}</span>
            </>
          )}
        </div>
      )}

      {/* Password strength bars */}
      {showPasswordStrength && value && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Password strength</span>
            <span className={`text-xs font-medium ${
              strength <= 1 ? 'text-red-400' : strength <= 2 ? 'text-yellow-400' : strength <= 3 ? 'text-yellow-300' : 'text-green-400'
            }`}>{strengthLabel} ({strength}/4)</span>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    i < strength ? strengthBarColors[strength] : 'bg-transparent'
                  }`}
                  style={{
                    width: i < strength ? '100%' : '0%',
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Password requirements checklist */}
      {showPasswordRequirements && (isFocused || value.length > 0) && (
        <div className="mt-3 neu-card-inset rounded-lg p-3 animate-slideUp">
          <div className="grid grid-cols-2 gap-2">
            {requirements.map((req, i) => (
              <div
                key={i}
                className={`flex items-center text-xs transition-all duration-300 ${
                  req.met ? 'text-green-400' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-all duration-300 ${
                  req.met
                    ? 'border-green-500 bg-green-500/20 scale-110'
                    : 'border-muted-foreground/30'
                }`}>
                  {req.met && (
                    <Check className="w-2.5 h-2.5 text-green-400 animate-scaleIn" />
                  )}
                </div>
                <span>{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-xs mt-2 animate-slideDown flex items-center">
          <X className="w-3 h-3 mr-1 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
