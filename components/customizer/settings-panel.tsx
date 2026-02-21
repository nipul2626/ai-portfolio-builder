'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Palette, Globe, Code, Smartphone, Lock, Zap, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function SettingsPanel() {
  const [settings, setSettings] = useState({
    siteName: 'My Portfolio',
    customDomain: '',
    enableAnalytics: true,
    enableSEO: true,
    enablePWA: false,
    autoSave: true,
    showGridLines: true,
    snapToGrid: true,
    darkMode: true,
    notifications: {
      email: true,
      push: false,
      collaboration: true,
    },
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Portfolio Settings
          </DialogTitle>
          <DialogDescription>
            Customize your portfolio settings and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] mt-4">
            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting('siteName', e.target.value)}
                    placeholder="My Portfolio"
                  />
                  <p className="text-xs text-muted-foreground">
                    This appears in the browser tab and search results
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <div className="flex gap-2">
                    <Input
                      id="customDomain"
                      value={settings.customDomain}
                      onChange={(e) => updateSetting('customDomain', e.target.value)}
                      placeholder="example.com"
                    />
                    <Button variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Connect your own domain for a professional look
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Save</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically save changes
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics</Label>
                      <p className="text-xs text-muted-foreground">
                        Track visitor statistics
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableAnalytics}
                      onCheckedChange={(checked) => updateSetting('enableAnalytics', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Progressive Web App</Label>
                      <p className="text-xs text-muted-foreground">
                        Enable offline access
                      </p>
                    </div>
                    <Switch
                      checked={settings.enablePWA}
                      onCheckedChange={(checked) => updateSetting('enablePWA', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Design Settings */}
            <TabsContent value="design" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Grid Lines</Label>
                    <p className="text-xs text-muted-foreground">
                      Display alignment grid in editor
                    </p>
                  </div>
                  <Switch
                    checked={settings.showGridLines}
                    onCheckedChange={(checked) => updateSetting('showGridLines', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Snap to Grid</Label>
                    <p className="text-xs text-muted-foreground">
                      Align elements to grid automatically
                    </p>
                  </div>
                  <Switch
                    checked={settings.snapToGrid}
                    onCheckedChange={(checked) => updateSetting('snapToGrid', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Use dark theme in editor
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                  />
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <Label>Color Palette</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {['#06b6d4', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b'].map((color) => (
                      <button
                        key={color}
                        className="w-full aspect-square rounded-lg border-2 border-border hover:border-white transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SEO Settings */}
            <TabsContent value="seo" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label>Enable SEO</Label>
                    <p className="text-xs text-muted-foreground">
                      Optimize for search engines
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableSEO}
                    onCheckedChange={(checked) => updateSetting('enableSEO', checked)}
                  />
                </div>

                {settings.enableSEO && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        placeholder="Portfolio - Your Name"
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">
                        50-60 characters recommended
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <textarea
                        id="metaDescription"
                        className="w-full px-3 py-2 rounded-md border border-border bg-background resize-none"
                        rows={3}
                        placeholder="A brief description of your portfolio..."
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">
                        150-160 characters recommended
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        placeholder="web developer, designer, portfolio"
                      />
                      <p className="text-xs text-muted-foreground">
                        Comma-separated keywords
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogImage">Social Share Image</Label>
                      <div className="flex gap-2">
                        <Input id="ogImage" placeholder="https://..." />
                        <Button variant="outline">Upload</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 1200x630px
                      </p>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Notifications</Label>
                  <div className="space-y-3 p-4 bg-accent/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email notifications</span>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) =>
                          updateSetting('notifications', {
                            ...settings.notifications,
                            email: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Push notifications</span>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) =>
                          updateSetting('notifications', {
                            ...settings.notifications,
                            push: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Collaboration updates</span>
                      <Switch
                        checked={settings.notifications.collaboration}
                        onCheckedChange={(checked) =>
                          updateSetting('notifications', {
                            ...settings.notifications,
                            collaboration: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <Label>Danger Zone</Label>
                  <div className="p-4 border border-red-500/50 rounded-lg space-y-3">
                    <Button variant="outline" className="w-full text-red-500 border-red-500/50">
                      <Lock className="w-4 h-4 mr-2" />
                      Reset to Template
                    </Button>
                    <Button variant="outline" className="w-full text-red-500 border-red-500/50">
                      Delete Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
