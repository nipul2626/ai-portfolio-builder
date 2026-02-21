'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Download, RefreshCw, Eye, Users, Clock, Heart, TrendingUp, MapPin, Lightbulb, AlertCircle, Sparkles, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const mockChartData = [
  { date: 'Mon', views: 240, visitors: 120, downloads: 45 },
  { date: 'Tue', views: 310, visitors: 150, downloads: 62 },
  { date: 'Wed', views: 280, visitors: 130, downloads: 55 },
  { date: 'Thu', views: 390, visitors: 180, downloads: 78 },
  { date: 'Fri', views: 450, visitors: 220, downloads: 95 },
  { date: 'Sat', views: 420, visitors: 210, downloads: 88 },
  { date: 'Sun', views: 380, visitors: 190, downloads: 72 },
]

const mockTrafficData = [
  { name: 'Direct', value: 300, color: '#00f0ff' },
  { name: 'LinkedIn', value: 250, color: '#ff00ff' },
  { name: 'Google', value: 200, color: '#7b2ff7' },
  { name: 'Twitter', value: 150, color: '#00ff88' },
  { name: 'Other', value: 100, color: '#ffaa00' },
]

const metrics = [
  { label: 'Total Views', value: 2450, formatted: '2,450', change: '+24%', positive: true, icon: Eye, color: '#00f0ff', sparkData: [100, 150, 120, 180, 200, 180, 200] },
  { label: 'Unique Visitors', value: 1230, formatted: '1,230', change: '+18%', positive: true, icon: Users, color: '#ff00ff', sparkData: [60, 80, 70, 100, 120, 110, 115] },
  { label: 'Downloads', value: 456, formatted: '456', change: '+32%', positive: true, icon: Download, color: '#22c55e', sparkData: [30, 45, 40, 60, 80, 75, 70] },
  { label: 'Avg. Time', value: 154, formatted: '2m 34s', change: '+12%', positive: true, icon: Clock, color: '#f97316', sparkData: [80, 90, 85, 110, 130, 120, 125] },
  { label: 'Engagement', value: 67, formatted: '67%', change: '+5%', positive: true, icon: Heart, color: '#a855f7', sparkData: [120, 140, 130, 160, 180, 170, 175] },
]

const engagementData = [
  { section: 'Projects', engagement: 85, time: '4m 30s', color: '#ff00ff' },
  { section: 'About', engagement: 65, time: '2m 15s', color: '#00f0ff' },
  { section: 'Skills', engagement: 45, time: '1m 20s', color: '#7b2ff7' },
  { section: 'Contact', engagement: 30, time: '45s', color: '#22c55e' },
  { section: 'Experience', engagement: 55, time: '1m 45s', color: '#f97316' },
]

const insights = [
  { icon: TrendingUp, title: 'High Projects Engagement', desc: 'Visitors spend most time on your Projects section. Consider adding more case studies.', priority: 'high', action: 'Optimize' },
  { icon: AlertCircle, title: 'Quick Page Exits', desc: '45% of visitors leave within 30s. Your hero section might need work.', priority: 'high', action: 'Fix this' },
  { icon: Lightbulb, title: 'Mobile Traffic Growing', desc: 'Mobile views increased 40% this month. Ensure mobile optimization.', priority: 'medium', action: 'Review' },
  { icon: TrendingUp, title: 'LinkedIn Top Source', desc: 'LinkedIn drives 35% of quality traffic. Focus on engagement.', priority: 'low', action: 'Learn more' },
]

const recentEvents = [
  { time: '2s ago', text: 'User from New York viewed Projects', location: 'NYC' },
  { time: '15s ago', text: 'Resume downloaded from LinkedIn', location: 'SF' },
  { time: '1m ago', text: 'User from London viewed About', location: 'London' },
  { time: '3m ago', text: 'User from Singapore viewed Contact', location: 'Singapore' },
  { time: '5m ago', text: 'Portfolio viewed from Google Search', location: 'Berlin' },
]

function AnimatedCounter({ value, suffix = '' }: { value: number | string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = numValue / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setCount(numValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [numValue])

  if (typeof value === 'string' && value.includes('m')) return <span>{value}</span>
  if (typeof value === 'string' && value.includes('%')) return <span>{count}%</span>
  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('last-30-days')
  const [chartType, setChartType] = useState('area')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 w-full px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1.5 mb-6"
        >
          {['Dashboard', 'My Portfolios', 'Analytics'].map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
              <span className={`px-2.5 py-1 text-xs rounded-full ${i === 2 ? 'text-white font-medium bg-cyan-500/10 border border-cyan-400/20' : 'text-slate-400 neu-card'}`}>
                {crumb}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold gradient-text">Portfolio Analytics</h1>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">Live</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-1">John Doe Portfolio</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-44 neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a24] border-[#2a2a34] text-white">
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 neu-card rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>

            <Button size="sm" className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black font-medium">
              <Download className="w-4 h-4 mr-1.5" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Metrics Row */}
        <div className="grid grid-cols-5 gap-4 mb-10">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + idx * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="neu-card p-4 rounded-xl hover:glow-cyan transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${metric.color}20` }}>
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.12 }}
                    className={`text-xs font-semibold ${metric.positive ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {metric.change}
                  </motion.span>
                </div>

                <p className="text-2xl font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                  <AnimatedCounter value={metric.formatted} />
                </p>
                <p className="text-xs text-slate-500 mt-1">{metric.label}</p>

                {/* Mini sparkline */}
                <div className="h-8 mt-2 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.sparkData.map(v => ({ v }))}>
                      <defs>
                        <linearGradient id={`spark-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={metric.color} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={metric.color} strokeWidth={1.5} fill={`url(#spark-${idx})`} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left - Charts */}
          <div className="col-span-2 space-y-6">
            {/* Views Over Time */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Views Over Time</h3>
                <div className="flex gap-1.5">
                  {['area', 'bar'].map(type => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        chartType === type ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                {chartType === 'area' ? (
                  <AreaChart data={mockChartData}>
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
                    <XAxis dataKey="date" stroke="#a0a0b8" fontSize={12} />
                    <YAxis stroke="#a0a0b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2a2a34', color: '#fff', borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="views" stroke="#00f0ff" strokeWidth={2} fill="url(#viewsGrad)" dot={false} />
                    <Area type="monotone" dataKey="visitors" stroke="#ff00ff" strokeWidth={2} fill="transparent" dot={false} strokeDasharray="5 5" />
                  </AreaChart>
                ) : (
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
                    <XAxis dataKey="date" stroke="#a0a0b8" fontSize={12} />
                    <YAxis stroke="#a0a0b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2a2a34', color: '#fff', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="views" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="visitors" fill="#ff00ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </motion.div>

            {/* Section Engagement Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-white mb-4">Section Engagement</h3>
              <div className="space-y-3">
                {engagementData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium text-white group-hover:text-[#00f0ff] transition-colors">{item.section}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{item.time}</span>
                        <span className="text-xs font-semibold text-white">{item.engagement}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-[#12121a] rounded-full overflow-hidden border border-[#1a1a24]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.engagement}%` }}
                        transition={{ delay: 1 + idx * 0.15, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Traffic Sources */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-white mb-4">Traffic Sources</h3>
              <div className="grid grid-cols-2 gap-6 items-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={mockTrafficData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0}>
                      {mockTrafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2a2a34', color: '#fff', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {mockTrafficData.map((source, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-[#12121a] rounded-lg border border-[#1a1a24] hover:border-[#2a2a34] transition-colors cursor-pointer">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }} />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-white">{source.name}</p>
                        <p className="text-[10px] text-slate-500">{source.value} views</p>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {Math.round((source.value / mockTrafficData.reduce((a, b) => a + b.value, 0)) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Geographic Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00f0ff]" />
                Geographic Distribution
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { country: 'United States', flag: 'US', views: 450, pct: 35 },
                  { country: 'India', flag: 'IN', views: 320, pct: 25 },
                  { country: 'United Kingdom', flag: 'UK', views: 220, pct: 17 },
                  { country: 'Canada', flag: 'CA', views: 180, pct: 14 },
                  { country: 'Australia', flag: 'AU', views: 120, pct: 9 },
                  { country: 'Germany', flag: 'DE', views: 90, pct: 7 },
                ].map((loc, idx) => (
                  <div key={idx} className="p-3 bg-[#12121a] rounded-lg border border-[#1a1a24] hover:border-[#2a2a34] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{loc.flag} {loc.country}</span>
                      <span className="text-xs text-slate-400">{loc.views}</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full" style={{ width: `${loc.pct}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{loc.pct}% of total</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-5 rounded-xl sticky top-8"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-base font-bold text-white">AI Insights</h3>
                </div>
                <motion.button
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                </motion.button>
              </div>

              <div className="space-y-2">
                {insights.map((insight, idx) => {
                  const Icon = insight.icon
                  const priorityStyles = {
                    high: 'bg-red-500/10 border-red-500/20',
                    medium: 'bg-yellow-500/10 border-yellow-500/20',
                    low: 'bg-green-500/10 border-green-500/20',
                  }[insight.priority]
                  const dotColor = { high: 'bg-red-400', medium: 'bg-yellow-400', low: 'bg-green-400' }[insight.priority]

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + idx * 0.15 }}
                      className={`p-3 rounded-lg border cursor-pointer hover:glow-cyan transition-all ${priorityStyles}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full ${dotColor} mt-1.5 flex-shrink-0`} />
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-white">{insight.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{insight.desc}</p>
                          <button className="mt-1.5 text-[10px] font-medium text-[#00f0ff] hover:underline">{insight.action}</button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Real-Time */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-5 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <h3 className="text-base font-bold text-white">Right Now</h3>
              </div>

              <p className="text-lg font-bold text-white mb-3">3 visitors online</p>

              <div className="space-y-1.5 mb-4">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Active Pages</p>
                {[{ page: 'Projects', count: 2 }, { page: 'About', count: 1 }].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                    <span className="text-xs font-medium text-white">{item.page}</span>
                    <span className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded-full font-semibold">{item.count}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Recent Activity</p>
                {recentEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + idx * 0.1 }}
                    className="p-2 bg-[#12121a] rounded-lg border border-[#1a1a24]"
                  >
                    <p className="text-[10px] text-white">{event.text}</p>
                    <p className="text-[9px] text-slate-600 mt-0.5">{event.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Portfolio Health */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="neu-card p-5 rounded-xl"
            >
              <h3 className="text-base font-bold text-white mb-4">Portfolio Health</h3>

              <div className="flex flex-col items-center mb-4">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(160,160,184,0.08)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#healthGrad)" strokeWidth="8" strokeDasharray={`${(78 / 100) * 264} 264`} strokeLinecap="round" />
                    <defs>
                      <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">78</span>
                    <span className="text-[10px] text-slate-500">Score</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: 'Content Quality', value: 85 },
                  { label: 'User Engagement', value: 72 },
                  { label: 'SEO Optimization', value: 68 },
                  { label: 'Load Performance', value: 91 },
                  { label: 'Mobile Experience', value: 78 },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">{metric.label}</span>
                      <span className="text-white font-semibold">{metric.value}</span>
                    </div>
                    <div className="h-1.5 bg-[#12121a] rounded-full overflow-hidden border border-[#1a1a24]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ delay: 1.2 + idx * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black font-medium text-sm">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Improve Score
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
