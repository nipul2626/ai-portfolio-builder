'use client'

import { Eye, Users, Download, Clock, Heart } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface MetricsRowProps {
  compareEnabled: boolean
}

const metrics = [
  {
    label: 'Total Views',
    value: '2,450',
    change: '+24%',
    positive: true,
    icon: Eye,
    color: 'from-cyan-500 to-blue-500',
    data: [
      { value: 100 },
      { value: 150 },
      { value: 120 },
      { value: 180 },
      { value: 200 },
      { value: 180 },
      { value: 200 },
    ],
  },
  {
    label: 'Unique Visitors',
    value: '1,230',
    change: '+18%',
    positive: true,
    icon: Users,
    color: 'from-magenta-500 to-pink-500',
    data: [
      { value: 60 },
      { value: 80 },
      { value: 70 },
      { value: 100 },
      { value: 120 },
      { value: 110 },
      { value: 115 },
    ],
  },
  {
    label: 'Downloads',
    value: '456',
    change: '+32%',
    positive: true,
    icon: Download,
    color: 'from-green-500 to-emerald-500',
    data: [
      { value: 30 },
      { value: 45 },
      { value: 40 },
      { value: 60 },
      { value: 80 },
      { value: 75 },
      { value: 70 },
    ],
  },
  {
    label: 'Avg. Time on Page',
    value: '2m 34s',
    change: '+12%',
    positive: true,
    icon: Clock,
    color: 'from-orange-500 to-amber-500',
    data: [
      { value: 80 },
      { value: 90 },
      { value: 85 },
      { value: 110 },
      { value: 130 },
      { value: 120 },
      { value: 125 },
    ],
  },
  {
    label: 'Engagement Rate',
    value: '67%',
    change: '+5%',
    positive: true,
    icon: Heart,
    color: 'from-purple-500 to-indigo-500',
    data: [
      { value: 120 },
      { value: 140 },
      { value: 130 },
      { value: 160 },
      { value: 180 },
      { value: 170 },
      { value: 175 },
    ],
  },
]

export default function MetricsRow({ compareEnabled }: MetricsRowProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <div
            key={idx}
            className="neu-card p-4 rounded-lg space-y-3 hover:glow-cyan transition-all cursor-pointer group"
          >
            {/* Icon */}
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} opacity-20 flex items-center justify-center`}>
                <Icon className="w-5 h-5" style={{ color: metric.color.split(' ')[1] }} />
              </div>
              <span className={`text-xs font-semibold ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.positive ? '↑' : '↓'} {metric.change}
              </span>
            </div>

            {/* Value */}
            <div>
              <p className="text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {metric.value}
              </p>
              <p className="text-xs text-[#a0a0b8] mt-1">{metric.label}</p>
            </div>

            {/* Sparkline */}
            <div className="h-8 -mx-4 -mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metric.data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={metric.color.includes('cyan') ? '#00f0ff' : metric.color.includes('magenta') ? '#ff00ff' : metric.color.includes('green') ? '#22c55e' : metric.color.includes('orange') ? '#f97316' : '#a855f7'}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      })}
    </div>
  )
}
