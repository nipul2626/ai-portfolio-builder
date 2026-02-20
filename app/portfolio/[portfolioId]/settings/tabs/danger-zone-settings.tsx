'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Eye, UserCog, Archive, Trash2, AlertTriangle } from 'lucide-react'

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
                Make your portfolio inaccessible to the public.
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
            <UserCog className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">Transfer Ownership</h3>
              <p className="text-sm text-[#a0a0b8] mt-1">
                Transfer this portfolio to another user account.
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
                Hide this portfolio from your dashboard.
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
        <div className="neu-card p-6 rounded-lg space-y-3 border-l-4 border-l-red-500 bg-red-500/5">
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-red-400 mt-0.5 animate-pulse" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-400">Permanently Delete Portfolio</h3>
              <p className="text-sm text-red-300 mt-1">
                This action cannot be undone.
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

        {/* Delete Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="bg-[#1a1a24] border border-[#2a2a34]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-400">
                Permanently Delete Portfolio?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-red-300">
                Type "DELETE" below to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Input
                placeholder='Type "DELETE" to confirm'
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="neu-card-inset bg-[#12121a] border-[#1a1a24] text-white border-red-500/50"
            />

            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                  disabled={deleteConfirmation !== 'DELETE'}
                  className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete Permanently
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  )
}