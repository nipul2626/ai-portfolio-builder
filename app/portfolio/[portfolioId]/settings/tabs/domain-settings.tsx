'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Copy, Check, ExternalLink, Globe, Lock } from 'lucide-react'

interface DomainSettingsProps {
  portfolioId: string
}

export default function DomainSettings({ portfolioId }: DomainSettingsProps) {
  const [copied, setCopied] = useState(false)
  const [forceHttps, setForceHttps] = useState(true)
  const [wwwRedirect, setWwwRedirect] = useState(false)
  const [domainStatus, setDomainStatus] = useState<'pending' | 'verified' | 'error'>('verified')
  const [sslStatus, setSslStatus] = useState<'issued' | 'pending' | 'error'>('issued')
  const [customDomain, setCustomDomain] = useState('')

  const currentUrl = 'https://yourplatform.com/john-doe'

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Section 1: Current URL */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Current URL</h3>

        <div className="neu-card p-4 rounded-lg space-y-3">
          <p className="text-xs font-semibold text-[#a0a0b8] uppercase">Active URL</p>
          <div className="flex items-center justify-between gap-3">
            <code className="text-lg font-mono text-white bg-[#12121a] px-4 py-2 rounded flex-1">
              {currentUrl}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyUrl}
              className="text-[#00f0ff] hover:bg-[#00f0ff]/10"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              className="bg-[#00f0ff]/20 text-[#00f0ff] hover:bg-[#00f0ff]/30"
              onClick={() => window.open(currentUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section 2: Subdomain */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          Free Subdomain
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">FREE</Badge>
        </h3>

        <div className="neu-card p-4 rounded-lg space-y-2">
          <p className="text-sm text-[#a0a0b8]">yourplatform.com/john-doe</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium text-white">Primary subdomain</span>
            <Badge className="bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]/30">Primary</Badge>
          </div>
        </div>
      </div>

      {/* Section 3: Custom Domain */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          Custom Domain
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pro</Badge>
        </h3>

        <div className="neu-card p-6 rounded-lg space-y-4 bg-gradient-to-br from-[#1a1a24] to-[#12121a] border-l-2 border-[#00f0ff]">
          <h4 className="font-semibold text-white">Upgrade to Pro</h4>
          <p className="text-sm text-[#a0a0b8]">
            Connect your own domain (e.g., johndoe.com) and get SSL certificate included.
          </p>
          <ul className="space-y-2 text-sm text-[#a0a0b8]">
            <li className="flex items-center gap-2">
              <span className="text-[#00f0ff]">✓</span> Your custom domain
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00f0ff]">✓</span> Free SSL certificate (HTTPS)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00f0ff]">✓</span> DNS management
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#00f0ff]">✓</span> Email forwarding
            </li>
          </ul>
          <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:shadow-lg hover:shadow-yellow-500/50">
            Upgrade to Pro
          </Button>
        </div>

        {/* DNS Configuration Guide */}
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="dns-guide" className="border-[#2a2a34] rounded-lg neu-card px-4">
            <AccordionTrigger className="text-white hover:text-[#00f0ff] transition-colors py-4">
              How to connect your domain
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4">
              {[
                {
                  step: '1',
                  title: 'Go to your domain registrar',
                  desc: 'Log in to GoDaddy, Namecheap, or your domain provider'
                },
                {
                  step: '2',
                  title: 'Add DNS records',
                  records: [
                    { type: 'A', value: '1.2.3.4' },
                    { type: 'CNAME', value: 'www → example.com' }
                  ]
                },
                {
                  step: '3',
                  title: 'Wait for propagation',
                  desc: 'DNS changes can take 24-48 hours to propagate'
                }
              ].map((item) => (
                <div key={item.step} className="space-y-2 p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <h5 className="font-semibold text-white">{item.title}</h5>
                  </div>
                  {item.desc && <p className="text-xs text-[#a0a0b8] ml-11">{item.desc}</p>}
                  {'records' in item && item.records && (
                    <div className="ml-11 space-y-1">
                      {item.records.map((record, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                          <span className="text-[#00f0ff]">{record.type}:</span>
                          <span className="text-white">{record.value}</span>
                          <Button size="sm" variant="ghost" className="ml-auto text-[#00f0ff] hover:bg-[#00f0ff]/10 h-6">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Section 4: SSL Certificate */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-400" />
          SSL Certificate
        </h3>

        <div className="neu-card p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white">Automatic SSL</p>
            <Switch defaultChecked />
          </div>
          <div className="pt-3 border-t border-[#2a2a34]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-sm text-white">Certificate issued</p>
            </div>
            <p className="text-xs text-[#a0a0b8] mt-2">
              Valid until: December 15, 2025 • Auto-renews 30 days before expiry
            </p>
          </div>
        </div>
      </div>

      {/* Section 5: Advanced */}
      <div className="space-y-4 border-t border-[#2a2a34] pt-8">
        <h3 className="text-xl font-bold text-white">Advanced Settings</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">Force HTTPS</p>
              <p className="text-xs text-[#a0a0b8] mt-1">
                Redirect all HTTP traffic to HTTPS
              </p>
            </div>
            <Switch checked={forceHttps} onCheckedChange={setForceHttps} />
          </div>

          <div className="flex items-center justify-between p-4 neu-card rounded-lg">
            <div>
              <p className="text-sm font-medium text-white">WWW Redirect</p>
              <p className="text-xs text-[#a0a0b8] mt-1">
                {wwwRedirect ? 'Redirect www to non-www' : 'Redirect non-www to www'}
              </p>
            </div>
            <Switch checked={wwwRedirect} onCheckedChange={setWwwRedirect} />
          </div>

          <div className="p-4 neu-card rounded-lg space-y-2">
            <p className="text-sm font-medium text-white">Hosting Region</p>
            <select className="w-full bg-[#12121a] border border-[#1a1a24] text-white rounded px-3 py-2 text-sm">
              <option>US East (Optimal)</option>
              <option>US West</option>
              <option>EU West</option>
              <option>Asia Pacific</option>
            </select>
            <p className="text-xs text-[#a0a0b8] mt-2">
              Estimated latency from your location: 15ms
            </p>
          </div>

          <div className="p-4 neu-card rounded-lg space-y-2">
            <p className="text-sm font-medium text-white">CDN Status</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#a0a0b8]">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2" />
                CDN Enabled • Cloudflare
              </p>
              <Button size="sm" variant="outline" className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
                Purge Cache
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
