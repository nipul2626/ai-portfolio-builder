'use client';

import { useWizard } from '@/contexts/wizard-context';
import Step1Purpose from './wizard-steps/step-1-purpose';
import Step2BasicInfo from './wizard-steps/step-2-basic-info';
import Step3Skills from './wizard-steps/step-3-skills';
import Step4Projects from './wizard-steps/step-4-projects';
import Step5Contact from './wizard-steps/step-5-contact';
import Step6Theme from './wizard-steps/step-6-theme';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, label: 'Purpose', icon: '🎯' },
  { id: 2, label: 'Basic Info', icon: '👤' },
  { id: 3, label: 'Skills', icon: '⚙️' },
  { id: 4, label: 'Work', icon: '💼' },
  { id: 5, label: 'Contact', icon: '📧' },
  { id: 6, label: 'Theme', icon: '🎨' },
];

export default function PortfolioWizard() {
  const { currentStep, data } = useWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Purpose />;
      case 2:
        return <Step2BasicInfo />;
      case 3:
        return <Step3Skills />;
      case 4:
        return <Step4Projects />;
      case 5:
        return <Step5Contact />;
      case 6:
        return <Step6Theme />;
      default:
        return <Step1Purpose />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Create Your Portfolio
          </h1>
          <p className="text-slate-400">Follow these simple steps to build your professional portfolio</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      isCompleted
                        ? 'bg-cyan-500 text-white'
                        : isCurrent
                          ? 'bg-cyan-500/30 border-2 border-cyan-500 text-cyan-400'
                          : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check size={20} /> : step.icon}
                  </div>

                  {/* Step Label */}
                  <div className="text-center flex-1 mx-2">
                    <p className={`text-xs font-medium ${isCurrent ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-slate-600">Step {step.id}/6</p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-cyan-500' : 'bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-slate-800/50 border-2 border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
          {renderStep()}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Step {currentStep} of 6</p>
        </div>
      </div>
    </div>
  );
}
