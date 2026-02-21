'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Sparkles, Github, Chrome, User, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Contains number', met: /[0-9]/.test(formData.password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!acceptedTerms) {
      setError('Please accept the terms and conditions')
      return
    }

    if (!passwordRequirements.every((req) => req.met)) {
      setError('Please meet all password requirements')
      return
    }

    try {
      await register(formData.email, formData.password, formData.name)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-pink-500/20 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-6 max-w-lg"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 mb-4"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold">
            Join 10,000+ Creators
          </h2>
          <p className="text-lg text-muted-foreground">
            Start building your professional portfolio today with our AI-powered tools and beautiful templates.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-8">
            {[
              { label: 'Free to start', icon: '🚀' },
              { label: 'No credit card', icon: '💳' },
              { label: 'AI assistance', icon: '🤖' },
              { label: 'Custom domains', icon: '🌐' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-4 rounded-lg bg-card/50 backdrop-blur border border-border text-left"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <div className="text-sm font-medium">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 mb-4"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Start building your portfolio for free
            </p>
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 gap-2"
              onClick={() => console.log('[v0] Google signup')}
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 gap-2"
              onClick={() => console.log('[v0] GitHub signup')}
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-1 p-3 bg-accent/50 rounded-lg"
                >
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.label}
                      className={`flex items-center gap-2 text-xs ${
                        req.met ? 'text-green-500' : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? 'bg-green-500' : 'bg-muted'
                        }`}
                      >
                        {req.met && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {req.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to the{' '}
                <Link href="/terms" className="text-cyan-500 hover:text-cyan-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-cyan-500 hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
