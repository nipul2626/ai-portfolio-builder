'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Eye, Code } from 'lucide-react'

interface EditorPageProps {
  params: {
    portfolioId: string
  }
}

export default function EditorPage({ params }: EditorPageProps) {
  const [sections, setSections] = useState([
    { id: 'about', title: 'About', content: 'Full-stack developer with 5+ years of experience building scalable web applications.' },
    { id: 'skills', title: 'Skills', content: 'React, Node.js, TypeScript, PostgreSQL, AWS, Docker' },
    { id: 'projects', title: 'Projects', content: 'Portfolio, E-commerce Platform, AI Assistant' },
  ])

  const [selectedSection, setSelectedSection] = useState('about')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full neu-card hover:glow-cyan transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h1 className="text-4xl font-bold gradient-text absolute left-1/2 transform -translate-x-1/2">
            Portfolio Editor
          </h1>

          <div className="flex gap-2">
            <Button variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Editor Grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Section Navigation */}
          <div className="col-span-1">
            <div className="neu-card p-4 rounded-lg sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedSection === section.id
                        ? 'bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black font-semibold'
                        : 'neu-card text-white hover:glow-cyan'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6 border-[#2a2a34] text-white hover:bg-[#1a1a24]">
                + Add Section
              </Button>
            </div>
          </div>

          {/* Middle Column - Editor */}
          <div className="col-span-1">
            <div className="neu-card p-6 rounded-lg space-y-6">
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#12121a]">
                  <TabsTrigger value="edit" className="data-[state=active]:bg-[#00f0ff] data-[state=active]:text-black">
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-[#00f0ff] data-[state=active]:text-black">
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="space-y-4 mt-6">
                  {sections.map((section) =>
                    selectedSection === section.id ? (
                      <div key={section.id} className="space-y-4">
                        <div>
                          <Label className="text-base font-semibold mb-2">Section Title</Label>
                          <Input
                            value={section.title}
                            className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10"
                            onChange={(e) => {
                              setSections(
                                sections.map((s) =>
                                  s.id === section.id ? { ...s, title: e.target.value } : s
                                )
                              )
                            }}
                          />
                        </div>

                        <div>
                          <Label className="text-base font-semibold mb-2">Content</Label>
                          <Textarea
                            value={section.content}
                            className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white resize-none h-40"
                            onChange={(e) => {
                              setSections(
                                sections.map((s) =>
                                  s.id === section.id ? { ...s, content: e.target.value } : s
                                )
                              )
                            }}
                          />
                        </div>

                        <div className="space-y-2 pt-4 border-t border-[#2a2a34]">
                          <Label className="text-sm font-semibold">Styling</Label>
                          <select className="w-full bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 py-2 text-sm">
                            <option>Default Layout</option>
                            <option>Grid</option>
                            <option>Timeline</option>
                            <option>Card</option>
                          </select>
                        </div>
                      </div>
                    ) : null
                  )}
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-base font-semibold mb-2">Display Order</Label>
                    <select className="w-full bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 py-2">
                      <option>Position 1</option>
                      <option>Position 2</option>
                      <option>Position 3</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                    <Label className="text-sm font-medium">Visible</Label>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-2">Custom CSS Class</Label>
                    <Input
                      placeholder="custom-section"
                      className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 text-sm"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Live Preview */}
          <div className="col-span-1">
            <div className="neu-card p-6 rounded-lg sticky top-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Live Preview</h3>

              <div className="bg-[#12121a] rounded-lg p-6 border border-[#1a1a24] min-h-96 space-y-4">
                {sections
                  .filter((s) => selectedSection === s.id)
                  .map((section) => (
                    <div key={section.id} className="space-y-2">
                      <h4 className="text-lg font-bold text-white">{section.title}</h4>
                      <p className="text-sm text-[#a0a0b8]">{section.content}</p>
                    </div>
                  ))}

                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1a1a24] to-transparent pointer-events-none" />
              </div>

              <Button variant="outline" className="w-full border-[#2a2a34] text-white hover:bg-[#1a1a24]">
                <Code className="w-4 h-4 mr-2" />
                View HTML
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
