'use client';

import { useState } from 'react';
import { useWizard } from '@/contexts/wizard-context';
import { CheckCircle2 } from 'lucide-react';

const purposes = [
  {
    id: 'showcase',
    title: 'Showcase Work',
    description: 'Display your best projects and work samples',
    icon: '🎨',
  },
  {
    id: 'hire-me',
    title: 'Get Hired',
    description: 'Land your dream job with a professional portfolio',
    icon: '💼',
  },
  {
    id: 'freelance',
    title: 'Freelance Services',
    description: 'Attract clients and manage your freelance business',
    icon: '🚀',
  },
];

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design',
    preview: 'bg-gradient-to-br from-slate-900 to-slate-800',
    features: ['Minimalist', 'Fast Loading', 'Mobile Friendly'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern and bold design',
    preview: 'bg-gradient-to-br from-cyan-900 to-purple-900',
    features: ['Animations', 'Modern', 'Bold Colors'],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional business look',
    preview: 'bg-gradient-to-br from-blue-900 to-slate-900',
    features: ['Professional', 'Trustworthy', 'Corporate'],
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Modern tech-focused design',
    preview: 'bg-gradient-to-br from-orange-900 to-red-900',
    features: ['Trendy', 'Tech-Focused', 'Dynamic'],
  },
];

export default function Step1Purpose() {
  const { data, updateData, nextStep } = useWizard();
  const [showTemplates, setShowTemplates] = useState(false);

  const handlePurposeSelect = (purposeId: string) => {
    updateData({ purpose: purposeId as any });
  };

  const handleTemplateSelect = (templateId: string) => {
    updateData({ template: templateId as any });
  };

  const handleContinue = () => {
    if (data.purpose && data.template) {
      setShowTemplates(false);
      nextStep();
    }
  };

  return (
    <div className="space-y-8">
      {!showTemplates ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">What's your main goal?</h2>
            <p className="text-slate-400">Choose the purpose that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {purposes.map((purpose) => (
              <button
                key={purpose.id}
                onClick={() => handlePurposeSelect(purpose.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                  data.purpose === purpose.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className="text-3xl mb-3">{purpose.icon}</div>
                <h3 className="font-semibold text-white mb-1">{purpose.title}</h3>
                <p className="text-sm text-slate-400">{purpose.description}</p>
                {data.purpose === purpose.id && (
                  <div className="mt-4 flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-medium">Selected</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {data.purpose && (
            <button
              onClick={() => setShowTemplates(true)}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Next: Choose Template
            </button>
          )}
        </>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Choose a template</h2>
            <p className="text-slate-400">Select the design style that represents you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`p-6 rounded-lg border-2 transition-all duration-300 overflow-hidden ${
                  data.template === template.id
                    ? 'border-cyan-500 scale-105'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className={`${template.preview} h-32 rounded-md mb-4 flex items-center justify-center`}>
                  <span className="text-slate-400 font-medium">Template Preview</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <span key={feature} className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                      {feature}
                    </span>
                  ))}
                </div>
                {data.template === template.id && (
                  <div className="mt-4 flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-medium">Selected</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowTemplates(false)}
              className="flex-1 py-3 px-4 rounded-lg border-2 border-slate-700 text-white font-medium hover:border-slate-600 transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!data.template}
              className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}
