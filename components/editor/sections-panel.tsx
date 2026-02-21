'use client'

import { useState } from 'react'
import { motion, Reorder, AnimatePresence } from 'framer-motion'
import {
  Star, User, Briefcase, Folder, Code, GraduationCap, Mail, Award,
  Eye, EyeOff, Plus, GripVertical, Trash2, PlusSquare, X
} from 'lucide-react'
import type { Section } from '@/app/editor/page'

type Props = {
  sections: Section[]
  selectedSection: string | null
  onSectionSelect: (id: string) => void
  onSectionReorder: (sections: Section[]) => void
  onSectionToggleVisibility: (id: string) => void
  onAddSection: (type: string, name: string) => void
  onDeleteSection: (id: string) => void
}

const sectionIcons: Record<string, any> = {
  hero: Star,
  about: User,
  experience: Briefcase,
  projects: Folder,
  skills: Code,
  education: GraduationCap,
  certifications: Award,
  contact: Mail,
  custom: PlusSquare,
}

const sectionTypes = [
  { type: 'hero', name: 'Hero', icon: Star, desc: 'Landing section with headline' },
  { type: 'about', name: 'About', icon: User, desc: 'Personal bio and story' },
  { type: 'experience', name: 'Experience', icon: Briefcase, desc: 'Work history timeline' },
  { type: 'projects', name: 'Projects', icon: Folder, desc: 'Portfolio project showcase' },
  { type: 'skills', name: 'Skills', icon: Code, desc: 'Technical skill bars' },
  { type: 'education', name: 'Education', icon: GraduationCap, desc: 'Academic background' },
  { type: 'certifications', name: 'Certifications', icon: Award, desc: 'Professional certs' },
  { type: 'contact', name: 'Contact', icon: Mail, desc: 'Contact form and info' },
  { type: 'custom', name: 'Custom Section', icon: PlusSquare, desc: 'Blank custom section' },
]

export function SectionsPanel({
  sections,
  selectedSection,
  onSectionSelect,
  onSectionReorder,
  onSectionToggleVisibility,
  onAddSection,
  onDeleteSection,
}: Props) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [customSectionName, setCustomSectionName] = useState('')
  const [editingName, setEditingName] = useState<string | null>(null)

  const handleAddSectionType = (type: string, name: string) => {
    if (type === 'custom') {
      if (customSectionName.trim()) {
        onAddSection('custom', customSectionName.trim())
        setCustomSectionName('')
        setShowAddModal(false)
      }
      return
    }
    onAddSection(type, name)
    setShowAddModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="w-72 bg-[#1a1a24] border-r border-white/10 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Sections</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-all"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Section List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <Reorder.Group axis="y" values={sections} onReorder={onSectionReorder}>
            {sections.map((section, index) => {
              const Icon = sectionIcons[section.type] || Folder
              const isSelected = selectedSection === section.id
              const isHovered = hoveredSection === section.id

              return (
                <Reorder.Item
                  key={section.id}
                  value={section}
                  dragListener={section.type !== 'hero'}
                >
                  <motion.div
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    onClick={() => onSectionSelect(section.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className={`relative p-3 rounded-lg border transition-all cursor-pointer mb-1.5 ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10'
                    } ${!section.visible ? 'opacity-40' : ''}`}
                  >
                    {/* Active indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selected-section-bar"
                        className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-400 rounded-r"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-2.5">
                      {/* Drag handle */}
                      <AnimatePresence>
                        {(isHovered || isSelected) && section.type !== 'hero' ? (
                          <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 16 }}
                            exit={{ opacity: 0, width: 0 }}
                            className="cursor-grab active:cursor-grabbing flex-shrink-0"
                          >
                            <GripVertical className="w-4 h-4 text-slate-600" />
                          </motion.div>
                        ) : (
                          <div className="w-0" />
                        )}
                      </AnimatePresence>

                      {/* Icon */}
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${isSelected ? 'bg-cyan-500/25' : 'bg-white/[0.06]'}`}>
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      </div>

                      {/* Name */}
                      <span className={`flex-1 text-sm font-medium truncate ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                        {section.name}
                      </span>

                      {/* Actions */}
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => { e.stopPropagation(); onSectionToggleVisibility(section.id) }}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          {section.visible ? (
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {isHovered && section.type !== 'hero' && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
                              onClick={(e) => { e.stopPropagation(); onDeleteSection(section.id) }}
                              className="p-1 rounded hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-400/60" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="w-full py-2.5 rounded-lg border border-dashed border-white/20 hover:border-cyan-400/50 text-slate-400 hover:text-cyan-400 text-sm font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </motion.button>
        </div>
      </motion.div>

      {/* Add Section Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="w-[560px] bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">Add Section</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-5 grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                {sectionTypes.map((type, index) => (
                  <motion.button
                    key={type.type}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => type.type !== 'custom' && handleAddSectionType(type.type, type.name)}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all text-center group"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-white/[0.06] group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                      <type.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <p className="text-sm font-medium text-white mb-0.5">{type.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">{type.desc}</p>
                  </motion.button>
                ))}
              </div>

              {/* Custom section input */}
              <div className="p-5 border-t border-white/10">
                <p className="text-xs text-slate-400 mb-2 font-medium">Custom Section</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSectionName}
                    onChange={e => setCustomSectionName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddSectionType('custom', customSectionName)}
                    placeholder="Section name..."
                    className="flex-1 px-3 py-2 bg-white/[0.06] border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddSectionType('custom', customSectionName)}
                    disabled={!customSectionName.trim()}
                    className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-30"
                  >
                    Create
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
