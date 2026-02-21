'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Pencil, Palette, Sparkles, X, ChevronDown, Send, ThumbsUp, ThumbsDown,
  Bold, Italic, Underline, Plus, Trash2, GripVertical, Image, AlignLeft,
  AlignCenter, AlignRight, Sliders
} from 'lucide-react'
import type { Section, SectionContent } from '@/app/editor/page'

type Props = {
  selectedSection: string | null
  sections: Section[]
  onSectionUpdate: (sectionId: string, updates: Partial<Section>) => void
}

type Tab = 'content' | 'design' | 'ai'

const quickActions = [
  'Improve this section',
  'Make professional',
  'Add impact metrics',
  'Optimize for recruiters',
  'Fix grammar',
  'Make concise',
]

const colorPresets = [
  { name: 'Oceanic', colors: ['#667eea', '#764ba2', '#f8fafc', '#334155'] },
  { name: 'Sunset', colors: ['#f97316', '#ef4444', '#fef3c7', '#1c1917'] },
  { name: 'Forest', colors: ['#22c55e', '#15803d', '#f0fdf4', '#14532d'] },
  { name: 'Midnight', colors: ['#3b82f6', '#1e40af', '#eff6ff', '#1e3a5f'] },
  { name: 'Rose', colors: ['#ec4899', '#be185d', '#fdf2f8', '#831843'] },
  { name: 'Monochrome', colors: ['#525252', '#171717', '#fafafa', '#262626'] },
]

export function PropertiesPanel({ selectedSection, sections, onSectionUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [isExpanded, setIsExpanded] = useState(true)
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { role: 'ai', text: 'Select a section and I can help improve your content, suggest better wording, or optimize for your target role.' },
  ])
  const [aiInput, setAiInput] = useState('')
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({
    headline: true, subheadline: true, bio: true, cta: true,
    experience: true, projects: true, skills: true, social: true,
  })

  const section = sections.find(s => s.id === selectedSection)

  const tabs = [
    { id: 'content' as Tab, label: 'Content', icon: Pencil },
    { id: 'design' as Tab, label: 'Design', icon: Palette },
    { id: 'ai' as Tab, label: 'AI', icon: Sparkles },
  ]

  const toggleAccordion = (key: string) => {
    setExpandedAccordions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const updateContent = useCallback((key: string, value: any) => {
    if (!section) return
    onSectionUpdate(section.id, {
      content: { ...section.content, [key]: value },
    })
  }, [section, onSectionUpdate])

  const handleAiSend = () => {
    if (!aiInput.trim()) return
    setAiMessages(prev => [...prev, { role: 'user', text: aiInput }])
    const input = aiInput
    setAiInput('')
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: 'ai',
        text: `Based on your "${section?.name}" section, here are my suggestions for "${input}": Consider adding more specific metrics and quantifiable achievements to make your content more impactful. Use action verbs like "spearheaded", "architected", or "optimized" to demonstrate leadership.`,
      }])
    }, 1200)
  }

  const handleQuickAction = (action: string) => {
    setAiMessages(prev => [...prev, { role: 'user', text: action }])
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: 'ai',
        text: `I've analyzed your "${section?.name || 'selected'}" section for "${action}". Here are my recommendations: Focus on quantifiable results, use industry-specific keywords, and maintain a professional yet engaging tone throughout.`,
      }])
    }, 1000)
  }

  if (!isExpanded) {
    return (
      <motion.button
        onClick={() => setIsExpanded(true)}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 p-3 bg-cyan-500 text-white rounded-l-lg shadow-lg hover:bg-cyan-600 transition-colors z-50"
      >
        <Sparkles className="w-5 h-5" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      className="w-[360px] bg-[#1a1a24] border-l border-white/10 flex flex-col overflow-hidden"
    >
      {/* Header + Tabs */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">Properties</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(false)}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.98 }}
              className={`relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md transition-all text-xs font-medium ${
                activeTab === tab.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="properties-tab"
                  className="absolute inset-0 bg-cyan-500/15 rounded-md border border-cyan-400/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <tab.icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto">
        {!section ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-4">
              <Pencil className="w-7 h-7 text-slate-600" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">No Selection</h3>
            <p className="text-xs text-slate-500">Select a section to edit its properties</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4 space-y-1"
              >
                {/* Section context */}
                <div className="px-3 py-2 bg-cyan-500/10 border border-cyan-400/20 rounded-lg mb-4">
                  <p className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">Editing</p>
                  <p className="text-sm text-white font-semibold">{section.name} Section</p>
                </div>

                {/* Section Name */}
                <AccordionSection title="Section Name" isOpen={true}>
                  <input
                    type="text"
                    value={section.name}
                    onChange={e => onSectionUpdate(section.id, { name: e.target.value })}
                    className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                </AccordionSection>

                {/* Hero fields */}
                {section.type === 'hero' && (
                  <>
                    <AccordionSection title="Main Headline" isOpen={expandedAccordions.headline} onToggle={() => toggleAccordion('headline')}>
                      <textarea
                        value={section.content.headline || ''}
                        onChange={e => updateContent('headline', e.target.value)}
                        rows={2}
                        maxLength={100}
                        className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-slate-500">{(section.content.headline || '').length}/100</span>
                        <AiImproveButton onClick={() => handleQuickAction('Improve headline')} />
                      </div>
                    </AccordionSection>

                    <AccordionSection title="Subheadline" isOpen={expandedAccordions.subheadline} onToggle={() => toggleAccordion('subheadline')}>
                      <textarea
                        value={section.content.subheadline || ''}
                        onChange={e => updateContent('subheadline', e.target.value)}
                        rows={2}
                        maxLength={200}
                        className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      />
                      <span className="text-[10px] text-slate-500">{(section.content.subheadline || '').length}/200</span>
                    </AccordionSection>

                    <AccordionSection title="CTA Button" isOpen={expandedAccordions.cta} onToggle={() => toggleAccordion('cta')}>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={section.content.ctaText || ''}
                          onChange={e => updateContent('ctaText', e.target.value)}
                          placeholder="Button text"
                          className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                        <input
                          type="url"
                          value={section.content.ctaLink || ''}
                          onChange={e => updateContent('ctaLink', e.target.value)}
                          placeholder="Button link URL"
                          className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </AccordionSection>
                  </>
                )}

                {/* About fields */}
                {section.type === 'about' && (
                  <>
                    <AccordionSection title="Bio Text" isOpen={expandedAccordions.bio} onToggle={() => toggleAccordion('bio')}>
                      <div className="flex gap-1 mb-2">
                        {[Bold, Italic, Underline].map((Icon, i) => (
                          <button key={i} className="p-1.5 bg-white/[0.06] hover:bg-white/10 border border-white/10 rounded text-slate-400 hover:text-white transition-colors">
                            <Icon className="w-3.5 h-3.5" />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={section.content.bio || ''}
                        onChange={e => updateContent('bio', e.target.value)}
                        rows={5}
                        className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {['Improve writing', 'Make professional', 'Add personality', 'Make concise'].map(action => (
                          <button
                            key={action}
                            onClick={() => handleQuickAction(action)}
                            className="px-2 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/20 rounded text-[10px] text-purple-300 font-medium transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </AccordionSection>

                    <AccordionSection title="Social Links" isOpen={expandedAccordions.social} onToggle={() => toggleAccordion('social')}>
                      <div className="space-y-2">
                        {(section.content.socialLinks || []).map((link, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 capitalize w-16">{link.platform}</span>
                            <input
                              type="url"
                              value={link.url}
                              onChange={e => {
                                const links = [...(section.content.socialLinks || [])]
                                links[i] = { ...links[i], url: e.target.value }
                                updateContent('socialLinks', links)
                              }}
                              className="flex-1 px-2 py-1.5 bg-white/[0.06] border border-white/10 rounded text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors"
                            />
                            <button
                              onClick={() => {
                                const links = (section.content.socialLinks || []).filter((_, j) => j !== i)
                                updateContent('socialLinks', links)
                              }}
                              className="p-1 hover:bg-red-500/20 rounded transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const links = [...(section.content.socialLinks || []), { platform: 'website', url: '' }]
                            updateContent('socialLinks', links)
                          }}
                          className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add Link
                        </button>
                      </div>
                    </AccordionSection>
                  </>
                )}

                {/* Experience fields */}
                {section.type === 'experience' && (
                  <AccordionSection title="Entries" isOpen={expandedAccordions.experience} onToggle={() => toggleAccordion('experience')}>
                    <div className="space-y-2">
                      {(section.content.items || []).map((item, i) => (
                        <div key={item.id || i} className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-white">{item.title || item.role || 'Untitled'}</h4>
                            <button
                              onClick={() => {
                                const items = (section.content.items || []).filter((_, j) => j !== i)
                                updateContent('items', items)
                              }}
                              className="p-1 hover:bg-red-500/20 rounded"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500">{item.company} | {item.dateRange}</p>
                          <textarea
                            value={item.description || ''}
                            onChange={e => {
                              const items = [...(section.content.items || [])]
                              items[i] = { ...items[i], description: e.target.value }
                              updateContent('items', items)
                            }}
                            rows={2}
                            className="w-full mt-2 px-2 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                            placeholder="Description..."
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const items = [...(section.content.items || []), {
                            id: Date.now().toString(),
                            title: 'New Position',
                            company: 'Company',
                            role: 'Role',
                            dateRange: '2024 - Present',
                            description: '',
                            achievements: [],
                          }]
                          updateContent('items', items)
                        }}
                        className="w-full py-2 border border-dashed border-white/20 hover:border-cyan-400/50 rounded-lg text-xs text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add Experience
                      </button>
                    </div>
                  </AccordionSection>
                )}

                {/* Skills fields */}
                {section.type === 'skills' && (
                  <AccordionSection title="Skills" isOpen={expandedAccordions.skills} onToggle={() => toggleAccordion('skills')}>
                    <div className="space-y-3">
                      {(section.content.items || []).map((item, i) => (
                        <div key={item.id || i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={e => {
                              const items = [...(section.content.items || [])]
                              items[i] = { ...items[i], title: e.target.value }
                              updateContent('items', items)
                            }}
                            className="flex-1 px-2 py-1.5 bg-white/[0.06] border border-white/10 rounded text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors"
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={item.proficiency || 50}
                            onChange={e => {
                              const items = [...(section.content.items || [])]
                              items[i] = { ...items[i], proficiency: parseInt(e.target.value) }
                              updateContent('items', items)
                            }}
                            className="w-20"
                          />
                          <span className="text-[10px] text-slate-400 w-8">{item.proficiency || 50}%</span>
                          <button onClick={() => {
                            const items = (section.content.items || []).filter((_, j) => j !== i)
                            updateContent('items', items)
                          }} className="p-1 hover:bg-red-500/20 rounded">
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const items = [...(section.content.items || []), { id: Date.now().toString(), title: 'New Skill', proficiency: 75 }]
                          updateContent('items', items)
                        }}
                        className="w-full py-2 border border-dashed border-white/20 hover:border-cyan-400/50 rounded-lg text-xs text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add Skill
                      </button>
                    </div>
                  </AccordionSection>
                )}

                {/* Contact fields */}
                {section.type === 'contact' && (
                  <AccordionSection title="Contact Info" isOpen={true}>
                    <div className="space-y-2">
                      <input type="email" value={section.content.email || ''} onChange={e => updateContent('email', e.target.value)} placeholder="Email" className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors" />
                      <input type="tel" value={section.content.phone || ''} onChange={e => updateContent('phone', e.target.value)} placeholder="Phone" className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors" />
                      <input type="text" value={section.content.location || ''} onChange={e => updateContent('location', e.target.value)} placeholder="Location" className="w-full px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors" />
                    </div>
                  </AccordionSection>
                )}

                {/* Projects */}
                {section.type === 'projects' && (
                  <AccordionSection title="Projects" isOpen={expandedAccordions.projects} onToggle={() => toggleAccordion('projects')}>
                    <div className="space-y-2">
                      {(section.content.items || []).map((item, i) => (
                        <div key={item.id || i} className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={e => {
                                const items = [...(section.content.items || [])]
                                items[i] = { ...items[i], title: e.target.value }
                                updateContent('items', items)
                              }}
                              className="bg-transparent text-sm font-medium text-white focus:outline-none flex-1"
                            />
                            <button onClick={() => {
                              const items = (section.content.items || []).filter((_, j) => j !== i)
                              updateContent('items', items)
                            }} className="p-1 hover:bg-red-500/20 rounded">
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                          <textarea
                            value={item.description || ''}
                            onChange={e => {
                              const items = [...(section.content.items || [])]
                              items[i] = { ...items[i], description: e.target.value }
                              updateContent('items', items)
                            }}
                            rows={2}
                            className="w-full px-2 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                            placeholder="Description..."
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const items = [...(section.content.items || []), { id: Date.now().toString(), title: 'New Project', description: '', tags: ['React'] }]
                          updateContent('items', items)
                        }}
                        className="w-full py-2 border border-dashed border-white/20 hover:border-cyan-400/50 rounded-lg text-xs text-slate-400 hover:text-cyan-400 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add Project
                      </button>
                    </div>
                  </AccordionSection>
                )}
              </motion.div>
            )}

            {/* Design Tab */}
            {activeTab === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4 space-y-5"
              >
                {/* Color scheme presets */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Color Presets</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <motion.button
                        key={preset.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/40 rounded-lg transition-colors"
                      >
                        <div className="flex gap-1 mb-1.5 justify-center">
                          {preset.colors.map((color, i) => (
                            <div key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-400 text-center">{preset.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Background</h3>
                  <input
                    type="color"
                    defaultValue="#ffffff"
                    className="w-full h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                </div>

                {/* Text alignment */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Text Alignment</h3>
                  <div className="flex gap-2">
                    {[
                      { icon: AlignLeft, value: 'left' },
                      { icon: AlignCenter, value: 'center' },
                      { icon: AlignRight, value: 'right' },
                    ].map(({ icon: Icon, value }) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 p-2 bg-white/[0.06] hover:bg-white/10 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
                      >
                        <Icon className="w-4 h-4 mx-auto" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Typography</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Heading Size', min: 24, max: 72, default: 48 },
                      { label: 'Body Size', min: 12, max: 24, default: 16 },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-slate-400">{item.label}</span>
                          <span className="text-xs text-white font-mono">{item.default}px</span>
                        </div>
                        <input type="range" min={item.min} max={item.max} defaultValue={item.default} className="w-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animations */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Animations</h3>
                  <div className="space-y-2">
                    {['None', 'Subtle', 'Moderate', 'Heavy'].map(level => (
                      <label key={level} className="flex items-center gap-2 p-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg cursor-pointer transition-colors">
                        <input type="radio" name="animation" defaultChecked={level === 'Subtle'} className="accent-cyan-400" />
                        <span className="text-xs text-slate-300">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Effects */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">Effects</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Fade on Scroll', defaultChecked: true },
                      { label: 'Parallax Effect', defaultChecked: false },
                      { label: 'Hover Animations', defaultChecked: true },
                    ].map(effect => (
                      <div key={effect.label} className="flex items-center justify-between p-2 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                        <span className="text-xs text-slate-300">{effect.label}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={effect.defaultChecked} className="sr-only peer" />
                          <div className="w-8 h-4 bg-white/10 peer-checked:bg-cyan-500 rounded-full peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Tab */}
            {activeTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex flex-col h-full"
              >
                {/* Header */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                  </div>
                  {section && (
                    <p className="text-[10px] text-purple-300/60">
                      {'Editing: '}{section.name} Section
                    </p>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-2 flex flex-wrap gap-1.5">
                  {quickActions.map(action => (
                    <motion.button
                      key={action}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleQuickAction(action)}
                      className="px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/20 rounded-full text-[10px] text-purple-300 font-medium transition-colors"
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                  {aiMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-400/20 rounded-br-none'
                          : 'bg-purple-500/10 text-slate-300 border border-purple-400/15 rounded-bl-none'
                      }`}>
                        {msg.text}
                        {msg.role === 'ai' && (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06]">
                            <button className="p-1 hover:bg-white/10 rounded transition-colors"><ThumbsUp className="w-3 h-3 text-slate-500" /></button>
                            <button className="p-1 hover:bg-white/10 rounded transition-colors"><ThumbsDown className="w-3 h-3 text-slate-500" /></button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-end gap-2">
                    <textarea
                      value={aiInput}
                      onChange={e => setAiInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiSend() } }}
                      placeholder="Ask AI for help..."
                      rows={2}
                      maxLength={500}
                      className="flex-1 px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-xs focus:border-purple-400 focus:outline-none transition-colors resize-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleAiSend}
                      disabled={!aiInput.trim()}
                      className="p-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors disabled:opacity-30"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-[9px] text-slate-600 mt-1 text-right">{aiInput.length}/500</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}

function AccordionSection({ title, isOpen = true, onToggle, children }: {
  title: string
  isOpen?: boolean
  onToggle?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-white/[0.06] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
      >
        <span className="text-xs font-medium text-slate-300">{title}</span>
        {onToggle && (
          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-3 pb-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AiImproveButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/20 rounded text-[10px] text-purple-300 font-medium transition-colors"
    >
      <Sparkles className="w-3 h-3" />
      AI Improve
    </motion.button>
  )
}
