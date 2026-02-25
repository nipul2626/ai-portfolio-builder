  'use client'

  import { useState, useCallback, useEffect, useRef } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { EditorActionBar } from '@/components/editor/editor-action-bar'
  import { SectionsPanel } from '@/components/editor/sections-panel'
  import { LivePreviewCanvas } from '@/components/editor/live-preview-canvas'
  import { PropertiesPanel } from '@/components/editor/properties-panel'
  import { LayersHistoryPanel } from '@/components/editor/layers-history-panel'
  import { Layers, Keyboard, X } from 'lucide-react'

  export type DeviceMode = 'desktop' | 'tablet' | 'mobile'
  export type EditorMode = 'edit' | 'preview'

  export type SectionContent = {
    headline?: string
    subheadline?: string
    bio?: string
    ctaText?: string
    ctaLink?: string
    items?: Array<{
      id: string
      title: string
      subtitle?: string
      description?: string
      dateRange?: string
      tags?: string[]
      imageUrl?: string
      liveUrl?: string
      repoUrl?: string
      proficiency?: number
      company?: string
      role?: string
      current?: boolean
      achievements?: string[]
      institution?: string
      degree?: string
      grade?: string
    }>
    socialLinks?: Array<{ platform: string; url: string }>
    email?: string
    phone?: string
    location?: string
  }

  export type Section = {
    id: string
    type: string
    name: string
    visible: boolean
    order: number
    content: SectionContent
    styles?: {
      background?: string
      textAlign?: string
      padding?: string
      layout?: string
    }
  }

  export type HistoryEntry = {
    id: string
    action: string
    timestamp: string
    sectionId?: string
    sectionName?: string
  }

  const defaultSections: Section[] = [
    {
      id: '1', type: 'hero', name: 'Hero', visible: true, order: 0,
      content: {
        headline: 'John Doe',
        subheadline: 'Full Stack Developer & Designer',
        ctaText: 'View Projects',
        ctaLink: '#projects',
      },
    },
    {
      id: '2', type: 'about', name: 'About', visible: true, order: 1,
      content: {
        bio: "I'm a passionate developer with expertise in modern web technologies. I love building beautiful and functional user experiences that solve real-world problems.",
        socialLinks: [
          { platform: 'github', url: 'https://github.com/johndoe' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' },
          { platform: 'twitter', url: 'https://twitter.com/johndoe' },
        ],
      },
    },
    {
      id: '3', type: 'experience', name: 'Experience', visible: true, order: 2,
      content: {
        items: [
          {
            id: 'exp-1', title: 'Senior Developer', company: 'Tech Corp', role: 'Senior Developer',
            dateRange: '2021 - Present', current: true,
            description: 'Led development of microservices architecture serving 1M+ users.',
            achievements: ['Reduced load times by 40%', 'Mentored 5 junior developers', 'Implemented CI/CD pipeline'],
          },
          {
            id: 'exp-2', title: 'Developer', company: 'StartupXYZ', role: 'Full Stack Developer',
            dateRange: '2019 - 2021', current: false,
            description: 'Built core product features from scratch.',
            achievements: ['Shipped 15+ features', 'Increased test coverage to 85%'],
          },
        ],
      },
    },
    {
      id: '4', type: 'projects', name: 'Projects', visible: true, order: 3,
      content: {
        items: [
          { id: 'proj-1', title: 'E-Commerce Platform', description: 'Full-stack marketplace with real-time inventory', tags: ['React', 'Node.js', 'PostgreSQL'], liveUrl: '#', repoUrl: '#' },
          { id: 'proj-2', title: 'AI Dashboard', description: 'Analytics dashboard with ML predictions', tags: ['Next.js', 'Python', 'TensorFlow'], liveUrl: '#', repoUrl: '#' },
          { id: 'proj-3', title: 'Chat Application', description: 'Real-time messaging with WebSocket', tags: ['React', 'Socket.io', 'Redis'], liveUrl: '#', repoUrl: '#' },
          { id: 'proj-4', title: 'Portfolio Builder', description: 'AI-powered portfolio creation tool', tags: ['TypeScript', 'AI SDK', 'Tailwind'], liveUrl: '#', repoUrl: '#' },
        ],
      },
    },
    {
      id: '5', type: 'skills', name: 'Skills', visible: true, order: 4,
      content: {
        items: [
          { id: 'sk-1', title: 'React', proficiency: 95 },
          { id: 'sk-2', title: 'TypeScript', proficiency: 90 },
          { id: 'sk-3', title: 'Node.js', proficiency: 88 },
          { id: 'sk-4', title: 'Python', proficiency: 80 },
          { id: 'sk-5', title: 'AWS', proficiency: 75 },
          { id: 'sk-6', title: 'Docker', proficiency: 70 },
        ],
      },
    },
    {
      id: '6', type: 'education', name: 'Education', visible: true, order: 5,
      content: {
        items: [
          { id: 'edu-1', title: 'B.S. Computer Science', institution: 'MIT', dateRange: '2015 - 2019', grade: '3.9 GPA' },
        ],
      },
    },
    {
      id: '7', type: 'contact', name: 'Contact', visible: true, order: 6,
      content: {
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
      },
    },
  ]

  export default function EditorPage() {
    const [portfolioName, setPortfolioName] = useState('My Portfolio')
    const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
    const [editorMode, setEditorMode] = useState<EditorMode>('edit')
    const [zoom, setZoom] = useState(100)
    const [sections, setSections] = useState<Section[]>(defaultSections)
    const [selectedSection, setSelectedSection] = useState<string | null>(null)
    const [history, setHistory] = useState<HistoryEntry[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [showLayersPanel, setShowLayersPanel] = useState(false)
    const [showShortcuts, setShowShortcuts] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
    const sectionsRef = useRef(sections)
    sectionsRef.current = sections

    const addHistoryEntry = useCallback((action: string, sectionId?: string, sectionName?: string) => {
      const entry: HistoryEntry = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        action,
        timestamp: new Date().toLocaleTimeString(),
        sectionId,
        sectionName,
      }
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), entry]
        return newHistory.slice(-100)
      })
      setHistoryIndex(prev => prev + 1)
    }, [historyIndex])

    const handleUndo = useCallback(() => {
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1)
      }
    }, [historyIndex])

    const handleRedo = useCallback(() => {
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1)
      }
    }, [historyIndex, history.length])

    const handleSectionReorder = useCallback((newSections: Section[]) => {
      setSections(newSections)
      setSaveStatus('unsaved')
      addHistoryEntry('Reordered sections')
    }, [addHistoryEntry])

    const handleSectionToggleVisibility = useCallback((sectionId: string) => {
      const section = sectionsRef.current.find(s => s.id === sectionId)
      setSections(prev => prev.map(s =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      ))
      setSaveStatus('unsaved')
      addHistoryEntry(
        `${section?.visible ? 'Hid' : 'Showed'} section`,
        sectionId,
        section?.name
      )
    }, [addHistoryEntry])

    const handleAddSection = useCallback((type: string, name: string) => {
      const newSection: Section = {
        id: Date.now().toString(),
        type,
        name,
        visible: true,
        order: sections.length,
        content: {},
      }
      setSections(prev => [...prev, newSection])
      setSaveStatus('unsaved')
      addHistoryEntry(`Added "${name}" section`, newSection.id, name)
    }, [sections.length, addHistoryEntry])

    const handleDeleteSection = useCallback((sectionId: string) => {
      const section = sectionsRef.current.find(s => s.id === sectionId)
      setSections(prev => prev.filter(s => s.id !== sectionId))
      if (selectedSection === sectionId) setSelectedSection(null)
      setSaveStatus('unsaved')
      addHistoryEntry(`Deleted "${section?.name}" section`, sectionId, section?.name)
    }, [selectedSection, addHistoryEntry])

    const handleDuplicateSection = useCallback((sectionId: string) => {
      const section = sectionsRef.current.find(s => s.id === sectionId)
      if (!section) return
      const duplicate: Section = {
        ...section,
        id: Date.now().toString(),
        name: `${section.name} (Copy)`,
        order: sections.length,
        content: { ...section.content },
      }
      setSections(prev => [...prev, duplicate])
      setSaveStatus('unsaved')
      addHistoryEntry(`Duplicated "${section.name}" section`, duplicate.id, duplicate.name)
    }, [sections.length, addHistoryEntry])

    const handleSectionUpdate = useCallback((sectionId: string, updates: Partial<Section>) => {
      setSections(prev => prev.map(s =>
        s.id === sectionId ? { ...s, ...updates } : s
      ))
      setSaveStatus('unsaved')
    }, [])

    // Auto-save timer
    useEffect(() => {
      if (saveStatus !== 'unsaved') return
      const timer = setTimeout(() => {
        setSaveStatus('saving')
        setTimeout(() => setSaveStatus('saved'), 800)
      }, 30000)
      return () => clearTimeout(timer)
    }, [saveStatus, sections])

    // Keyboard shortcuts
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const isCmd = e.ctrlKey || e.metaKey

        if (isCmd && e.key === 'z') {
          e.preventDefault()
          if (e.shiftKey) handleRedo()
          else handleUndo()
        }
        if (isCmd && e.key === 's') {
          e.preventDefault()
          setSaveStatus('saving')
          setTimeout(() => setSaveStatus('saved'), 800)
        }
        if (isCmd && e.key === 'd' && selectedSection) {
          e.preventDefault()
          handleDuplicateSection(selectedSection)
        }
        if (e.key === 'Delete' && selectedSection) {
          handleDeleteSection(selectedSection)
        }
        if (e.key === 'Escape') {
          setSelectedSection(null)
          setShowShortcuts(false)
        }
        if (e.key === '?') {
          setShowShortcuts(prev => !prev)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleUndo, handleRedo, selectedSection, handleDuplicateSection, handleDeleteSection])

    return (
      <div className="h-screen w-full flex flex-col bg-[#12121a] overflow-hidden">
        <EditorActionBar
          portfolioName={portfolioName}
          onPortfolioNameChange={setPortfolioName}
          deviceMode={deviceMode}
          onDeviceModeChange={setDeviceMode}
          zoom={zoom}
          onZoomChange={setZoom}
          editorMode={editorMode}
          onEditorModeChange={setEditorMode}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
          saveStatus={saveStatus}
        />

        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence>
            {editorMode === 'edit' && (
              <SectionsPanel
                sections={sections}
                selectedSection={selectedSection}
                onSectionSelect={setSelectedSection}
                onSectionReorder={handleSectionReorder}
                onSectionToggleVisibility={handleSectionToggleVisibility}
                onAddSection={handleAddSection}
                onDeleteSection={handleDeleteSection}
              />
            )}
          </AnimatePresence>

          <LivePreviewCanvas
            sections={sections}
            selectedSection={selectedSection}
            onSectionSelect={setSelectedSection}
            deviceMode={deviceMode}
            zoom={zoom}
            editorMode={editorMode}
            onDuplicate={handleDuplicateSection}
            onDelete={handleDeleteSection}
          />

          <AnimatePresence>
            {editorMode === 'edit' && (
              <PropertiesPanel
                selectedSection={selectedSection}
                sections={sections}
                onSectionUpdate={handleSectionUpdate}
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showLayersPanel && (
            <LayersHistoryPanel
              sections={sections}
              selectedSection={selectedSection}
              onSectionSelect={setSelectedSection}
              history={history}
              historyIndex={historyIndex}
              onHistoryJump={setHistoryIndex}
              onClose={() => setShowLayersPanel(false)}
              onToggleVisibility={handleSectionToggleVisibility}
            />
          )}
        </AnimatePresence>

        {/* Bottom toolbar */}
        <div className="flex items-center gap-2 fixed bottom-4 right-4 z-50">
          <motion.button
            onClick={() => setShowShortcuts(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-all"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 border border-white/20 rounded-full backdrop-blur-sm transition-all ${showLayersPanel ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            title="Layers & History"
          >
            <Layers className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Shortcuts Modal */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowShortcuts(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="w-[600px] max-h-[80vh] bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
                  <button onClick={() => setShowShortcuts(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                  {[
                    {
                      category: 'General',
                      shortcuts: [
                        { keys: ['Ctrl', 'S'], desc: 'Save' },
                        { keys: ['Ctrl', 'Z'], desc: 'Undo' },
                        { keys: ['Ctrl', 'Shift', 'Z'], desc: 'Redo' },
                        { keys: ['Esc'], desc: 'Deselect / Close modal' },
                        { keys: ['?'], desc: 'Toggle shortcuts panel' },
                      ],
                    },
                    {
                      category: 'Selection',
                      shortcuts: [
                        { keys: ['Ctrl', 'D'], desc: 'Duplicate selected section' },
                        { keys: ['Delete'], desc: 'Delete selected section' },
                        { keys: ['Ctrl', 'A'], desc: 'Select all' },
                      ],
                    },
                  ].map(group => (
                    <div key={group.category}>
                      <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">{group.category}</h3>
                      <div className="space-y-2">
                        {group.shortcuts.map((shortcut, i) => (
                          <div key={i} className="flex items-center justify-between py-2">
                            <span className="text-sm text-slate-300">{shortcut.desc}</span>
                            <div className="flex items-center gap-1">
                              {shortcut.keys.map((key, j) => (
                                <span key={j}>
                                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white font-mono">{key}</kbd>
                                  {j < shortcut.keys.length - 1 && <span className="text-slate-500 mx-1">+</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
