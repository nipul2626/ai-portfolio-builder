'use client'

import { motion } from 'framer-motion'
import type { Section, DeviceMode, EditorMode } from '@/app/editor/page'

type Props = {
  sections: Section[]
  selectedSection: string | null
  onSectionSelect: (id: string) => void
  deviceMode: DeviceMode
  zoom: number
  editorMode: EditorMode
}

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}

export function LivePreviewCanvas({
  sections,
  selectedSection,
  onSectionSelect,
  deviceMode,
  zoom,
  editorMode,
}: Props) {
  return (
    <div className="flex-1 bg-[#0f0f15] bg-grid-pattern p-8 overflow-auto custom-scrollbar">
      <div className="flex items-center justify-center min-h-full">
        <motion.div
          animate={{
            width: deviceWidths[deviceMode],
            scale: zoom / 100,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ transformOrigin: 'center top' }}
        >
          <div className="relative">
            {editorMode === 'edit' && (
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 bg-white rounded px-3 py-1 text-xs text-slate-500">
                  myportfolio.com
                </div>
              </div>
            )}

            <div className="min-h-screen">
              {sections.filter(s => s.visible).map((section) => {
                const isSelected = selectedSection === section.id
                return (
                  <motion.div
                    key={section.id}
                    onClick={() => editorMode === 'edit' && onSectionSelect(section.id)}
                    whileHover={editorMode === 'edit' ? { borderColor: 'rgba(34, 211, 238, 0.5)' } : {}}
                    className={`relative p-16 transition-all ${
                      editorMode === 'edit' ? 'cursor-pointer' : ''
                    } ${isSelected && editorMode === 'edit' ? 'ring-2 ring-cyan-400 ring-inset' : ''}`}
                    style={{
                      background: section.type === 'hero' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : section.type === 'about'
                        ? '#f8fafc'
                        : section.type === 'projects'
                        ? '#f1f5f9'
                        : '#ffffff',
                    }}
                  >
                    {isSelected && editorMode === 'edit' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg"
                      >
                        {section.name}
                      </motion.div>
                    )}

                    <div className={section.type === 'hero' ? 'text-white text-center' : 'text-slate-900'}>
                      {section.type === 'hero' && (
                        <>
                          <h1 className="text-5xl font-bold mb-4">John Doe</h1>
                          <p className="text-xl mb-8">Full Stack Developer & Designer</p>
                          <div className="flex gap-4 justify-center">
                            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold">
                              View Projects
                            </button>
                            <button className="px-6 py-3 bg-purple-500/20 backdrop-blur-sm border border-white/20 rounded-lg font-semibold">
                              Contact Me
                            </button>
                          </div>
                        </>
                      )}

                      {section.type === 'about' && (
                        <>
                          <h2 className="text-3xl font-bold mb-6">About Me</h2>
                          <p className="text-lg text-slate-600 leading-relaxed">
                            I&apos;m a passionate developer with expertise in modern web technologies.
                            I love building beautiful and functional user experiences.
                          </p>
                        </>
                      )}

                      {section.type === 'experience' && (
                        <>
                          <h2 className="text-3xl font-bold mb-8">Experience</h2>
                          <div className="space-y-6">
                            <div className="border-l-4 border-purple-500 pl-6">
                              <h3 className="text-xl font-semibold">Senior Developer</h3>
                              <p className="text-slate-500">Tech Company • 2020 - Present</p>
                            </div>
                          </div>
                        </>
                      )}

                      {section.type === 'projects' && (
                        <>
                          <h2 className="text-3xl font-bold mb-8">Projects</h2>
                          <div className="grid grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="bg-white rounded-xl p-6 shadow-md">
                                <div className="aspect-video bg-slate-200 rounded-lg mb-4" />
                                <h3 className="font-semibold">Project {i}</h3>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {section.type === 'skills' && (
                        <>
                          <h2 className="text-3xl font-bold mb-8">Skills</h2>
                          <div className="flex flex-wrap gap-3">
                            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((skill) => (
                              <span key={skill} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
