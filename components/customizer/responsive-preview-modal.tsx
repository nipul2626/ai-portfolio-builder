'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Monitor, Tablet, Smartphone, RotateCw, ExternalLink, RefreshCw } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ResponsivePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  templateId?: string
}

type DeviceType = 'desktop' | 'tablet' | 'mobile'
type Orientation = 'portrait' | 'landscape'

const deviceDimensions = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
}

export function ResponsivePreviewModal({ isOpen, onClose, templateId }: ResponsivePreviewModalProps) {
  const [device, setDevice] = useState<DeviceType>('desktop')
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const toggleOrientation = () => {
    setOrientation((prev) => (prev === 'portrait' ? 'landscape' : 'portrait'))
  }

  const getDeviceDimensions = () => {
    const dims = deviceDimensions[device]
    if (device !== 'desktop' && orientation === 'landscape') {
      return { width: dims.height, height: dims.width }
    }
    return dims
  }

  const dims = getDeviceDimensions()
  const scale = typeof window !== 'undefined' 
    ? Math.min(
        (window.innerWidth * 0.8) / dims.width,
        (window.innerHeight * 0.7) / dims.height,
        1
      )
    : 0.5

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle>Preview</DialogTitle>
            <div className="flex items-center gap-2">
              {/* Device Selector */}
              <Tabs value={device} onValueChange={(v) => setDevice(v as DeviceType)}>
                <TabsList className="h-9">
                  <TabsTrigger value="desktop" className="px-3">
                    <Monitor className="w-4 h-4 mr-1.5" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="tablet" className="px-3">
                    <Tablet className="w-4 h-4 mr-1.5" />
                    Tablet
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="px-3">
                    <Smartphone className="w-4 h-4 mr-1.5" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Orientation Toggle (only for tablet/mobile) */}
              {device !== 'desktop' && (
                <Button variant="outline" size="sm" onClick={toggleOrientation}>
                  <RotateCw className="w-4 h-4 mr-1.5" />
                  Rotate
                </Button>
              )}

              {/* Refresh */}
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>

              {/* Open in New Tab */}
              <Button variant="outline" size="sm" asChild>
                <a href={`/preview/${templateId}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>

              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Device Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
            <span>
              {dims.width} × {dims.height}
            </span>
            <span>Scale: {Math.round(scale * 100)}%</span>
            <span className="capitalize">{orientation}</span>
          </div>
        </DialogHeader>

        {/* Preview Area */}
        <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center min-h-[70vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${device}-${orientation}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                width: dims.width,
                height: dims.height,
                transform: `scale(${scale})`,
              }}
              className="bg-white rounded-lg shadow-2xl overflow-hidden origin-center"
            >
              <iframe
                key={isRefreshing ? 'refreshing' : 'loaded'}
                src={`/preview/${templateId}?device=${device}`}
                className="w-full h-full border-0"
                title="Template Preview"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Common Device Presets */}
        <div className="px-6 py-3 border-t border-border bg-card">
          <p className="text-xs text-muted-foreground mb-2">Common devices:</p>
          <div className="flex gap-2 overflow-x-auto">
            {[
              { name: 'iPhone 14', width: 390, height: 844 },
              { name: 'iPad Pro', width: 1024, height: 1366 },
              { name: 'MacBook Pro', width: 1440, height: 900 },
              { name: 'Galaxy S23', width: 360, height: 800 },
            ].map((preset) => (
              <button
                key={preset.name}
                className="px-3 py-1.5 rounded-md bg-accent hover:bg-accent/80 text-xs whitespace-nowrap border border-border"
              >
                {preset.name}
                <span className="text-muted-foreground ml-1">
                  {preset.width}×{preset.height}
                </span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
