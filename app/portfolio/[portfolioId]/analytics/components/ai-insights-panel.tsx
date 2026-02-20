'use client'

import { Button } from '@/components/ui/button'
import { Lightbulb, AlertCircle, TrendingUp, RefreshCw } from 'lucide-react'

const insights = [
  {
    icon: TrendingUp,
    title: 'High Projects Engagement',
    description: 'Visitors spend most time on your Projects section. Consider adding more detailed case studies.',
    priority: 'high',
  },
  {
    icon: AlertCircle,
    title: 'Quick Page Exits',
    description: '45% of visitors leave within 30 seconds. Your hero section might need optimization.',
    priority: 'high',
  },
  {
    icon: Lightbulb,
    title: 'Mobile Traffic Growing',
    description: 'Mobile views increased 40% this month. Ensure mobile optimization is excellent.',
    priority: 'medium',
  },
  {
    icon: TrendingUp,
    title: 'LinkedIn is Your Top Source',
    description: 'LinkedIn drives 35% of quality traffic. Focus on LinkedIn engagement.',
    priority: 'low',
  },
]

export default function AIInsightsPanel() {
  return (
    <div className="neu-card p-6 rounded-lg space-y-4 sticky top-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">AI Insights</h3>
        <Button size="sm" variant="ghost" className="text-[#a0a0b8] hover:text-white h-8">
          <RefreshCw className="w-3 h-3" />
        </Button>
      </div>

      <p className="text-xs text-[#a0a0b8]">Powered by analytics data</p>

      <div className="space-y-2">
        {insights.map((insight, idx) => {
          const Icon = insight.icon
          const priorityColor = {
            high: 'bg-red-500/20 border-red-500/30',
            medium: 'bg-yellow-500/20 border-yellow-500/30',
            low: 'bg-green-500/20 border-green-500/30',
          }[insight.priority]

          const priorityDot = {
            high: 'bg-red-400',
            medium: 'bg-yellow-400',
            low: 'bg-green-400',
          }[insight.priority]

          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border space-y-2 cursor-pointer hover:glow-cyan transition-all ${priorityColor}`}
            >
              <div className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full ${priorityDot} mt-1.5 flex-shrink-0`} />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{insight.title}</p>
                  <p className="text-xs text-[#a0a0b8] mt-1">{insight.description}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-[#00f0ff] hover:bg-[#00f0ff]/10 h-6 text-xs">
                Learn More
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
