'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Check, X } from 'lucide-react';

interface AuthInputProps {
  label: string;
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: 'email' | 'lock';
  showPasswordStrength?: boolean;
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
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const displayType = isPassword && showPassword ? 'text' : type;

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
  const strengthColor = {
    0: 'bg-gray-600',
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-yellow-400',
    4: 'bg-green-500',
  }[strength];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-2 transition-all duration-200">
        {label}
      </label>

      <div className="relative">
        <div className={`neu-card-inset rounded-lg flex items-center transition-all duration-200 ${
          error ? 'ring-2 ring-red-500' : 'focus-within:ring-2 focus-within:ring-cyan-DEFAULT'
        }`}>
          {icon === 'email' && <Mail className="absolute left-3 w-5 h-5 text-muted-foreground" />}
          {icon === 'lock' && <Lock className="absolute left-3 w-5 h-5 text-muted-foreground" />}

          <input
            type={displayType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`flex-1 bg-transparent px-4 py-3 outline-none text-foreground placeholder-muted-foreground ${
              icon ? 'pl-12' : ''
            }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}

          {!isPassword && value && (
            <div className="px-3">
              {error ? (
                <X className="w-5 h-5 text-red-500" />
              ) : (
                <Check className="w-5 h-5 text-green-500" />
              )}
            </div>
          )}
        </div>
      </div>

      {showPasswordStrength && value && (
        <div className="mt-2 space-y-2">
          <div className="h-1 bg-deep-card rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strengthColor}`}
              style={{ width: `${(strength / 4) * 100}%` }}
            />
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className={getPasswordStrength(value) >= 1 ? 'text-green-500' : ''}>
              ✓ At least 8 characters
            </div>
            <div className={/[A-Z]/.test(value) ? 'text-green-500' : ''}>
              ✓ One uppercase letter
            </div>
            <div className={/[0-9]/.test(value) ? 'text-green-500' : ''}>
              ✓ One number
            </div>
            <div className={/[^A-Za-z0-9]/.test(value) ? 'text-green-500' : ''}>
              ✓ One special character
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
