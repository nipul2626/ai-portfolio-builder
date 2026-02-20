'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function PerformanceScore() {
  const score = 78
  const metrics = [
    { label: 'Content Quality', value: 85 },
    { label: 'User Engagement', value: 72 },
    { label: 'SEO Optimization', value: 68 },
    { label: 'Load Performance', value: 91 },
    { label: 'Mobile Experience', value: 78 },
  ]

  const getScoreColor = (value: number) => {
    if (value >= 76) return '#22c55e'
    if (value >= 51) return '#eab308'
    return '#ef4444'
  }

  return (
    <div className="neu-card p-6 rounded-lg space-y-6 sticky top-[600px]">
      <h3 className="text-lg font-bold text-white">Portfolio Health</h3>

      {/* Main Score Circle */}
      <div className="flex flex-col items-center space-y-2">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(160, 160, 184, 0.1)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getScoreColor(score)}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 282.7} 282.7`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{score}</span>
            <span className="text-xs text-[#a0a0b8]">Overall</span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        {metrics.map((metric, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#a0a0b8] font-medium">{metric.label}</span>
              <span className="text-white font-semibold">{metric.value}</span>
            </div>
            <div className="h-1.5 bg-[#12121a] rounded-full overflow-hidden border border-[#1a1a24]">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff]"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50 text-sm">
        <Sparkles className="w-4 h-4 mr-2" />
        Improve Score
      </Button>
    </div>
  )
}
