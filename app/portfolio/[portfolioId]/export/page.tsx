'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { use } from 'react'
import {
  ChevronRight, ArrowLeft, ExternalLink, Download, FileCode, FileJson,
  FileImage, Package, Code, HardDrive, Settings, CheckCircle2,
  Zap, X, Check
} from 'lucide-react'

interface ExportFormat {
  id: string
  name: string
  description: string
  icon: typeof FileCode
  features: string[]
  fileSize: string
  colorFrom: string
  colorTo: string
  accentColor: string
}

const exportFormats: ExportFormat[] = [
  {
    id: 'html',
    name: 'Static HTML',
    description: 'Self-contained static website',
    icon: FileCode,
    features: ['Single folder export', 'All assets included', 'SEO optimized', 'Fast loading'],
    fileSize: '~2.5 MB',
    colorFrom: '#f97316',
    colorTo: '#f59e0b',
    accentColor: 'rgba(249, 115, 22, 0.2)',
  },
  {
    id: 'pdf',
    name: 'PDF Resume',
    description: 'Print-ready portfolio document',
    icon: FileImage,
    features: ['High resolution', 'Print optimized', 'Interactive links', 'Custom branding'],
    fileSize: '~1.2 MB',
    colorFrom: '#ef4444',
    colorTo: '#ec4899',
    accentColor: 'rgba(239, 68, 68, 0.2)',
  },
  {
    id: 'react',
    name: 'React Project',
    description: 'React component for integration',
    icon: Code,
    features: ['Full source code', 'Tailwind CSS', 'Responsive design', 'Easy customization'],
    fileSize: '~850 KB',
    colorFrom: '#00f0ff',
    colorTo: '#3b82f6',
    accentColor: 'rgba(0, 240, 255, 0.2)',
  },
  {
    id: 'json',
    name: 'JSON Data',
    description: 'Structured data export',
    icon: FileJson,
    features: ['Complete data dump', 'No styling', 'Database ready', 'API integration'],
    fileSize: '~256 KB',
    colorFrom: '#22c55e',
    colorTo: '#84cc16',
    accentColor: 'rgba(34, 197, 94, 0.2)',
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description: 'Clean markdown document',
    icon: FileCode,
    features: ['GitHub ready', 'Easy editing', 'Portable format', 'No dependencies'],
    fileSize: '~128 KB',
    colorFrom: '#a855f7',
    colorTo: '#6366f1',
    accentColor: 'rgba(168, 85, 247, 0.2)',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Full Next.js project ready to deploy',
    icon: Package,
    features: ['Server-side rendering', 'API routes', 'Optimized build', 'Vercel ready'],
    fileSize: '~3.1 MB',
    colorFrom: '#64748b',
    colorTo: '#334155',
    accentColor: 'rgba(100, 116, 139, 0.2)',
  },
]

interface ExportOptions {
  minifyCode: boolean
  optimizeImages: boolean
  removeTracking: boolean
  includeAnalytics: boolean
}

const processingSteps = [
  'Building structure...',
  'Optimizing assets...',
  'Compressing files...',
  'Finalizing...',
]

const comparisonFeatures = [
  { feature: 'Self-hosted', html: true, pdf: false, react: true, json: false, markdown: false, nextjs: true },
  { feature: 'Animations', html: true, pdf: false, react: true, json: false, markdown: false, nextjs: true },
  { feature: 'SEO Optimized', html: true, pdf: false, react: true, json: false, markdown: false, nextjs: true },
  { feature: 'Print Ready', html: false, pdf: true, react: false, json: false, markdown: true, nextjs: false },
  { feature: 'Editable Source', html: false, pdf: false, react: true, json: true, markdown: true, nextjs: true },
  { feature: 'API Integration', html: false, pdf: false, react: true, json: true, markdown: false, nextjs: true },
  { feature: 'ATS Friendly', html: false, pdf: true, react: false, json: false, markdown: true, nextjs: false },
  { feature: 'Deploy to Vercel', html: false, pdf: false, react: true, json: false, markdown: false, nextjs: true },
]

function ProgressRing({ progress }: { progress: number }) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  const color = progress < 50 ? '#f97316' : progress < 80 ? '#00f0ff' : '#22c55e'

  return (
    <div className="relative w-[220px] h-[220px]">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <motion.circle
          cx="100" cy="100" r={radius} fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-bold text-white"
        >
          {progress}%
        </motion.span>
        <span className="text-sm text-slate-400 mt-1">Complete</span>
      </div>
    </div>
  )
}

export default function ExportPage({
  params,
}: {
  params: Promise<{ portfolioId: string }>
}) {
  const { portfolioId } = use(params)
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({})
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    minifyCode: true,
    optimizeImages: true,
    removeTracking: true,
    includeAnalytics: false,
  })
  const [exportingId, setExportingId] = useState<string | null>(null)
  const [showProcessing, setShowProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [exportSuccess, setExportSuccess] = useState(false)
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null)

  const handleExport = (formatId: string) => {
    setExportingId(formatId)
    setShowProcessing(true)
    setProcessingProgress(0)
    setCurrentStep(0)
    setCompletedSteps([])
    setExportSuccess(false)

    const stepDuration = 600
    processingSteps.forEach((_, idx) => {
      setTimeout(() => {
        setCurrentStep(idx)
        setProcessingProgress(Math.min(((idx + 1) / processingSteps.length) * 100, 99))
        if (idx > 0) {
          setCompletedSteps(prev => [...prev, idx - 1])
        }
      }, (idx + 1) * stepDuration)
    })

    setTimeout(() => {
      setCompletedSteps(prev => [...prev, processingSteps.length - 1])
      setProcessingProgress(100)
      setExportSuccess(true)
    }, (processingSteps.length + 1) * stepDuration)
  }

  const closeProcessing = () => {
    setShowProcessing(false)
    setExportingId(null)
    setProcessingProgress(0)
    setCurrentStep(0)
    setCompletedSteps([])
    setExportSuccess(false)
  }

  const toggleOptions = (formatId: string) => {
    setExpandedOptions(prev => ({ ...prev, [formatId]: !prev[formatId] }))
  }

  const elasticEase = [0.34, 1.56, 0.64, 1] as const

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1.5 mb-6"
        >
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'My Portfolios', href: '/portfolios' },
            { label: 'John Doe Portfolio', href: `/portfolio/${portfolioId}` },
            { label: 'Export', href: null },
          ].map((crumb, i) => (
            <motion.div
              key={crumb.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-1.5"
            >
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
              {crumb.href ? (
                <Link href={crumb.href} className="px-2.5 py-1 text-xs text-slate-400 hover:text-white neu-card rounded-full transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="px-2.5 py-1 text-xs text-white font-medium bg-cyan-500/10 border border-cyan-400/20 rounded-full">
                  {crumb.label}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold gradient-text">Export Portfolio</h1>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Download className="w-7 h-7 text-cyan-400/60" />
                </motion.div>
              </div>
              <p className="text-sm text-slate-400">Download your portfolio in multiple formats</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/portfolio/${portfolioId}/editor`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="neu-card px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Editor
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="neu-card px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Export Formats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {exportFormats.map((format, idx) => {
            const Icon = format.icon
            return (
              <motion.div
                key={format.id}
                initial={{ opacity: 0, scale: 0.6, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.08, duration: 0.6, ease: elasticEase }}
                className="group"
              >
                <div className="neu-card rounded-xl overflow-hidden hover:glow-cyan transition-all">
                  {/* Color header */}
                  <div
                    className="h-36 relative flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${format.accentColor}, rgba(26,26,36,0.8))` }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-16 h-16 text-slate-400/60 group-hover:text-white/70 transition-colors" style={{ color: format.colorFrom + '80' }} />
                    </motion.div>
                    {/* File size badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white/70">
                      {format.fileSize}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00f0ff] transition-colors">{format.name}</h3>
                    <p className="text-xs text-slate-400 mb-4">{format.description}</p>

                    {/* Features */}
                    <div className="space-y-1.5 mb-4">
                      {format.features.map((feature, fidx) => (
                        <motion.div
                          key={fidx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.08 + fidx * 0.05 }}
                          className="flex items-center gap-2 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: format.colorFrom }} />
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    {/* Options accordion */}
                    <div className="mb-4 border-t border-white/[0.06] pt-3">
                      <button
                        onClick={() => toggleOptions(format.id)}
                        className="flex items-center gap-2 text-xs font-medium text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors w-full"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        Customize Options
                        <ChevronRight className={`w-3.5 h-3.5 ml-auto transition-transform ${expandedOptions[format.id] ? 'rotate-90' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {expandedOptions[format.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-2 space-y-2 overflow-hidden"
                          >
                            {Object.entries(exportOptions).map(([key, value]) => (
                              <label key={key} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-white/[0.03] transition-colors">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={e => setExportOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                                  className="w-3.5 h-3.5 accent-cyan-400"
                                />
                                <span className="text-[11px] text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              </label>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Export button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExport(format.id)}
                      disabled={exportingId === format.id}
                      className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${format.colorFrom}25, ${format.colorTo}15)`, color: format.colorFrom, border: `1px solid ${format.colorFrom}30` }}
                    >
                      <Download className="w-4 h-4" />
                      Export {format.name}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: elasticEase }}
          className="neu-card rounded-xl overflow-hidden mb-12"
        >
          <div className="p-6 border-b border-white/[0.06]">
            <h2 className="text-xl font-bold text-white">Format Comparison</h2>
            <p className="text-xs text-slate-400 mt-1">Compare features across all export formats</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider p-4 w-44">Feature</th>
                  {exportFormats.map(f => (
                    <th
                      key={f.id}
                      onMouseEnter={() => setHoveredColumn(f.id)}
                      onMouseLeave={() => setHoveredColumn(null)}
                      className={`text-center text-xs font-semibold p-4 transition-colors ${hoveredColumn === f.id ? 'text-[#00f0ff] bg-[#00f0ff]/5' : 'text-slate-300'}`}
                    >
                      {f.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, ridx) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + ridx * 0.05 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="text-sm text-slate-300 p-4 font-medium">{row.feature}</td>
                    {(['html', 'pdf', 'react', 'json', 'markdown', 'nextjs'] as const).map(fmtKey => {
                      const val = row[fmtKey]
                      return (
                        <td
                          key={fmtKey}
                          onMouseEnter={() => setHoveredColumn(fmtKey)}
                          onMouseLeave={() => setHoveredColumn(null)}
                          className={`text-center p-4 transition-colors ${hoveredColumn === fmtKey ? 'bg-[#00f0ff]/5' : ''}`}
                        >
                          {val ? (
                            <Check className="w-4 h-4 text-green-400 mx-auto" />
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                      )
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: elasticEase }}
          className="neu-card rounded-xl p-8"
        >
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Choose Your Format', desc: 'Select the format that best suits your needs. Each format comes with different optimization options.' },
              { icon: Settings, title: 'Customize Settings', desc: 'Expand options to minify code, optimize images, and configure what gets included in your export.' },
              { icon: Download, title: 'Download & Deploy', desc: 'Click export to download your portfolio. Ready to deploy directly to your hosting provider.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Processing Modal (Fullscreen) */}
      <AnimatePresence>
        {showProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-xl"
          >
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-[#00f0ff]"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    opacity: 0,
                  }}
                  animate={{
                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    opacity: [0, 0.4, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative z-10 flex flex-col items-center gap-8 max-w-md"
            >
              {/* Close button */}
              {exportSuccess && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={closeProcessing}
                  className="absolute -top-2 -right-2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}

              {/* Progress Ring */}
              <ProgressRing progress={processingProgress} />

              {/* Processing Steps */}
              <div className="w-full space-y-3">
                {processingSteps.map((step, idx) => {
                  const isCompleted = completedSteps.includes(idx)
                  const isCurrent = currentStep === idx && !isCompleted
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.15 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        isCurrent ? 'bg-[#00f0ff]/10 border border-[#00f0ff]/20' :
                        isCompleted ? 'bg-green-500/5 border border-green-500/10' :
                        'bg-white/[0.02] border border-white/[0.04]'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? 'bg-green-500' : isCurrent ? 'bg-[#00f0ff]/20' : 'bg-white/[0.06]'
                      }`}>
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                          >
                            <Check className="w-3.5 h-3.5 text-white" />
                          </motion.div>
                        ) : isCurrent ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-3.5 h-3.5 border-2 border-[#00f0ff] border-t-transparent rounded-full"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">{idx + 1}</span>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isCompleted ? 'text-green-400' : isCurrent ? 'text-[#00f0ff]' : 'text-slate-500'
                      }`}>
                        {step}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Success State */}
              <AnimatePresence>
                {exportSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 w-full"
                  >
                    <motion.h2
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-white"
                    >
                      Export Complete!
                    </motion.h2>

                    {/* File info card */}
                    <div className="neu-card p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-sm font-semibold text-white">
                            portfolio-{exportingId}.{exportingId === 'pdf' ? 'pdf' : exportingId === 'json' ? 'json' : 'zip'}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {exportFormats.find(f => f.id === exportingId)?.fileSize}
                          </p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={closeProcessing}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download File
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
