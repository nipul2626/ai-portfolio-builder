'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Eye, Lock, User, X, Mail, Shield } from 'lucide-react'

interface PrivacySettingsProps {
  portfolioId: string
}

export default function PrivacySettings({ portfolioId }: PrivacySettingsProps) {
  const [passwordProtected, setPasswordProtected] = useState(false)
  const [password, setPassword] = useState('SecurePass123!')
  const [showPassword, setShowPassword] = useState(false)
  const [visitorTracking, setVisitorTracking] = useState(true)
  const [anonymousAnalytics, setAnonymousAnalytics] = useState(false)
  const [cookieConsent, setCookieConsent] = useState(true)
  const [rightClickProtection, setRightClickProtection] = useState(false)
  const [watermarkImages, setWatermarkImages] = useState(false)
  const [collaborators] = useState([
    { id: 1, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' }
  ])
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('')

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
    let pwd = ''
    for (let i = 0; i < 16; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(pwd)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Section 1: Access Control */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#00f0ff]" />
          Access Control
        </h3>

        {/* Password Protection */}
        <div className="neu-card p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Require Password to View</p>
              <p className="text-xs text-[#a0a0b8] mt-1">Share portfolio privately with recruiters</p>
            </div>
            <Switch checked={passwordProtected} onCheckedChange={setPasswordProtected} />
          </div>

          {passwordProtected && (
            <div className="pt-3 border-t border-[#1a1a24] space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Password</Label>
                <div className="flex gap-2">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 flex-1 font-mono"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#a0a0b8] hover:text-white"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-[#00f0ff]/20 text-[#00f0ff] hover:bg-[#00f0ff]/30"
                  onClick={generatePassword}
                >
                  Generate Strong Password
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-[#ff00ff]/20 text-[#ff00ff] hover:bg-[#ff00ff]/30"
                  onClick={() => navigator.clipboard.writeText(password)}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Analytics Privacy */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white">Analytics Privacy</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Track Visitor Analytics</p>
              <p className="text-xs text-[#a0a0b8] mt-1">Collect views and engagement data</p>
            </div>
            <Switch checked={visitorTracking} onCheckedChange={setVisitorTracking} />
          </div>

          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Anonymize Visitor Data</p>
              <p className="text-xs text-[#a0a0b8] mt-1">GDPR compliant • IP addresses masked</p>
            </div>
            <Switch
              checked={anonymousAnalytics}
              onCheckedChange={setAnonymousAnalytics}
              disabled={!visitorTracking}
            />
          </div>

          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Show Cookie Consent Banner</p>
              <p className="text-xs text-[#a0a0b8] mt-1">Inform visitors about cookies</p>
            </div>
            <Switch checked={cookieConsent} onCheckedChange={setCookieConsent} />
          </div>
        </div>
      </div>

      {/* Section 3: Content Protection */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white">Content Protection</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Disable Right-Click</p>
              <p className="text-xs text-[#a0a0b8] mt-1 text-orange-400">May frustrate users</p>
            </div>
            <Switch checked={rightClickProtection} onCheckedChange={setRightClickProtection} />
          </div>

          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Watermark Images</p>
              <p className="text-xs text-[#a0a0b8] mt-1">Protect your visual content</p>
            </div>
            <Switch checked={watermarkImages} onCheckedChange={setWatermarkImages} />
          </div>

          {watermarkImages && (
            <div className="p-4 bg-[#12121a] rounded-lg border border-[#1a1a24] space-y-2">
              <Input
                placeholder="Watermark text"
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10"
              />
              <select className="w-full bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 py-2 text-sm">
                <option>Center</option>
                <option>Top-Left</option>
                <option>Top-Right</option>
                <option>Bottom-Left</option>
                <option>Bottom-Right</option>
              </select>
              <Input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full"
              />
              <p className="text-xs text-[#a0a0b8]">Opacity: 50%</p>
            </div>
          )}
        </div>
      </div>

      {/* Section 4: Collaborators */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Collaborators
        </h3>

        {/* Add Collaborator */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Invite Collaborator</Label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="collaborator@example.com"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e.target.value)}
              className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10 flex-1"
            />
            <select className="bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 text-sm">
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>
            <Button className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50">
              Invite
            </Button>
          </div>
        </div>

        {/* Collaborators List */}
        <div className="space-y-2">
          {collaborators.map((collab) => (
            <div key={collab.id} className="flex items-center justify-between p-3 neu-card rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00ff]" />
                <div>
                  <p className="text-sm font-medium text-white">{collab.name}</p>
                  <p className="text-xs text-[#a0a0b8]">{collab.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/30">
                  {collab.role}
                </Badge>
                <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Data Privacy */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#00f0ff]" />
          Data Privacy
        </h3>

        <div className="flex items-center justify-between p-4 neu-card rounded-lg">
          <div>
            <p className="text-sm font-medium text-white">GDPR Compliance Mode</p>
            <p className="text-xs text-[#a0a0b8] mt-1">Enable privacy policy and data export</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="p-4 neu-card rounded-lg space-y-2">
          <Label className="text-sm font-medium">Delete Analytics Data After</Label>
          <select className="w-full bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 py-2 text-sm">
            <option>30 days</option>
            <option>90 days</option>
            <option>1 year</option>
            <option>Never</option>
          </select>
        </div>

        <Button variant="outline" className="w-full border-[#2a2a34] text-white hover:bg-[#1a1a24]">
          <Mail className="w-4 h-4 mr-2" />
          Request Data Export
        </Button>
      </div>
    </div>
  )
}
