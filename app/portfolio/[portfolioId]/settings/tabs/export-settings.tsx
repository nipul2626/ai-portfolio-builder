'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Code, FileJson, Github, Cloud, Archive, Trash2, RotateCcw } from 'lucide-react'

interface ExportSettingsProps {
  portfolioId: string
}

export default function ExportSettings({ portfolioId }: ExportSettingsProps) {
  const [backups] = useState([
    { id: 1, date: '2024-02-20 14:30', size: '2.4 MB', version: 'v1.0' },
    { id: 2, date: '2024-02-19 10:15', size: '2.3 MB', version: 'v0.9' },
    { id: 3, date: '2024-02-18 16:45', size: '2.2 MB', version: 'v0.8' },
  ])

  const exportOptions = [
    {
      icon: Code,
      title: 'Static HTML Website',
      description: 'Complete website with all assets',
      features: ['Self-hosted', 'No dependencies', 'Works offline', 'All animations'],
      size: '~5.2 MB'
    },
    {
      icon: FileJson,
      title: 'PDF Resume',
      description: 'Print-ready resume version',
      features: ['Professional template', 'A4/Letter size', 'ATS-friendly option'],
      size: '~1.2 MB'
    },
    {
      icon: FileJson,
      title: 'Portfolio Data (JSON)',
      description: 'Raw portfolio data for developers',
      features: ['All content', 'Settings included', 'No styling'],
      size: '~0.5 MB'
    },
    {
      icon: Github,
      title: 'GitHub-Ready Code',
      description: 'React project ready to deploy',
      features: ['Full React app', 'README included', 'Deploy to Vercel'],
      size: '~8.1 MB'
    }
  ]

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Section 1: Export Formats */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Export Formats</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportOptions.map((option, idx) => {
            const Icon = option.icon
            return (
              <div key={idx} className="neu-card p-6 rounded-lg space-y-4 hover:glow-cyan transition-all group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-[#00f0ff]" />
                      <h4 className="font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
                        {option.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#a0a0b8] mb-3">{option.description}</p>
                  </div>
                  <Badge className="bg-[#a0a0b8]/20 text-[#a0a0b8] border-[#a0a0b8]/30 whitespace-nowrap">
                    {option.size}
                  </Badge>
                </div>

                <ul className="space-y-1">
                  {option.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-xs text-[#a0a0b8]">
                      <span className="text-[#00f0ff]">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50 mt-2">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Section 2: Backup & Restore */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white">Backup & Restore</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24] h-12">
            <Cloud className="w-4 h-4 mr-2" />
            Create Full Backup
          </Button>
          <Button variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24] h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            Upload & Restore
          </Button>
        </div>

        {/* Auto-backup Toggle */}
        <div className="flex items-center justify-between p-4 neu-card rounded-lg">
          <div>
            <p className="text-sm font-medium text-white">Auto-backup Schedule</p>
            <p className="text-xs text-[#a0a0b8] mt-1">Automatically save backups</p>
          </div>
          <select className="bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 py-1 text-sm">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Disabled</option>
          </select>
        </div>

        {/* Backup History */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-white">Backup History</h4>
          {backups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-3 neu-card rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-[#a0a0b8]" />
                  <span className="text-sm font-medium text-white">{backup.version}</span>
                  <span className="text-xs text-[#a0a0b8]">{backup.date}</span>
                </div>
                <p className="text-xs text-[#a0a0b8] mt-1">{backup.size}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-[#00f0ff] hover:bg-[#00f0ff]/10">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[#ff00ff] hover:bg-[#ff00ff]/10">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Version History */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white">Version History</h3>

        <div className="space-y-3">
          {[
            { time: '2 hours ago', desc: 'Updated project section with new screenshots' },
            { time: '1 day ago', desc: 'Modified hero section text' },
            { time: '3 days ago', desc: 'Added new project case study' },
            { time: '1 week ago', desc: 'Updated skills section' },
          ].map((version, idx) => (
            <div key={idx} className="flex gap-4 p-3 neu-card rounded-lg">
              <div className="flex-shrink-0 w-1 bg-gradient-to-b from-[#00f0ff] to-[#ff00ff] rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{version.desc}</p>
                <p className="text-xs text-[#a0a0b8] mt-1">{version.time}</p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="text-[#00f0ff] hover:bg-[#00f0ff]/10 h-8">
                  View
                </Button>
                <Button size="sm" variant="ghost" className="text-[#ff00ff] hover:bg-[#ff00ff]/10 h-8">
                  Restore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Integration Exports */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white">Export to Other Platforms</h3>

        <div className="space-y-2">
          {[
            { name: 'Notion', icon: '📝', desc: 'Create database entry' },
            { name: 'Markdown Files', icon: '📄', desc: 'Download as .md' },
            { name: 'WordPress', icon: '🔷', desc: 'XML for import' },
            { name: 'Wix', icon: '✨', desc: 'Paste content' },
          ].map((integration, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 neu-card rounded-lg hover:glow-cyan transition-all">
              <div className="flex items-center gap-3">
                <span className="text-xl">{integration.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{integration.name}</p>
                  <p className="text-xs text-[#a0a0b8]">{integration.desc}</p>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50">
                Export
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
