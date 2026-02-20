'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { X, Sparkles, Upload, ArrowUp } from 'lucide-react'

interface SEOSettingsProps {
  portfolioId: string
}

export default function SEOSettings({ portfolioId }: SEOSettingsProps) {
  const [metaTitle, setMetaTitle] = useState('John Doe - Full-Stack Developer Portfolio')
  const [metaDescription, setMetaDescription] = useState('Discover my projects and skills in full-stack web development')
  const [keywords, setKeywords] = useState(['portfolio', 'developer', 'full-stack'])
  const [ogTitle, setOgTitle] = useState('')
  const [ogDescription, setOgDescription] = useState('')
  const [useDefaultOgTitle, setUseDefaultOgTitle] = useState(true)
  const [useDefaultOgDesc, setUseDefaultOgDesc] = useState(true)
  const [schemaType, setSchemaType] = useState('Person')
  const [keywordInput, setKeywordInput] = useState('')
  const [seoScore, setSeoScore] = useState(78)

  const handleAddKeyword = () => {
    if (keywordInput.trim() && keywords.length < 10) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index))
  }

  const getCharacterCountColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 50 && percentage <= 100) return 'text-green-400'
    if (percentage > 40 && percentage < 50) return 'text-yellow-400'
    if (percentage > 100) return 'text-red-400'
    return 'text-[#a0a0b8]'
  }

  const getScoreColor = (score: number) => {
    if (score >= 76) return 'from-green-500 to-emerald-500'
    if (score >= 51) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Section 1: Meta Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Meta Information</h3>

            {/* Meta Title */}
            <div className="space-y-2">
              <Label htmlFor="meta-title" className="text-base font-semibold">
                Page Title
              </Label>
              <Input
                id="meta-title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value.slice(0, 70))}
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10"
                placeholder="Page title for search engines"
              />
              <div className="flex justify-between items-center text-xs">
                <span className={`font-semibold ${getCharacterCountColor(metaTitle.length, 60)}`}>
                  {metaTitle.length >= 50 && metaTitle.length <= 60 ? '✓ Optimal' : metaTitle.length > 60 ? '✗ Too long' : '⚠ Too short'}
                </span>
                <span className="text-[#a0a0b8]">{metaTitle.length}/60</span>
              </div>
              
              <div className="mt-3 p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                <p className="text-xs text-[#a0a0b8] mb-2">Preview:</p>
                <div className="text-sm text-white font-medium truncate">{metaTitle}</div>
                <p className="text-xs text-[#00f0ff] truncate">yourplatform.com/john-doe</p>
                <p className="text-xs text-[#a0a0b8] mt-1 line-clamp-2">{metaDescription}</p>
              </div>
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
              <Label htmlFor="meta-desc" className="text-base font-semibold">
                Meta Description
              </Label>
              <Textarea
                id="meta-desc"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white resize-none h-20"
                placeholder="What people see in search results"
              />
              <div className="flex justify-between items-center text-xs">
                <span className={`font-semibold ${getCharacterCountColor(metaDescription.length, 160)}`}>
                  {metaDescription.length >= 120 && metaDescription.length <= 160 ? '✓ Optimal' : metaDescription.length > 160 ? '✗ Too long' : '⚠ Too short'}
                </span>
                <span className="text-[#a0a0b8]">{metaDescription.length}/160</span>
              </div>
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Focus Keywords</Label>
              <div className="flex gap-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                  className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 flex-1"
                  placeholder="Type a keyword and press Enter"
                  disabled={keywords.length >= 10}
                />
                <Button
                  onClick={handleAddKeyword}
                  disabled={keywords.length >= 10}
                  className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50 h-10"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-[#1a1a24] border-[#2a2a34] text-[#00f0ff] cursor-pointer hover:glow-cyan">
                    {keyword}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer hover:text-white"
                      onClick={() => handleRemoveKeyword(idx)}
                    />
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-[#a0a0b8]">{keywords.length}/10 keywords</p>
            </div>
          </div>

          {/* Section 2: Social Media */}
          <div className="space-y-6 border-t border-[#2a2a34] pt-8">
            <h3 className="text-xl font-bold text-white">Social Media (Open Graph)</h3>

            <div className="space-y-2">
              <Label className="text-base font-semibold">Social Media Preview Image</Label>
              <div className="border-2 border-dashed border-[#2a2a34] rounded-lg p-8 text-center hover:border-[#00f0ff] transition-colors cursor-pointer neu-card">
                <Upload className="w-8 h-8 text-[#a0a0b8] mx-auto mb-3" />
                <p className="text-sm font-medium text-white mb-1">Drag and drop or click</p>
                <p className="text-xs text-[#a0a0b8]">Recommended: 1200×630px</p>
              </div>
            </div>

            {/* OG Title Override */}
            <div className="flex items-center justify-between p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
              <Label className="text-sm font-medium">OG Title Override</Label>
              <Switch checked={!useDefaultOgTitle} onCheckedChange={(checked) => setUseDefaultOgTitle(!checked)} />
            </div>

            {!useDefaultOgTitle && (
              <Input
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10"
                placeholder="Custom OG title"
              />
            )}

            {/* OG Description Override */}
            <div className="flex items-center justify-between p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
              <Label className="text-sm font-medium">OG Description Override</Label>
              <Switch checked={!useDefaultOgDesc} onCheckedChange={(checked) => setUseDefaultOgDesc(!checked)} />
            </div>

            {!useDefaultOgDesc && (
              <Textarea
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white resize-none h-20"
                placeholder="Custom OG description"
              />
            )}
          </div>

          {/* Section 3: Structured Data */}
          <div className="space-y-6 border-t border-[#2a2a34] pt-8">
            <h3 className="text-xl font-bold text-white">Structured Data</h3>

            <div className="space-y-2">
              <Label className="text-base font-semibold">Schema.org Markup</Label>
              <select className="w-full neu-card-inset bg-[#12121a] border border-[#1a1a24] text-white h-10 rounded-lg px-3">
                <option>Person</option>
                <option>Organization</option>
                <option>CreativeWork</option>
              </select>
            </div>

            <Button variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
              Preview JSON-LD
            </Button>

            {/* Rich Snippets */}
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                <Label className="text-sm font-medium">Enable Breadcrumbs</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                <Label className="text-sm font-medium">Enable Author Information</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Section 4: Analytics */}
          <div className="space-y-6 border-t border-[#2a2a34] pt-8">
            <h3 className="text-xl font-bold text-white">Analytics Integration</h3>

            <div className="space-y-2">
              <Label htmlFor="ga-id" className="text-base font-semibold">
                Google Analytics ID
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ga-id"
                  placeholder="G-XXXXXXXXXX"
                  className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 flex-1"
                />
                <Button variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
                  Test Connection
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gsc-code" className="text-base font-semibold">
                Google Search Console
              </Label>
              <Input
                id="gsc-code"
                placeholder="Verification code"
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10"
              />
            </div>
          </div>
        </div>

        {/* Right Column - SEO Score */}
        <div className="col-span-1">
          <div className="sticky top-32 space-y-4">
            <div className="neu-card p-6 rounded-lg space-y-6">
              <h3 className="text-lg font-bold text-white">SEO Health</h3>

              {/* Score Circle */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(160, 160, 184, 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${(seoScore / 100) * 282.7} 282.7`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {seoScore >= 76 ? (
                          <>
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#10b981" />
                          </>
                        ) : seoScore >= 51 ? (
                          <>
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#f97316" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </>
                        )}
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{seoScore}</span>
                    <span className="text-xs text-[#a0a0b8]">Score</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                {[
                  { label: 'Meta title optimized', done: true },
                  { label: 'Description present', done: true },
                  { label: 'OG image added', done: false },
                  { label: 'Keywords added', done: true },
                  { label: 'Analytics setup', done: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded">
                    <span className={item.done ? 'text-green-400' : 'text-red-400'}>
                      {item.done ? '✓' : '✗'}
                    </span>
                    <span className="text-xs text-white">{item.label}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50">
                <Sparkles className="w-4 h-4 mr-2" />
                Improve Score
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
