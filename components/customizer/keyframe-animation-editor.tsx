'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Plus, Trash2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Keyframe {
  id: string
  time: number // 0-1
  properties: {
    x?: number
    y?: number
    scale?: number
    rotation?: number
    opacity?: number
    [key: string]: any
  }
}

interface KeyframeEditorProps {
  keyframes: Keyframe[]
  onChange: (keyframes: Keyframe[]) => void
}

export function KeyframeAnimationEditor({ keyframes, onChange }: KeyframeEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedKeyframe, setSelectedKeyframe] = useState<string | null>(null)
  const [duration, setDuration] = useState(1000) // ms
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const addKeyframe = () => {
    const newKeyframe: Keyframe = {
      id: Date.now().toString(),
      time: currentTime,
      properties: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
      },
    }
    onChange([...keyframes, newKeyframe].sort((a, b) => a.time - b.time))
    setSelectedKeyframe(newKeyframe.id)
  }

  const deleteKeyframe = (id: string) => {
    onChange(keyframes.filter((k) => k.id !== id))
    if (selectedKeyframe === id) setSelectedKeyframe(null)
  }

  const duplicateKeyframe = (keyframe: Keyframe) => {
    const newKeyframe = {
      ...keyframe,
      id: Date.now().toString(),
      time: Math.min(keyframe.time + 0.1, 1),
    }
    onChange([...keyframes, newKeyframe].sort((a, b) => a.time - b.time))
  }

  const updateKeyframe = (id: string, updates: Partial<Keyframe>) => {
    onChange(
      keyframes.map((k) => (k.id === id ? { ...k, ...updates } : k))
    )
  }

  const selectedKeyframeData = keyframes.find((k) => k.id === selectedKeyframe)

  const easingPresets = [
    { name: 'Linear', value: 'linear' },
    { name: 'Ease In', value: 'easeIn' },
    { name: 'Ease Out', value: 'easeOut' },
    { name: 'Ease In Out', value: 'easeInOut' },
    { name: 'Bounce', value: 'anticipate' },
    { name: 'Spring', value: 'backInOut' },
  ]

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold mb-3">Keyframe Animation</h3>
        
        {/* Play Controls */}
        <div className="flex items-center gap-2 mb-3">
          <Button
            size="sm"
            variant={isPlaying ? 'default' : 'outline'}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <div className="text-xs text-muted-foreground">
            {Math.round(currentTime * duration)}ms / {duration}ms
          </div>
          <div className="flex-1" />
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="text-xs bg-background border border-border rounded px-2 py-1"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="2">2x</option>
          </select>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label className="text-xs">Duration (ms)</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="h-8"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 border-b border-border">
        <div className="relative h-20 bg-background/50 rounded-lg border border-border overflow-hidden">
          {/* Time markers */}
          <div className="absolute inset-0 flex">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <div
                key={t}
                className="absolute h-full border-l border-border/50"
                style={{ left: `${t * 100}%` }}
              >
                <span className="absolute top-1 left-1 text-xs text-muted-foreground">
                  {Math.round(t * duration)}
                </span>
              </div>
            ))}
          </div>

          {/* Keyframes */}
          {keyframes.map((keyframe) => (
            <motion.button
              key={keyframe.id}
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 cursor-pointer ${
                selectedKeyframe === keyframe.id
                  ? 'bg-cyan-500 border-cyan-400 scale-125'
                  : 'bg-purple-500 border-purple-400'
              }`}
              style={{ left: `${keyframe.time * 100}%` }}
              onClick={() => setSelectedKeyframe(keyframe.id)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0}
              dragMomentum={false}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}

          {/* Playhead */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-500 pointer-events-none"
            style={{ left: `${currentTime * 100}%` }}
            animate={isPlaying ? { left: ['0%', '100%'] } : {}}
            transition={{
              duration: (duration / 1000) / playbackSpeed,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
          />

          {/* Scrubber */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Add Keyframe Button */}
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-2"
          onClick={addKeyframe}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Keyframe at {Math.round(currentTime * duration)}ms
        </Button>
      </div>

      {/* Keyframe Properties */}
      <ScrollArea className="flex-1">
        {selectedKeyframeData ? (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">
                Keyframe at {Math.round(selectedKeyframeData.time * duration)}ms
              </h4>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => duplicateKeyframe(selectedKeyframeData)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteKeyframe(selectedKeyframeData.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="transform" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="transform">Transform</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>

              <TabsContent value="transform" className="space-y-4 mt-4">
                {/* Position X */}
                <div className="space-y-2">
                  <Label className="text-xs">Position X</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[selectedKeyframeData.properties.x || 0]}
                      onValueChange={([value]) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, x: value },
                        })
                      }
                      min={-500}
                      max={500}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={selectedKeyframeData.properties.x || 0}
                      onChange={(e) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, x: Number(e.target.value) },
                        })
                      }
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                {/* Position Y */}
                <div className="space-y-2">
                  <Label className="text-xs">Position Y</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[selectedKeyframeData.properties.y || 0]}
                      onValueChange={([value]) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, y: value },
                        })
                      }
                      min={-500}
                      max={500}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={selectedKeyframeData.properties.y || 0}
                      onChange={(e) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, y: Number(e.target.value) },
                        })
                      }
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                {/* Scale */}
                <div className="space-y-2">
                  <Label className="text-xs">Scale</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[selectedKeyframeData.properties.scale || 1]}
                      onValueChange={([value]) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, scale: value },
                        })
                      }
                      min={0}
                      max={3}
                      step={0.1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={selectedKeyframeData.properties.scale || 1}
                      onChange={(e) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, scale: Number(e.target.value) },
                        })
                      }
                      className="w-20 h-8"
                    />
                  </div>
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <Label className="text-xs">Rotation (deg)</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[selectedKeyframeData.properties.rotation || 0]}
                      onValueChange={([value]) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, rotation: value },
                        })
                      }
                      min={-360}
                      max={360}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={selectedKeyframeData.properties.rotation || 0}
                      onChange={(e) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, rotation: Number(e.target.value) },
                        })
                      }
                      className="w-20 h-8"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4 mt-4">
                {/* Opacity */}
                <div className="space-y-2">
                  <Label className="text-xs">Opacity</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[selectedKeyframeData.properties.opacity || 1]}
                      onValueChange={([value]) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, opacity: value },
                        })
                      }
                      min={0}
                      max={1}
                      step={0.01}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={selectedKeyframeData.properties.opacity || 1}
                      onChange={(e) =>
                        updateKeyframe(selectedKeyframeData.id, {
                          properties: { ...selectedKeyframeData.properties, opacity: Number(e.target.value) },
                        })
                      }
                      className="w-20 h-8"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 mt-4">
                <p className="text-xs text-muted-foreground">
                  Add custom CSS properties for advanced animations
                </p>
              </TabsContent>
            </Tabs>

            {/* Easing Curve */}
            <div className="space-y-2 pt-4 border-t border-border">
              <Label className="text-xs">Easing Curve</Label>
              <div className="grid grid-cols-3 gap-2">
                {easingPresets.map((preset) => (
                  <button
                    key={preset.value}
                    className="px-3 py-2 text-xs rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p className="text-sm">Select a keyframe to edit its properties</p>
            <p className="text-xs mt-2">or click on the timeline to add a new one</p>
          </div>
        )}
      </ScrollArea>

      {/* Animation Presets */}
      <div className="p-4 border-t border-border">
        <Label className="text-xs mb-2 block">Quick Presets</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Fade In', 'Slide In', 'Bounce', 'Scale'].map((preset) => (
            <button
              key={preset}
              className="px-3 py-2 text-xs rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
