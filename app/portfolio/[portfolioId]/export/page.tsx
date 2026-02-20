'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Download,
  FileCode,
  FileJson,
  FileImage,
  Package,
  Code,
  Database,
  Settings,
  CheckCircle2,
  AlertCircle,
  Zap,
  HardDrive,
} from 'lucide-react'

interface ExportFormat {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
  fileSize: string
  color: string
}

const exportFormats: ExportFormat[] = [
  {
    id: 'html',
    name: 'HTML',
    description: 'Self-contained static website',
    icon: <FileCode size={40} />,
    features: ['Single folder export', 'All assets included', 'SEO optimized', 'Fast loading'],
    fileSize: '~2.5 MB',
    color: 'from-orange-500/20 to-amber-500/20',
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Print-ready portfolio document',
    icon: <FileImage size={40} />,
    features: ['High resolution', 'Print optimized', 'Interactive links', 'Custom branding'],
    fileSize: '~1.2 MB',
    color: 'from-red-500/20 to-pink-500/20',
  },
  {
    id: 'react',
    name: 'React',
    description: 'React component for integration',
    icon: <Code size={40} />,
    features: ['Full source code', 'Tailwind CSS', 'Responsive design', 'Easy customization'],
    fileSize: '~850 KB',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'Full Next.js project ready to deploy',
    icon: <Package size={40} />,
    features: ['Server-side rendering', 'API routes', 'Optimized build', 'Vercel ready'],
    fileSize: '~3.1 MB',
    color: 'from-slate-500/20 to-gray-500/20',
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'Structured data export',
    icon: <FileJson size={40} />,
    features: ['Complete data dump', 'No styling', 'Database ready', 'API integration'],
    fileSize: '~256 KB',
    color: 'from-yellow-500/20 to-lime-500/20',
  },
  {
    id: 'zip',
    name: 'ZIP Archive',
    description: 'Complete project archive',
    icon: <HardDrive size={40} />,
    features: ['All formats included', 'Version history', 'Source files', 'Media assets'],
    fileSize: '~8.5 MB',
    color: 'from-purple-500/20 to-violet-500/20',
  },
]

interface ExportOptions {
  includeAnalytics: boolean
  includeComments: boolean
  minifyCode: boolean
  optimizeImages: boolean
  removeTracking: boolean
}

import { use } from 'react'

export default function ExportPage({
                                     params,
                                   }: {
  params: Promise<{ portfolioId: string }>
}) {
  const { portfolioId } = use(params)
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [expandedOptions, setExpandedOptions] = useState<Record<string, boolean>>({})
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    includeAnalytics: false,
    includeComments: true,
    minifyCode: true,
    optimizeImages: true,
    removeTracking: true,
  })
  const [exportingId, setExportingId] = useState<string | null>(null)

  const handleExport = (formatId: string) => {
    setExportingId(formatId)
    setTimeout(() => {
      setExportingId(null)
    }, 2000)
  }

  const toggleOptions = (formatId: string) => {
    setExpandedOptions((prev) => ({
      ...prev,
      [formatId]: !prev[formatId],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-background to-magenta-500/5 animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <ChevronRight size={16} className="text-muted-foreground" />
          <Link href="/portfolios" className="text-muted-foreground hover:text-foreground">
            My Portfolios
          </Link>
          <ChevronRight size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">[Portfolio Name]</span>
          <ChevronRight size={16} className="text-muted-foreground" />
          <span className="text-foreground">Export</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-bold gradient-text">Export Portfolio</h1>
                <Download size={32} className="text-accent" />
              </div>
              <p className="text-base text-muted-foreground font-light mb-1">My Amazing Portfolio</p>
              <p className="text-sm text-muted-foreground">Download your portfolio in multiple formats</p>
            </div>

            <div className="flex gap-3">
              <Link href={`/portfolio/${portfolioId}`}>
                <button className="neu-card px-6 py-3 rounded-lg hover:scale-102 transition-transform flex items-center gap-2 group">
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  Editor
                </button>
              </Link>
              <button className="neu-card px-6 py-3 rounded-lg hover:scale-102 transition-transform flex items-center gap-2 group">
                <ExternalLink size={20} />
                View Live
              </button>
            </div>
          </div>
        </div>

        {/* Export Formats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {exportFormats.map((format) => (
            <div key={format.id} className="neu-card rounded-xl overflow-hidden hover:scale-102 hover:glow-cyan transition-all cursor-pointer">
              <div className={`bg-gradient-to-br ${format.color} h-40 flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-magenta-500/5" />
                <div className="text-muted-foreground opacity-70 group-hover:opacity-100 transition-opacity">
                  {format.icon}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{format.name}</h3>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {format.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* File size badge */}
                <div className="mb-4 p-3 bg-card rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Estimated size</p>
                  <p className="font-semibold text-sm">{format.fileSize}</p>
                </div>

                {/* Options accordion */}
                <div className="mb-4 border-t border-border pt-4">
                  <button
                    onClick={() => toggleOptions(format.id)}
                    className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors w-full"
                  >
                    <Settings size={16} />
                    Customize Options
                    <ChevronRight size={16} className={`ml-auto transition-transform ${expandedOptions[format.id] ? 'rotate-90' : ''}`} />
                  </button>

                  {expandedOptions[format.id] && (
                    <div className="mt-3 space-y-3 p-3 bg-card rounded-lg animate-slideDown">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exportOptions.minifyCode}
                          onChange={(e) => setExportOptions({ ...exportOptions, minifyCode: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">Minify code</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exportOptions.optimizeImages}
                          onChange={(e) => setExportOptions({ ...exportOptions, optimizeImages: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">Optimize images</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exportOptions.removeTracking}
                          onChange={(e) => setExportOptions({ ...exportOptions, removeTracking: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">Remove tracking</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exportOptions.includeAnalytics}
                          onChange={(e) => setExportOptions({ ...exportOptions, includeAnalytics: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">Include analytics</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Export button */}
                <button
                  onClick={() => handleExport(format.id)}
                  disabled={exportingId === format.id}
                  className="w-full neu-card hover:glow-cyan py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {exportingId === format.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      Export {format.name}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="neu-card rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="text-accent mt-1">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Choose Your Format</h4>
                <p className="text-sm text-muted-foreground">
                  Select the format that best suits your needs. Each format comes with different optimization options.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-accent mt-1">
                <Settings size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customize Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Expand options to minify code, optimize images, and configure what gets included in your export.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-accent mt-1">
                <Download size={20} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Download & Deploy</h4>
                <p className="text-sm text-muted-foreground">
                  Click export to download your portfolio. Ready to deploy directly to your hosting provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
