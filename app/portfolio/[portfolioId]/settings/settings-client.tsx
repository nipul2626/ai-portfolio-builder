'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft } from 'lucide-react'
import GeneralSettings from './tabs/general-settings'
import SEOSettings from './tabs/seo-settings'
import DomainSettings from './tabs/domain-settings'
import PrivacySettings from './tabs/privacy-settings'
import ExportSettings from './tabs/export-settings'
import DangerZoneSettings from './tabs/danger-zone-settings'

interface Props {
    portfolioId: string
}

export default function SettingsClient({ portfolioId }: Props) {
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
            {/* Background Glow */}
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

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold gradient-text mb-4">
                        Portfolio Settings
                    </h1>
                    <p className="text-lg text-[#a0a0b8]">
                        Configure your portfolio settings and preferences
                    </p>
                </div>

                {/* Tabs */}
                <Tabs
                    defaultValue="general"
                    className="w-full"
                    id={`portfolio-settings-${portfolioId}`}
                >
                    <TabsList className="grid w-full max-w-4xl grid-cols-6 gap-2 bg-transparent p-0 h-auto">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
                        <TabsTrigger value="domain">Domain</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                        <TabsTrigger value="export">Export</TabsTrigger>
                        <TabsTrigger value="danger" className="text-red-400">
                            Danger Zone
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="mt-8">
                        <GeneralSettings portfolioId={portfolioId} />
                    </TabsContent>

                    <TabsContent value="seo" className="mt-8">
                        <SEOSettings portfolioId={portfolioId} />
                    </TabsContent>

                    <TabsContent value="domain" className="mt-8">
                        <DomainSettings portfolioId={portfolioId} />
                    </TabsContent>

                    <TabsContent value="privacy" className="mt-8">
                        <PrivacySettings portfolioId={portfolioId} />
                    </TabsContent>

                    <TabsContent value="export" className="mt-8">
                        <ExportSettings portfolioId={portfolioId} />
                    </TabsContent>

                    <TabsContent value="danger" className="mt-8">
                        <DangerZoneSettings portfolioId={portfolioId} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}