'use client';

import { useWizard } from '@/contexts/wizard-context';
import { CheckCircle2 } from 'lucide-react';

const themes = [
  { id: 'dark', label: 'Dark Mode', bg: 'bg-gradient-to-br from-slate-950 to-slate-900' },
  { id: 'light', label: 'Light Mode', bg: 'bg-gradient-to-br from-white to-slate-50' },
  { id: 'auto', label: 'Auto (System)', bg: 'bg-gradient-to-br from-slate-900 to-white' },
];

const colors = [
  { id: '#00d9ff', label: 'Cyan', bg: 'bg-cyan-500' },
  { id: '#3b82f6', label: 'Blue', bg: 'bg-blue-500' },
  { id: '#8b5cf6', label: 'Purple', bg: 'bg-purple-500' },
  { id: '#ec4899', label: 'Pink', bg: 'bg-pink-500' },
  { id: '#f59e0b', label: 'Amber', bg: 'bg-amber-500' },
  { id: '#10b981', label: 'Emerald', bg: 'bg-emerald-500' },
];

const fonts = [
  { id: 'inter', label: 'Inter', preview: 'font-sans' },
  { id: 'poppins', label: 'Poppins', preview: 'font-sans' },
  { id: 'playfair', label: 'Playfair Display', preview: 'font-serif' },
  { id: 'roboto', label: 'Roboto', preview: 'font-sans' },
];

const layouts = [
  { id: 'sidebar', label: 'Sidebar Layout', description: 'Classic sidebar navigation' },
  { id: 'header', label: 'Header Layout', description: 'Top navigation bar' },
  { id: 'fullwidth', label: 'Full Width', description: 'Maximized content area' },
];

export default function Step6Theme() {
  const { data, updateData, nextStep, prevStep } = useWizard();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Customize Your Portfolio</h2>
        <p className="text-slate-400">Choose your theme, colors, and layout preferences</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => updateData({ theme: theme.id as any })}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                data.theme === theme.id
                  ? 'border-cyan-500'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className={`h-16 rounded-md mb-3 ${theme.bg}`} />
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">{theme.label}</span>
                {data.theme === theme.id && <CheckCircle2 size={18} className="text-cyan-400" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Primary Color</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => updateData({ primaryColor: color.id })}
              className={`relative p-3 rounded-lg border-2 transition-all duration-300 ${
                data.primaryColor === color.id
                  ? 'border-white scale-110'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className={`h-8 rounded-md ${color.bg}`} />
              <p className="text-xs text-slate-400 text-center mt-2">{color.label}</p>
              {data.primaryColor === color.id && (
                <CheckCircle2 size={16} className="absolute -top-2 -right-2 text-cyan-400 bg-slate-900 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Font Family</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {fonts.map((font) => (
            <button
              key={font.id}
              onClick={() => updateData({ fontFamily: font.id as any })}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                data.fontFamily === font.id
                  ? 'border-cyan-500'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className={`${font.preview} text-xl font-bold text-white mb-2`}>{font.label}</div>
              <p className="text-xs text-slate-400">Aa Bb Cc</p>
              {data.fontFamily === font.id && (
                <div className="mt-2 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Layout</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => updateData({ layout: layout.id as any })}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                data.layout === layout.id
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
              }`}
            >
              <div className="font-medium text-white mb-1">{layout.label}</div>
              <p className="text-sm text-slate-400 mb-3">{layout.description}</p>
              {data.layout === layout.id && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-medium">Selected</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Portfolio Features</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-700 bg-slate-800/50 hover:border-slate-600 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={data.customizations.showStats}
              onChange={(e) =>
                updateData({
                  customizations: {
                    ...data.customizations,
                    showStats: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 rounded-md accent-cyan-500"
            />
            <div>
              <div className="text-white font-medium">Show Statistics</div>
              <p className="text-xs text-slate-400">Display portfolio stats and metrics</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-700 bg-slate-800/50 hover:border-slate-600 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={data.customizations.showTestimonials}
              onChange={(e) =>
                updateData({
                  customizations: {
                    ...data.customizations,
                    showTestimonials: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 rounded-md accent-cyan-500"
            />
            <div>
              <div className="text-white font-medium">Show Testimonials</div>
              <p className="text-xs text-slate-400">Display client testimonials section</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-slate-700 bg-slate-800/50 hover:border-slate-600 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={data.customizations.animationsEnabled}
              onChange={(e) =>
                updateData({
                  customizations: {
                    ...data.customizations,
                    animationsEnabled: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 rounded-md accent-cyan-500"
            />
            <div>
              <div className="text-white font-medium">Enable Animations</div>
              <p className="text-xs text-slate-400">Add smooth transitions and animations</p>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={prevStep}
          className="flex-1 py-3 px-4 rounded-lg border-2 border-slate-700 text-white font-medium hover:border-slate-600 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
        >
          Create Portfolio
        </button>
      </div>
    </div>
  );
}
