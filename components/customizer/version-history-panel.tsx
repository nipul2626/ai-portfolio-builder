'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, GitBranch, Eye, RotateCcw, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface Version {
  id: string
  timestamp: Date
  description: string
  thumbnail?: string
  user?: {
    name: string
    avatar?: string
  }
  isAutoSave: boolean
}

interface VersionHistoryPanelProps {
  versions: Version[]
  currentVersionId: string
  onRestore: (versionId: string) => void
  onBranch: (versionId: string) => void
  onDelete: (versionId: string) => void
}

export function VersionHistoryPanel({
  versions,
  currentVersionId,
  onRestore,
  onBranch,
  onDelete,
}: VersionHistoryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [compareVersion, setCompareVersion] = useState<string | null>(null)
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [versionToRestore, setVersionToRestore] = useState<Version | null>(null)

  const handleRestoreClick = (version: Version) => {
    setVersionToRestore(version)
    setRestoreDialogOpen(true)
  }

  const handleRestore = () => {
    if (versionToRestore) {
      onRestore(versionToRestore.id)
      setRestoreDialogOpen(false)
      setVersionToRestore(null)
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col h-full bg-card border-t border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-500" />
          <h3 className="font-semibold text-sm">Version History</h3>
          <span className="text-xs text-muted-foreground">({versions.length})</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden"
          >
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />

                  {/* Version Items */}
                  {versions.map((version, index) => {
                    const isCurrent = version.id === currentVersionId
                    const isComparing = version.id === compareVersion

                    return (
                      <motion.div
                        key={version.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative pl-14 pb-4"
                      >
                        {/* Timeline Marker */}
                        <div
                          className={`absolute left-4 top-2 w-4 h-4 rounded-full border-2 ${
                            isCurrent
                              ? 'bg-cyan-500 border-cyan-400 ring-4 ring-cyan-500/20'
                              : isComparing
                              ? 'bg-purple-500 border-purple-400 ring-4 ring-purple-500/20'
                              : 'bg-background border-border'
                          }`}
                        />

                        {/* Version Card */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`neu-card rounded-lg p-3 cursor-pointer ${
                            isCurrent ? 'ring-2 ring-cyan-500/50' : ''
                          }`}
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-1">
                              {version.user && (
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {version.user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {version.description}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatTimestamp(version.timestamp)}
                                  {version.isAutoSave && (
                                    <span className="ml-2 text-cyan-500">(Auto-save)</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            {isCurrent && (
                              <span className="text-xs bg-cyan-500/20 text-cyan-500 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>

                          {/* Thumbnail */}
                          {version.thumbnail && (
                            <div className="w-full h-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded mb-2 overflow-hidden">
                              <img
                                src={version.thumbnail}
                                alt="Version preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setCompareVersion(version.id)}
                              className="flex-1 text-xs"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            {!isCurrent && (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleRestoreClick(version)}
                                  className="flex-1 text-xs"
                                >
                                  <RotateCcw className="w-3 h-3 mr-1" />
                                  Restore
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => onBranch(version.id)}
                                  className="flex-1 text-xs"
                                >
                                  <GitBranch className="w-3 h-3 mr-1" />
                                  Branch
                                </Button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>

                {versions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No version history yet</p>
                    <p className="text-xs mt-1">Your changes will be saved automatically</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Confirmation Dialog */}
      <Dialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Version?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to restore to this version? Your current work will be saved as a new version.
            </p>
            {versionToRestore && (
              <div className="neu-card rounded-lg p-3">
                <p className="text-sm font-medium">{versionToRestore.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimestamp(versionToRestore.timestamp)}
                </p>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setRestoreDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600" onClick={handleRestore}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restore
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Compare View Dialog */}
      {compareVersion && (
        <Dialog open={!!compareVersion} onOpenChange={(open) => !open && setCompareVersion(null)}>
          <DialogContent className="max-w-6xl">
            <DialogHeader>
              <DialogTitle>Compare Versions</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Current Version</p>
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg" />
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Selected Version</p>
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg" />
              </div>
            </div>
            <Button variant="outline" onClick={() => setCompareVersion(null)}>
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
