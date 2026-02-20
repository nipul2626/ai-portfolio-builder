'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Sparkles, Upload, Copy, Check } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface GeneralSettingsProps {
  portfolioId: string
}

export default function GeneralSettings({ portfolioId }: GeneralSettingsProps) {
  const [portfolioName, setPortfolioName] = useState('John Doe Portfolio')
  const [description, setDescription] = useState('Full-stack developer with 5+ years of experience')
  const [portfolioType, setPortfolioType] = useState('developer')
  const [primaryRole, setPrimaryRole] = useState('Full-Stack Developer')
  const [isPublished, setIsPublished] = useState(true)
  const [visibility, setVisibility] = useState('public')
  const [showInGallery, setShowInGallery] = useState(true)
  const [customSlug, setCustomSlug] = useState('john-doe')
  const [slugAvailable, setSlugAvailable] = useState(true)
  const [copied, setCopied] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const checkSlugAvailability = (slug: string) => {
    // Simulate API call
    setSlugAvailable(!slug.includes('admin'))
  }

  const handleSlugChange = (e: string) => {
    const formatted = e.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (formatted.length <= 30 && formatted.length >= 3) {
      setCustomSlug(formatted)
      checkSlugAvailability(formatted)
      setHasChanges(true)
    }
  }

  const copyUrl = () => {
    const url = `yourplatform.com/${customSlug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    setHasChanges(false)
    // TODO: Save to backend
  }

  return (
    <div className="space-y-8">
      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Form Fields */}
        <div className="col-span-2 space-y-8">
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Basic Information</h3>

            {/* Portfolio Name */}
            <div className="space-y-2">
              <Label htmlFor="portfolio-name" className="text-base font-semibold">
                Portfolio Name
              </Label>
              <div className="relative">
                <Input
                  id="portfolio-name"
                  value={portfolioName}
                  onChange={(e) => {
                    setPortfolioName(e.target.value.slice(0, 60))
                    setHasChanges(true)
                  }}
                  className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10"
                  placeholder="Your portfolio name"
                />
                <span className="text-xs text-[#a0a0b8] mt-1 inline-block">
                  {portfolioName.length}/60
                </span>
              </div>
            </div>

            {/* Portfolio Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Short Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value.slice(0, 200))
                  setHasChanges(true)
                }}
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white resize-none h-20"
                placeholder="Used in portfolio gallery and search results"
              />
              <p className="text-xs text-[#a0a0b8]">
                {description.length}/200 • Used in portfolio gallery and search results
              </p>
            </div>

            {/* Portfolio Type */}
            <div className="space-y-2">
              <Label htmlFor="portfolio-type" className="text-base font-semibold">
                Portfolio Type
              </Label>
              <Select value={portfolioType} onValueChange={(val) => {
                setPortfolioType(val)
                setHasChanges(true)
              }}>
                <SelectTrigger className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10">
                  <SelectValue placeholder="Select portfolio type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a24] border-[#2a2a34] text-white">
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="writer">Writer</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Primary Role */}
            <div className="space-y-2">
              <Label htmlFor="primary-role" className="text-base font-semibold">
                Your Primary Role
              </Label>
              <div className="flex gap-2">
                <Input
                  id="primary-role"
                  value={primaryRole}
                  onChange={(e) => {
                    setPrimaryRole(e.target.value)
                    setHasChanges(true)
                  }}
                  className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 flex-1"
                  placeholder="e.g., Full-Stack Developer"
                />
                <Button className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50 h-10 px-4">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2: Visibility & Status */}
          <div className="space-y-6 border-t border-[#2a2a34] pt-8">
            <h3 className="text-xl font-bold text-white">Visibility & Status</h3>

            {/* Publication Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Publication Status</Label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={isPublished}
                    onCheckedChange={(checked) => {
                      setIsPublished(checked)
                      setHasChanges(true)
                    }}
                  />
                  <span className={`text-sm font-semibold ${isPublished ? 'text-green-400' : 'text-orange-400'}`}>
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#a0a0b8]">
                {isPublished ? 'Your portfolio is visible to everyone' : 'Your portfolio is in draft mode'}
              </p>
            </div>

            {/* Visibility Options */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Who can view?</Label>
              <RadioGroup value={visibility} onValueChange={(val) => {
                setVisibility(val)
                setHasChanges(true)
              }}>
                <div className="flex items-center gap-3 p-3 rounded-lg neu-card cursor-pointer hover:glow-cyan transition-all">
                  <RadioGroupItem value="public" id="public" />
                  <div className="flex-1">
                    <Label htmlFor="public" className="cursor-pointer text-sm font-medium">
                      Public
                    </Label>
                    <p className="text-xs text-[#a0a0b8]">Anyone with the link can view</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg neu-card cursor-pointer hover:glow-cyan transition-all">
                  <RadioGroupItem value="unlisted" id="unlisted" />
                  <div className="flex-1">
                    <Label htmlFor="unlisted" className="cursor-pointer text-sm font-medium">
                      Unlisted
                    </Label>
                    <p className="text-xs text-[#a0a0b8]">Only with link, not in gallery</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg neu-card cursor-pointer hover:glow-cyan transition-all">
                  <RadioGroupItem value="private" id="private" />
                  <div className="flex-1">
                    <Label htmlFor="private" className="cursor-pointer text-sm font-medium">
                      Private
                    </Label>
                    <p className="text-xs text-[#a0a0b8]">Only visible to you</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Gallery Toggle */}
            {visibility === 'public' && (
              <div className="flex items-center justify-between p-3 rounded-lg neu-card">
                <div>
                  <Label className="text-sm font-medium">Show in Public Gallery</Label>
                  <p className="text-xs text-[#a0a0b8]">Let others discover and clone your portfolio</p>
                </div>
                <Switch
                  checked={showInGallery}
                  onCheckedChange={(checked) => {
                    setShowInGallery(checked)
                    setHasChanges(true)
                  }}
                />
              </div>
            )}
          </div>

          {/* Section 3: URL & Slug */}
          <div className="space-y-6 border-t border-[#2a2a34] pt-8">
            <h3 className="text-xl font-bold text-white">URL & Slug</h3>

            <div className="space-y-2">
              <Label htmlFor="custom-slug" className="text-base font-semibold">
                Custom URL
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 flex">
                  <div className="flex items-center px-3 bg-[#12121a] rounded-l-lg border border-r-0 border-[#1a1a24] text-[#a0a0b8] text-sm">
                    yourplatform.com/
                  </div>
                  <Input
                    id="custom-slug"
                    value={customSlug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 rounded-l-none"
                  />
                </div>
                <div className={`flex items-center px-3 rounded-lg ${slugAvailable ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {slugAvailable ? <Check className="w-5 h-5" /> : <span>✕</span>}
                </div>
              </div>
              <p className="text-xs text-[#a0a0b8]">
                {slugAvailable ? 'Available' : 'Already taken'} • {customSlug.length}/30 characters
              </p>
            </div>

            {/* Preview URL */}
            <div className="p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
              <p className="text-xs text-[#a0a0b8] mb-2">Preview URL</p>
              <div className="flex items-center justify-between">
                <code className="text-sm text-white font-mono">yourplatform.com/{customSlug}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUrl}
                  className="text-[#00f0ff] hover:bg-[#00f0ff]/10"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Section 4: Branding */}
          <div className="space-y-6 border-t border-[#2a2a34] pt-8">
            <h3 className="text-xl font-bold text-white">Branding</h3>

            {/* Portfolio Thumbnail */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Portfolio Thumbnail</Label>
              <div className="border-2 border-dashed border-[#2a2a34] rounded-lg p-8 text-center hover:border-[#00f0ff] transition-colors cursor-pointer neu-card">
                <Upload className="w-8 h-8 text-[#a0a0b8] mx-auto mb-3" />
                <p className="text-sm font-medium text-white mb-1">Drag and drop or click to upload</p>
                <p className="text-xs text-[#a0a0b8]">Recommended: 1200×630px</p>
              </div>
            </div>

            {/* Favicon */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Custom Favicon</Label>
              <div className="border-2 border-dashed border-[#2a2a34] rounded-lg p-6 text-center hover:border-[#00f0ff] transition-colors cursor-pointer neu-card">
                <p className="text-sm text-[#a0a0b8]">PNG, ICO, or SVG (64×64px)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview Card */}
        <div className="col-span-1">
          <div className="sticky top-32 space-y-4">
            <div className="neu-card p-4 rounded-lg space-y-3">
              <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wider">Gallery Preview</p>
              
              <div className="bg-[#12121a] rounded-lg overflow-hidden aspect-video mb-3">
                <div className="w-full h-full bg-gradient-to-br from-[#00f0ff]/10 to-[#ff00ff]/10 flex items-center justify-center">
                  <span className="text-xs text-[#a0a0b8]">Thumbnail</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-1">{portfolioName}</h4>
                <p className="text-xs text-[#a0a0b8] mb-2 line-clamp-2">{description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-1 rounded-full">
                    {portfolioType}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${isPublished ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    {isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-[#a0a0b8]">👁 1,234 views</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Section */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0f] to-transparent pt-4 pb-6 px-6 border-t border-[#2a2a34]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-sm text-[#a0a0b8]">You have unsaved changes</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setPortfolioName('John Doe Portfolio')
                  setDescription('Full-stack developer with 5+ years of experience')
                  setHasChanges(false)
                }}
                className="border-[#2a2a34] text-white hover:bg-[#1a1a24]"
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
