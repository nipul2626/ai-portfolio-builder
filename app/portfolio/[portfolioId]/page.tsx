'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BarChart3, Settings, Eye, Edit3, TrendingUp, Share2, Archive } from 'lucide-react'

interface PortfolioDashboardProps {
  params: {
    portfolioId: string
  }
}

export default function PortfolioDashboard({ params }: PortfolioDashboardProps) {
  const portfolioId = params.portfolioId

  const actions = [
    {
      icon: Edit3,
      title: 'Edit Portfolio',
      description: 'Modify your portfolio content and sections',
      href: `/portfolio/${portfolioId}/editor`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'View Analytics',
      description: 'Track views, visitors, and engagement metrics',
      href: `/portfolio/${portfolioId}/analytics`,
      color: 'from-cyan-500 to-green-500',
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure portfolio settings and preferences',
      href: `/portfolio/${portfolioId}/settings`,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Eye,
      title: 'Preview',
      description: 'See how your portfolio looks to visitors',
      href: '#',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Share2,
      title: 'Share',
      description: 'Get your portfolio link and share it',
      href: '#',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Archive,
      title: 'Archive',
      description: 'Hide this portfolio from your dashboard',
      href: '#',
      color: 'from-gray-500 to-slate-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-bold gradient-text mb-4">Portfolio Dashboard</h1>
          <p className="text-xl text-[#a0a0b8] font-outfit max-w-2xl mx-auto">
            Manage, analyze, and optimize your professional portfolio
          </p>
        </div>

        {/* Portfolio Info Card */}
        <div className="neu-card p-8 rounded-xl mb-12 space-y-6 border border-[#2a2a34]">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-[#a0a0b8] text-sm mb-2">Portfolio Name</p>
              <p className="text-2xl font-bold text-white">John Doe Portfolio</p>
            </div>
            <div>
              <p className="text-[#a0a0b8] text-sm mb-2">Live URL</p>
              <p className="text-lg font-mono text-[#00f0ff]">yourplatform.com/john-doe</p>
            </div>
            <div>
              <p className="text-[#a0a0b8] text-sm mb-2">Views (This Month)</p>
              <p className="text-2xl font-bold text-white">2,450 <span className="text-sm text-green-400">+24%</span></p>
            </div>
          </div>

          <div className="border-t border-[#2a2a34] pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <p className="text-sm text-white">
                Portfolio Status: <span className="font-semibold text-green-400">Published</span>
              </p>
            </div>
            <Link href={`/portfolio/${portfolioId}/settings`}>
              <Button size="sm" className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50">
                Edit Status
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-4 mb-4">
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          <p className="text-[#a0a0b8]">Access all portfolio management tools from here</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action, idx) => {
            const Icon = action.icon
            return (
              <Link key={idx} href={action.href}>
                <div className="neu-card p-6 rounded-xl h-full space-y-4 hover:glow-cyan transition-all cursor-pointer group border border-[#2a2a34] hover:border-[#00f0ff]/50">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} opacity-20 flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-[#a0a0b8] mt-1">{action.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[#1a1a24]">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Open
                    </Button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-12 border-t border-[#2a2a34]">
          <h2 className="text-2xl font-bold text-white mb-6">Portfolio Statistics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Views', value: '12,456', change: '+15%' },
              { label: 'Unique Visitors', value: '4,321', change: '+8%' },
              { label: 'Avg. Time on Page', value: '3m 42s', change: '+12%' },
              { label: 'Engagement Rate', value: '68%', change: '+5%' },
            ].map((stat, idx) => (
              <div key={idx} className="neu-card p-4 rounded-lg space-y-2 border border-[#2a2a34]">
                <p className="text-xs text-[#a0a0b8] uppercase font-semibold">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-green-400 font-semibold">{stat.change} vs last month</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 pt-12 border-t border-[#2a2a34]">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>

          <div className="space-y-3">
            {[
              { action: 'Updated portfolio settings', time: '2 hours ago' },
              { action: 'Added new project case study', time: '1 day ago' },
              { action: 'Modified SEO metadata', time: '3 days ago' },
              { action: 'Published portfolio', time: '1 week ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 neu-card rounded-lg border border-[#1a1a24]">
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-[#a0a0b8]">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
