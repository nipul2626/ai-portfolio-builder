'use client'

import { useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { Star, User, Briefcase, Folder, Code, GraduationCap, Mail, Eye, EyeOff, Plus, GripVertical } from 'lucide-react'
import type { Section } from '@/app/editor/page'

type Props = {
  sections: Section[]
  selectedSection: string | null
  onSectionSelect: (id: string) => void
  onSectionReorder: (sections: Section[]) => void
  onSectionToggleVisibility: (id: string) => void
}

const sectionIcons: Record<string, any> = {
  hero: Star,
  about: User,
  experience: Briefcase,
  projects: Folder,
  skills: Code,
  education: GraduationCap,
  contact: Mail,
}

export function SectionsPanel({
  sections,
  selectedSection,
  onSectionSelect,
  onSectionReorder,
  onSectionToggleVisibility,
}: Props) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-80 bg-[#1a1a24] border-r border-white/10 flex flex-col overflow-hidden"
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Sections</h2>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-all"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        <Reorder.Group axis="y" values={sections} onReorder={onSectionReorder}>
          {sections.map((section) => {
            const Icon = sectionIcons[section.type] || Folder
            const isSelected = selectedSection === section.id
            const isHovered = hoveredSection === section.id

            return (
              <Reorder.Item key={section.id} value={section}>
                <motion.div
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  onClick={() => onSectionSelect(section.id)}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } ${!section.visible ? 'opacity-50' : ''}`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="selected-section"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-3">
                    {(isHovered || section.type === 'hero') && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4 text-slate-500" />
                      </motion.div>
                    )}

                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-500/30' : 'bg-white/10'}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>

                    <span className={`flex-1 font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {section.name}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSectionToggleVisibility(section.id)
                      }}
                      className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                    >
                      {section.visible ? (
                        <Eye className="w-4 h-4 text-slate-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-500" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </div>
    </motion.div>
  )
}
