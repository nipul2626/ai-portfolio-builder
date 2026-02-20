'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Eye, UserSwitch, Archive, Trash2, AlertTriangle } from 'lucide-react'

interface DangerZoneSettingsProps {
  portfolioId: string
}

export default function DangerZoneSettings({ portfolioId }: DangerZoneSettingsProps) {
  const [showUnpublishDialog, setShowUnpublishDialog] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [transferEmail, setTransferEmail] = useState('')
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Danger Zone Header */}
      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
        <div>
          <h2 className="text-lg font-bold text-red-400">Danger Zone</h2>
          <p className="text-sm text-red-300">Irreversible actions - proceed with caution</p>
        </div>
      </div>

      {/* Unpublish Portfolio */}
      <div className="neu-card p-6 rounded-lg space-y-3 border-l-4 border-l-orange-500">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-orange-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-white">Unpublish Portfolio</h3>
            <p className="text-sm text-[#a0a0b8] mt-1">
              Make your portfolio inaccessible to the public. Your URL will return 404 and it will be removed from the gallery.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 mt-2"
          onClick={() => setShowUnpublishDialog(true)}
        >
          Unpublish
        </Button>
      </div>

      {/* Transfer Ownership */}
      <div className="neu-card p-6 rounded-lg space-y-3 border-l-4 border-l-yellow-500">
        <div className="flex items-start gap-3">
          <UserSwitch className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-white">Transfer Ownership</h3>
            <p className="text-sm text-[#a0a0b8] mt-1">
              Transfer this portfolio to another user account. You will lose access to this portfolio.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 mt-2"
          onClick={() => setShowTransferDialog(true)}
        >
          Transfer
        </Button>
      </div>

      {/* Archive Portfolio */}
      <div className="neu-card p-6 rounded-lg space-y-3 border-l-4 border-l-blue-500">
        <div className="flex items-start gap-3">
          <Archive className="w-5 h-5 text-blue-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-white">Archive Portfolio</h3>
            <p className="text-sm text-[#a0a0b8] mt-1">
              Hide this portfolio from your dashboard. Your data is preserved and you can unarchive it anytime.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 mt-2"
          onClick={() => setShowArchiveDialog(true)}
        >
          Archive
        </Button>
      </div>

      {/* Delete Portfolio */}
      <div className="neu-card p-6 rounded-lg space-y-3 border-l-4 border-l-red-500 bg-red-500/5 hover:glow-cyan transition-all">
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-red-400 mt-0.5 animate-pulse" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-400">Permanently Delete Portfolio</h3>
            <p className="text-sm text-red-300 mt-1">
              This action cannot be undone. All content, settings, and analytics data will be permanently deleted from our servers.
            </p>
          </div>
        </div>
        <Button
          className="bg-red-500 hover:bg-red-600 text-white mt-2"
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete Permanently
        </Button>
      </div>

      {/* Unpublish Dialog */}
      <AlertDialog open={showUnpublishDialog} onOpenChange={setShowUnpublishDialog}>
        <AlertDialogContent className="bg-[#1a1a24] border border-[#2a2a34]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Unpublish Portfolio?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#a0a0b8]">
              Your portfolio will no longer be accessible to the public. You can republish it anytime from the General settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-orange-500 hover:bg-orange-600 text-white">
              Unpublish
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Transfer Dialog */}
      <AlertDialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <AlertDialogContent className="bg-[#1a1a24] border border-[#2a2a34]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Transfer Ownership</AlertDialogTitle>
            <AlertDialogDescription className="text-[#a0a0b8]">
              Enter the email address of the person you want to transfer this portfolio to. They will receive an email confirmation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            type="email"
            placeholder="recipient@example.com"
            value={transferEmail}
            onChange={(e) => setTransferEmail(e.target.value)}
            className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white"
          />
          <div className="flex gap-3">
            <AlertDialogCancel className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Send Transfer Request
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Dialog */}
      <AlertDialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <AlertDialogContent className="bg-[#1a1a24] border border-[#2a2a34]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Archive Portfolio?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#a0a0b8]">
              This portfolio will be hidden from your dashboard but all data will be preserved. You can unarchive it anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
              Keep It
            </AlertDialogCancel>
            <AlertDialogAction className="bg-blue-500 hover:bg-blue-600 text-white">
              Archive
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#1a1a24] border border-[#2a2a34]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Permanently Delete Portfolio?</AlertDialogTitle>
            <AlertDialogDescription className="text-red-300">
              This action cannot be undone. Type "DELETE" below to confirm permanent deletion of all portfolio data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            placeholder='Type "DELETE" to confirm'
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white border-red-500/50"
          />
          <div className="flex gap-3">
            <AlertDialogCancel className="border-[#2a2a34] text-white hover:bg-[#1a1a24]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteConfirmation !== 'DELETE'}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Permanently
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
