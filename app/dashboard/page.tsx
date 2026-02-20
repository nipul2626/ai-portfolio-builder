'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSidebar } from '@/components/animated-sidebar'
import { AnimatedStatsCard } from '@/components/animated-stats-card'
import { AnimatedPortfolioGrid } from '@/components/animated-portfolio-grid'
import { AIAssistantChat } from '@/components/ai-assistant-chat'
import { TrendingUp, Users, Eye, Award, Plus, Upload, Zap } from 'lucide-react'

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const stats = [
    { title: 'Total Projects', value: 24, icon: Award, color: 'blue' as const, trend: 12 },
    { title: 'Total Views', value: 15420, icon: Eye, color: 'purple' as const, trend: 8 },
    { title: 'Followers', value: 1234, icon: Users, color: 'green' as const, trend: 15 },
    { title: 'Engagement', value: 89, suffix: '%', icon: TrendingUp, color: 'orange' as const, trend: 5 }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background patterns */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      
      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Sidebar */}
      <AnimatedSidebar onCollapse={setSidebarCollapsed} />

      {/* Main Content */}
      <motion.main
        animate={{
          marginLeft: sidebarCollapsed ? 80 : 280
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-white mb-2"
              >
                Welcome back, John! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400"
              >
                Here&apos;s what&apos;s happening with your portfolio today
              </motion.p>
            </div>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all backdrop-blur-sm"
              >
                <Upload className="w-4 h-4" />
                <span className="font-medium">Upload</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AnimatedStatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1 + 0.5}
            />
          ))}
        </div>

        {/* AI Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8 relative backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-2xl p-6 overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
          />
          
          <div className="relative z-10 flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-slate-300 mb-4 text-balance">
                Your portfolio performance increased by 23% this week! Consider adding more projects in the &quot;Web Development&quot; category to maximize engagement.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all"
              >
                View Full Report
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View All →
            </motion.button>
          </div>

          <AnimatedPortfolioGrid />
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {[
              { action: 'New follower', user: 'Sarah Johnson', time: '2 minutes ago', color: 'blue' },
              { action: 'Project liked', user: 'Mike Chen', time: '15 minutes ago', color: 'red' },
              { action: 'Comment received', user: 'Emma Davis', time: '1 hour ago', color: 'green' },
              { action: 'Profile viewed', user: 'Alex Thompson', time: '3 hours ago', color: 'purple' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer"
              >
                <div className={`w-10 h-10 bg-${activity.color}-500/20 rounded-full flex items-center justify-center`}>
                  <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full`} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-slate-400 text-sm">{activity.user}</p>
                </div>
                <span className="text-slate-500 text-sm">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.main>

      {/* AI Assistant Chat */}
      <AIAssistantChat />
    </div>
  )
}
