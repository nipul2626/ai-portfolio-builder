'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import GeneralSettings from './tabs/general-settings'
import SEOSettings from './tabs/seo-settings'
import DomainSettings from './tabs/domain-settings'
import PrivacySettings from './tabs/privacy-settings'
import ExportSettings from './tabs/export-settings'
import DangerZoneSettings from './tabs/danger-zone-settings'

interface SettingsPageProps {
  params: {
    portfolioId: string
  }
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handleGoBack = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        window.history.back()
      }
    } else {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      {/* Subtle particle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full neu-card hover:glow-cyan transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Editor</span>
        </button>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-5xl font-bold gradient-text">Portfolio Settings</h1>
          </div>
          <p className="text-lg text-[#a0a0b8] font-outfit">
            Configure your portfolio settings and preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="sticky top-0 z-50 bg-gradient-to-b from-[#0a0a0f] to-transparent backdrop-blur-sm pb-6 mb-8">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full max-w-4xl grid-cols-6 gap-2 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="general"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#00f0ff] rounded-b-none px-4 py-2 text-sm font-medium"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#00f0ff] rounded-b-none px-4 py-2 text-sm font-medium"
              >
                SEO & Meta
              </TabsTrigger>
              <TabsTrigger
                value="domain"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#00f0ff] rounded-b-none px-4 py-2 text-sm font-medium"
              >
                Domain
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#00f0ff] rounded-b-none px-4 py-2 text-sm font-medium"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger
                value="export"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#00f0ff] rounded-b-none px-4 py-2 text-sm font-medium"
              >
                Export
              </TabsTrigger>
              <TabsTrigger
                value="danger"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-b-none px-4 py-2 text-sm font-medium text-red-400"
              >
                Danger Zone
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="general" className="mt-8">
              <GeneralSettings portfolioId={params.portfolioId} />
            </TabsContent>

            <TabsContent value="seo" className="mt-8">
              <SEOSettings portfolioId={params.portfolioId} />
            </TabsContent>

            <TabsContent value="domain" className="mt-8">
              <DomainSettings portfolioId={params.portfolioId} />
            </TabsContent>

            <TabsContent value="privacy" className="mt-8">
              <PrivacySettings portfolioId={params.portfolioId} />
            </TabsContent>

            <TabsContent value="export" className="mt-8">
              <ExportSettings portfolioId={params.portfolioId} />
            </TabsContent>

            <TabsContent value="danger" className="mt-8">
              <DangerZoneSettings portfolioId={params.portfolioId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
