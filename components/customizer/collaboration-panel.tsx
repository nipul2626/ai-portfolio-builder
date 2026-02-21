'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, UserPlus, Crown, Eye, Edit3, MessageSquare, X, Mail, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Collaborator {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'editor' | 'viewer'
  status: 'online' | 'offline'
  cursor?: { x: number; y: number }
}

const mockCollaborators: Collaborator[] = [
  {
    id: '1',
    name: 'You',
    email: 'you@example.com',
    role: 'owner',
    status: 'online',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '/placeholder.svg',
    role: 'editor',
    status: 'online',
    cursor: { x: 245, y: 120 },
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'viewer',
    status: 'offline',
  },
]

export function CollaborationPanel() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(mockCollaborators)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('viewer')
  const [shareLink] = useState('https://portfolio.ai/share/abc123xyz')
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleInvite = () => {
    if (!inviteEmail) return

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'offline',
    }

    setCollaborators([...collaborators, newCollaborator])
    setInviteEmail('')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateRole = (id: string, newRole: 'editor' | 'viewer') => {
    setCollaborators(
      collaborators.map((c) => (c.id === id ? { ...c, role: newRole } : c))
    )
  }

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  const onlineCollaborators = collaborators.filter((c) => c.status === 'online')

  return (
    <>
      {/* Online Collaborators Avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {onlineCollaborators.slice(0, 3).map((collab, idx) => (
            <motion.div
              key={collab.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <Avatar className="w-8 h-8 border-2 border-background">
                <AvatarImage src={collab.avatar} />
                <AvatarFallback className="text-xs bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                  {collab.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
            </motion.div>
          ))}
          {onlineCollaborators.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-accent border-2 border-background flex items-center justify-center text-xs font-medium">
              +{onlineCollaborators.length - 3}
            </div>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="w-4 h-4" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Collaborate
              </DialogTitle>
              <DialogDescription>
                Invite team members to collaborate on your portfolio in real-time
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Share Link */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Share link</label>
                <div className="flex gap-2">
                  <Input value={shareLink} readOnly className="flex-1" />
                  <Button onClick={handleCopyLink} variant="outline">
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view your portfolio
                </p>
              </div>

              {/* Invite People */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Invite people</label>
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="email@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                      className="flex-1"
                    />
                    <Select value={inviteRole} onValueChange={(v: any) => setInviteRole(v)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Viewer
                          </div>
                        </SelectItem>
                        <SelectItem value="editor">
                          <div className="flex items-center gap-2">
                            <Edit3 className="w-4 h-4" />
                            Editor
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleInvite}>
                    <Mail className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              {/* Collaborators List */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  People with access ({collaborators.length})
                </label>
                <ScrollArea className="h-64 border border-border rounded-lg">
                  <div className="p-2 space-y-1">
                    {collaborators.map((collab) => (
                      <motion.div
                        key={collab.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={collab.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                                {collab.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {collab.status === 'online' && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{collab.name}</span>
                              {collab.role === 'owner' && (
                                <Crown className="w-3 h-3 text-yellow-500" />
                              )}
                              {collab.status === 'online' && (
                                <span className="text-xs text-green-500">Online</span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{collab.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {collab.role !== 'owner' && (
                            <>
                              <Select
                                value={collab.role}
                                onValueChange={(v: any) => updateRole(collab.id, v)}
                              >
                                <SelectTrigger className="w-28 h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="viewer">Viewer</SelectItem>
                                  <SelectItem value="editor">Editor</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCollaborator(collab.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {collab.role === 'owner' && (
                            <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-accent">
                              Owner
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Role Descriptions */}
              <div className="p-4 bg-accent/50 rounded-lg space-y-2">
                <h4 className="text-sm font-medium">Permission levels:</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Crown className="w-4 h-4 mt-0.5 text-yellow-500" />
                    <div>
                      <strong>Owner:</strong> Full access, can manage all settings
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Edit3 className="w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Editor:</strong> Can edit and customize the portfolio
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Eye className="w-4 h-4 mt-0.5" />
                    <div>
                      <strong>Viewer:</strong> Can only view and comment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Live Cursors (would be rendered on canvas) */}
      <AnimatePresence>
        {collaborators
          .filter((c) => c.cursor && c.id !== '1')
          .map((collab) => (
            <motion.div
              key={collab.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                position: 'fixed',
                left: collab.cursor!.x,
                top: collab.cursor!.y,
                pointerEvents: 'none',
                zIndex: 9999,
              }}
            >
              <div className="flex items-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5.65376 12.3673L5 4L13.3673 5.65376L8.3341 10.687L11.5 13.8529L13.8529 11.5L10.687 8.3341L5.65376 12.3673Z"
                    fill="currentColor"
                    className="text-cyan-500"
                  />
                </svg>
                <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full whitespace-nowrap">
                  {collab.name}
                </span>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  )
}
