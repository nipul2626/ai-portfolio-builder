'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Sparkles, Copy, Trash2 } from 'lucide-react'
import type { Section, DeviceMode, EditorMode } from '@/app/editor/page'

type Props = {
  sections: Section[]
  selectedSection: string | null
  onSectionSelect: (id: string) => void
  deviceMode: DeviceMode
  zoom: number
  editorMode: EditorMode
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
}

const deviceWidths: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}

function HeroPreview({ content }: { content: any }) {
  return (
    <div className="text-white text-center py-20 px-8">
      <h1 className="text-5xl font-bold mb-4">{content?.headline || 'Your Name'}</h1>
      <p className="text-xl mb-8 text-white/80">{content?.subheadline || 'Your Title'}</p>
      <div className="flex gap-4 justify-center">
        <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
          {content?.ctaText || 'View Projects'}
        </button>
        <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold">
          Contact Me
        </button>
      </div>
    </div>
  )
}

function AboutPreview({ content }: { content: any }) {
  return (
    <div className="py-16 px-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">About Me</h2>
      <p className="text-lg text-slate-600 leading-relaxed mb-6">
        {content?.bio || 'Tell your story here...'}
      </p>
      {content?.socialLinks && content.socialLinks.length > 0 && (
        <div className="flex gap-3">
          {content.socialLinks.map((link: any, i: number) => (
            <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium capitalize">
              {link.platform}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function ExperiencePreview({ content }: { content: any }) {
  return (
    <div className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Experience</h2>
      <div className="space-y-6 max-w-3xl mx-auto">
        {(content?.items || []).map((item: any, i: number) => (
          <div key={item.id || i} className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-xl font-semibold text-slate-900">{item.title || item.role}</h3>
            <p className="text-slate-500">{item.company} {item.dateRange && `| ${item.dateRange}`}</p>
            {item.description && <p className="text-slate-600 mt-2">{item.description}</p>}
            {item.achievements && item.achievements.length > 0 && (
              <ul className="mt-2 space-y-1">
                {item.achievements.map((a: string, j: number) => (
                  <li key={j} className="text-sm text-slate-500 flex items-start gap-2">
                    <span className="text-purple-500 mt-1">{'>'}</span> {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {(!content?.items || content.items.length === 0) && (
          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-xl font-semibold text-slate-900">Senior Developer</h3>
            <p className="text-slate-500">{'Tech Company | 2020 - Present'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectsPreview({ content }: { content: any }) {
  const items = content?.items || []
  return (
    <div className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Projects</h2>
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {(items.length > 0 ? items : [1, 2, 3, 4].map((i: number) => ({ id: i, title: `Project ${i}`, description: 'Project description', tags: ['React', 'Node.js'] }))).map((item: any, i: number) => (
          <div key={item.id || i} className="bg-white rounded-xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-4" />
            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
            {item.description && <p className="text-sm text-slate-500 mb-3">{item.description}</p>}
            {item.tags && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag: string, j: number) => (
                  <span key={j} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs font-medium">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillsPreview({ content }: { content: any }) {
  const items = content?.items || []
  return (
    <div className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Skills</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {(items.length > 0 ? items : [
          { title: 'React', proficiency: 95 },
          { title: 'TypeScript', proficiency: 90 },
          { title: 'Node.js', proficiency: 85 },
        ]).map((item: any, i: number) => (
          <div key={item.id || i}>
            <div className="flex justify-between mb-1.5">
              <span className="font-medium text-slate-700">{item.title}</span>
              <span className="text-sm text-slate-500">{item.proficiency}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${item.proficiency || 50}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationPreview({ content }: { content: any }) {
  const items = content?.items || []
  return (
    <div className="py-16 px-8">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Education</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {(items.length > 0 ? items : [
          { title: 'B.S. Computer Science', institution: 'University', dateRange: '2015-2019' },
        ]).map((item: any, i: number) => (
          <div key={item.id || i} className="border-l-4 border-indigo-500 pl-6">
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="text-slate-500">{item.institution}{item.dateRange ? ` | ${item.dateRange}` : ''}</p>
            {item.grade && <p className="text-sm text-slate-400 mt-1">{item.grade}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactPreview({ content }: { content: any }) {
  return (
    <div className="py-16 px-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-slate-900">Get In Touch</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">{'Feel free to reach out for collaborations or just a friendly hello'}</p>
      <div className="flex flex-col items-center gap-3">
        {content?.email && <p className="text-purple-600 font-medium">{content.email}</p>}
        {content?.phone && <p className="text-slate-600">{content.phone}</p>}
        {content?.location && <p className="text-slate-500 text-sm">{content.location}</p>}
      </div>
    </div>
  )
}

const sectionBg: Record<string, string> = {
  hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  about: '#f8fafc',
  experience: '#ffffff',
  projects: '#f1f5f9',
  skills: '#ffffff',
  education: '#f8fafc',
  certifications: '#ffffff',
  contact: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  custom: '#ffffff',
}

const sectionRenderers: Record<string, React.FC<{ content: any }>> = {
  hero: HeroPreview,
  about: AboutPreview,
  experience: ExperiencePreview,
  projects: ProjectsPreview,
  skills: SkillsPreview,
  education: EducationPreview,
  contact: ContactPreview,
}

export function LivePreviewCanvas({
  sections,
  selectedSection,
  onSectionSelect,
  deviceMode,
  zoom,
  editorMode,
  onDuplicate,
  onDelete,
}: Props) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  return (
    <div className="flex-1 bg-[#0f0f15] bg-grid-pattern p-8 overflow-auto">
      <div className="flex items-start justify-center min-h-full">
        <motion.div
          animate={{
            width: deviceWidths[deviceMode],
            scale: zoom / 100,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden origin-top"
          style={{ maxWidth: deviceMode === 'desktop' ? '1200px' : undefined }}
        >
          {/* Browser chrome */}
          {editorMode === 'edit' && (
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer" />
              </div>
              <div className="flex-1 mx-8 bg-white rounded-lg px-4 py-1.5 text-xs text-slate-500 border border-slate-200 text-center">
                myportfolio.com
              </div>
            </div>
          )}

          {/* Sections */}
          <div className="min-h-screen">
            {sections.filter(s => s.visible).map((section) => {
              const isSelected = selectedSection === section.id
              const isHovered = hoveredSection === section.id
              const Renderer = sectionRenderers[section.type]
              const bg = section.styles?.background || sectionBg[section.type] || '#ffffff'

              return (
                <motion.div
                  key={section.id}
                  onMouseEnter={() => editorMode === 'edit' && setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => editorMode === 'edit' && onSectionSelect(section.id)}
                  className={`relative transition-all ${editorMode === 'edit' ? 'cursor-pointer' : ''}`}
                  style={{
                    background: bg.includes('gradient') || bg.includes('linear') ? bg : bg,
                    backgroundColor: !bg.includes('gradient') ? bg : undefined,
                  }}
                >
                  {/* Section overlay for edit mode */}
                  {editorMode === 'edit' && (isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 z-10 pointer-events-none ${
                        isSelected
                          ? 'ring-[3px] ring-inset ring-cyan-400 shadow-[inset_0_0_20px_rgba(0,240,255,0.1)]'
                          : 'ring-2 ring-inset ring-cyan-400/40 ring-dashed'
                      }`}
                    />
                  )}

                  {/* Section label badge */}
                  {editorMode === 'edit' && (isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg"
                    >
                      <Pencil className="w-3 h-3" />
                      {section.name}
                    </motion.div>
                  )}

                  {/* Action buttons */}
                  <AnimatePresence>
                    {editorMode === 'edit' && (isHovered || isSelected) && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute top-3 right-3 z-20 flex items-center gap-1.5"
                      >
                        {[
                          { icon: Sparkles, label: 'AI Assist', color: 'bg-purple-500 hover:bg-purple-600', onClick: () => onSectionSelect(section.id) },
                          { icon: Copy, label: 'Duplicate', color: 'bg-slate-700 hover:bg-slate-600', onClick: () => onDuplicate(section.id) },
                          { icon: Trash2, label: 'Delete', color: 'bg-red-500 hover:bg-red-600', onClick: () => onDelete(section.id) },
                        ].map((action, i) => (
                          <motion.button
                            key={action.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => { e.stopPropagation(); action.onClick() }}
                            className={`p-2 ${action.color} text-white rounded-lg shadow-lg transition-colors pointer-events-auto`}
                            title={action.label}
                          >
                            <action.icon className="w-3.5 h-3.5" />
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Section content */}
                  {Renderer ? (
                    <Renderer content={section.content} />
                  ) : (
                    <div className="py-16 px-8 text-center">
                      <p className="text-slate-400 text-lg font-medium">{section.name}</p>
                      <p className="text-slate-300 text-sm mt-2">Click to add content</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
