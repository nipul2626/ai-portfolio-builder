'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft, Settings, Search, Globe, Lock, Download, AlertTriangle, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import GeneralSettings from './tabs/general-settings'
import SEOSettings from './tabs/seo-settings'
import DomainSettings from './tabs/domain-settings'
import PrivacySettings from './tabs/privacy-settings'
import ExportSettings from './tabs/export-settings'
import DangerZoneSettings from './tabs/danger-zone-settings'

interface Props {
  portfolioId: string
}

const tabItems = [
  { value: 'general', label: 'General', icon: Settings },
  { value: 'seo', label: 'SEO & Meta', icon: Search },
  { value: 'domain', label: 'Domain', icon: Globe },
  { value: 'privacy', label: 'Privacy', icon: Lock },
  { value: 'export', label: 'Export', icon: Download },
  { value: 'danger', label: 'Danger Zone', icon: AlertTriangle, danger: true },
]

const pushUpVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
}

export default function SettingsClient({ portfolioId }: Props) {
  const [activeTab, setActiveTab] = useState('general')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 mb-6"
        >
          {[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'My Portfolios', href: '/portfolios' },
            { label: 'John Doe Portfolio', href: `/portfolio/${portfolioId}` },
            { label: 'Settings', href: null },
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
                <Link
                  href={crumb.href}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white neu-card rounded-full transition-colors"
                >
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
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold gradient-text">Portfolio Settings</h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Settings className="w-7 h-7 text-cyan-400/40" />
            </motion.div>
          </div>
          <p className="text-sm text-slate-400">Configure settings for your portfolio</p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <TabsList className="flex w-full max-w-4xl gap-1.5 bg-transparent p-0 h-auto mb-8">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-transparent data-[state=active]:shadow-none ${
                    tab.danger
                      ? 'data-[state=active]:text-red-400 text-red-400/60 hover:text-red-400'
                      : 'data-[state=active]:text-white text-slate-400 hover:text-white'
                  }`}
                >
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="settings-tab-bg"
                      className={`absolute inset-0 rounded-lg ${
                        tab.danger ? 'bg-red-500/10 border border-red-500/20' : 'neu-card glow-cyan'
                      }`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <tab.icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.value && !tab.danger && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-cyan-400 rounded-full"
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab content with push animation */}
          <div className="perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 40, rotateX: -3 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <TabsContent value="general" className="mt-0">
                  <GeneralSettings portfolioId={portfolioId} />
                </TabsContent>
                <TabsContent value="seo" className="mt-0">
                  <SEOSettings portfolioId={portfolioId} />
                </TabsContent>
                <TabsContent value="domain" className="mt-0">
                  <DomainSettings portfolioId={portfolioId} />
                </TabsContent>
                <TabsContent value="privacy" className="mt-0">
                  <PrivacySettings portfolioId={portfolioId} />
                </TabsContent>
                <TabsContent value="export" className="mt-0">
                  <ExportSettings portfolioId={portfolioId} />
                </TabsContent>
                <TabsContent value="danger" className="mt-0">
                  <DangerZoneSettings portfolioId={portfolioId} />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
