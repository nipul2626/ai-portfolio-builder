'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const WizardBackground = dynamic(
    () => import('@/components/wizard-background').then(mod => mod.WizardBackground),
    { ssr: false }
)
import { ProgressConstellation } from '@/components/progress-constellation'
import { ChooseMethodIsland } from '@/components/islands/choose-method-island'
import { TemplateIsland } from '@/components/islands/template-island'
import { ResumeIsland } from '@/components/islands/resume-island'
import { AIGenerateIsland } from '@/components/islands/ai-generate-island'
import { CustomizeIsland } from '@/components/islands/customize-island'
import { ReviewIsland } from '@/components/islands/review-island'
import { DeployIsland } from '@/components/islands/deploy-island'

export type WizardMethod = 'template' | 'resume' | 'ai' | null
export type WizardStep = 1 | 2 | 3 | 4 | 5

export interface PortfolioData {
  method: WizardMethod
  templateId?: string
  resumeData?: any
  aiPrompt?: string
  customization?: {
    colors?: any
    typography?: any
    sections?: any
  }
}

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    method: null
  })

  const handleMethodSelect = (method: WizardMethod) => {
    setPortfolioData({ ...portfolioData, method })
    setTimeout(() => setCurrentStep(2), 1000)
  }

  const handleTemplateSelect = (templateId: string) => {
    setPortfolioData({ ...portfolioData, templateId })
    setTimeout(() => setCurrentStep(3), 800)
  }

  const handleResumeUpload = (data: any) => {
    setPortfolioData({ ...portfolioData, resumeData: data })
    setTimeout(() => setCurrentStep(3), 800)
  }

  const handleAIGenerate = (prompt: string) => {
    setPortfolioData({ ...portfolioData, aiPrompt: prompt })
    setTimeout(() => setCurrentStep(3), 8000) // Wait for AI generation animation
  }

  const handleCustomize = (customization: any) => {
    setPortfolioData({ ...portfolioData, customization })
    setCurrentStep(4)
  }

  const handleReviewComplete = () => {
    setCurrentStep(5)
  }

  const handleStepJump = (step: WizardStep) => {
    // Only allow jumping to completed or current step
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      {/* 3D Background with starfield and nebula */}
      <WizardBackground currentStep={currentStep} method={portfolioData.method} />
      
      {/* Progress constellation indicator */}
      <ProgressConstellation 
        currentStep={currentStep} 
        onStepClick={handleStepJump}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <ChooseMethodIsland
              key="step-1"
              onMethodSelect={handleMethodSelect}
            />
          )}

          {currentStep === 2 && portfolioData.method === 'template' && (
            <TemplateIsland
              key="step-2-template"
              onTemplateSelect={handleTemplateSelect}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 2 && portfolioData.method === 'resume' && (
            <ResumeIsland
              key="step-2-resume"
              onResumeUpload={handleResumeUpload}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 2 && portfolioData.method === 'ai' && (
            <AIGenerateIsland
              key="step-2-ai"
              onGenerate={handleAIGenerate}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <CustomizeIsland
              key="step-3"
              portfolioData={portfolioData}
              onCustomize={handleCustomize}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <ReviewIsland
              key="step-4"
              portfolioData={portfolioData}
              onContinue={handleReviewComplete}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && (
            <DeployIsland
              key="step-5"
              portfolioData={portfolioData}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicators */}
      {currentStep < 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <p className="text-white/60 text-sm">Scroll or click Next to continue</p>
          <div className="flex flex-col gap-1 animate-bounce">
            <div className="w-6 h-6 border-2 border-white/40 border-t-0 border-l-0 rotate-45" />
          </div>
        </motion.div>
      )}
    </div>
  )
}
