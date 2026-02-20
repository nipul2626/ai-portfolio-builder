'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Mail, Lock, Github, Chrome, Linkedin, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const ThreeParticleBackground = dynamic(
  () => import('@/components/three-particle-background').then(mod => ({ default: mod.ThreeParticleBackground })),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
    )
  }
)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSocialLogin = (provider: string) => {
    console.log('[v0] Social login with:', provider)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setErrors({})
    
    const newErrors: { email?: string; password?: string } = {}
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoginStatus('error')
      return
    }
    
    setIsLoading(true)
    setLoginStatus('idle')
    
    setTimeout(() => {
      setIsLoading(false)
      setLoginStatus('success')
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 800)
    }, 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const floatingLabelVariants = {
    focused: {
      y: -24,
      scale: 0.85,
      color: 'rgb(59, 130, 246)',
      transition: { duration: 0.2 }
    },
    unfocused: {
      y: 0,
      scale: 1,
      color: 'rgb(148, 163, 184)',
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <ThreeParticleBackground />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-md px-6"
      >
        <motion.div
          variants={itemVariants}
          className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2 text-balance">Welcome Back</h1>
              <p className="text-slate-300 text-balance">Sign in to your account to continue</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSocialLogin('github')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 backdrop-blur-sm"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">Continue with GitHub</span>
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 backdrop-blur-sm"
                >
                  <Chrome className="w-5 h-5" />
                  <span className="font-medium">Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialLogin('linkedin')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-300 backdrop-blur-sm"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-medium">LinkedIn</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/50 text-slate-300 backdrop-blur-sm rounded-full">
                  Or continue with email
                </span>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants} className="relative">
                <motion.label
                  htmlFor="email"
                  variants={floatingLabelVariants}
                  animate={focusedField === 'email' || email ? 'focused' : 'unfocused'}
                  className="absolute left-12 top-3.5 pointer-events-none font-medium origin-left"
                >
                  Email Address
                </motion.label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                      errors.email ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-300 backdrop-blur-sm`}
                    placeholder="Email Address"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <motion.label
                  htmlFor="password"
                  variants={floatingLabelVariants}
                  animate={focusedField === 'password' || password ? 'focused' : 'unfocused'}
                  className="absolute left-12 top-3.5 pointer-events-none font-medium origin-left"
                >
                  Password
                </motion.label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: undefined })
                    }}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
                      errors.password ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-300 backdrop-blur-sm`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading || loginStatus === 'success'}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg relative overflow-hidden ${
                    loginStatus === 'success'
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-blue-500/50'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </motion.span>
                    ) : loginStatus === 'success' ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Success!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sign In
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>

            <motion.p variants={itemVariants} className="text-center mt-6 text-slate-300">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </motion.p>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center mt-8 text-slate-400 text-sm"
        >
          Protected by advanced encryption and security protocols
        </motion.p>
      </motion.div>
    </div>
  )
}
