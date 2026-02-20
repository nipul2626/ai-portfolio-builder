'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart3, Download, RefreshCw, TrendingUp, Users, Eye, Clock, Heart, MapPin } from 'lucide-react'
import MetricsRow from './components/metrics-row'
import AIInsightsPanel from './components/ai-insights-panel'
import RealTimePanel from './components/real-time-panel'
import PerformanceScore from './components/performance-score'
import VisitorTable from './components/visitor-table'

interface AnalyticsPageProps {
  params: {
    portfolioId: string
  }
}

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

const mockEngagementData = [
  { section: 'Projects', engagement: 85, time: '4m 30s' },
  { section: 'About', engagement: 65, time: '2m 15s' },
  { section: 'Skills', engagement: 45, time: '1m 20s' },
  { section: 'Contact', engagement: 30, time: '45s' },
]

export default function AnalyticsPage({ params }: AnalyticsPageProps) {
  const [dateRange, setDateRange] = useState('last-30-days')
  const [chartType, setChartType] = useState('line')
  const [compareEnabled, setCompareEnabled] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative z-10 w-full px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold gradient-text">Portfolio Analytics</h1>
              <p className="text-lg text-[#a0a0b8] font-outfit mt-2">John Doe Portfolio</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-white">Live</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48 neu-card-inset bg-[#12121a] border-[#1a1a24] text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a24] border-[#2a2a34] text-white">
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <label className="flex items-center gap-2 px-3 py-2 neu-card rounded-lg cursor-pointer hover:glow-cyan transition-all">
                <input
                  type="checkbox"
                  checked={compareEnabled}
                  onChange={(e) => setCompareEnabled(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium text-white">Compare</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-[#a0a0b8] hover:text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black hover:shadow-lg hover:shadow-[#00f0ff]/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <MetricsRow compareEnabled={compareEnabled} />

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-8 mt-12">
          {/* Left Column - Charts */}
          <div className="col-span-2 space-y-8">
            {/* Views Over Time Chart */}
            <div className="neu-card p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Views Over Time</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={chartType === 'line' ? 'default' : 'ghost'}
                    className={chartType === 'line' ? 'bg-[#00f0ff] text-black' : 'text-[#a0a0b8]'}
                    onClick={() => setChartType('line')}
                  >
                    Line
                  </Button>
                  <Button
                    size="sm"
                    variant={chartType === 'bar' ? 'default' : 'ghost'}
                    className={chartType === 'bar' ? 'bg-[#00f0ff] text-black' : 'text-[#a0a0b8]'}
                    onClick={() => setChartType('bar')}
                  >
                    Bar
                  </Button>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                {chartType === 'line' ? (
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a34" />
                    <XAxis stroke="#a0a0b8" />
                    <YAxis stroke="#a0a0b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2a2a34', color: '#fff' }} />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#00f0ff" strokeWidth={2} dot={false} />
                    {compareEnabled && <Line type="monotone" dataKey="visitors" stroke="#ff00ff" strokeWidth={2} strokeDasharray="5 5" dot={false} />}
                  </LineChart>
                ) : (
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a34" />
                    <XAxis stroke="#a0a0b8" />
                    <YAxis stroke="#a0a0b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2a2a34', color: '#fff' }} />
                    <Legend />
                    <Bar dataKey="views" fill="#00f0ff" />
                    {compareEnabled && <Bar dataKey="visitors" fill="#ff00ff" />}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Section Engagement Heatmap */}
            <div className="neu-card p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold text-white">Section Engagement</h3>

              <div className="space-y-2">
                {mockEngagementData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white">{item.section}</span>
                      <span className="text-[#a0a0b8]">{item.time}</span>
                    </div>
                    <div className="h-6 bg-[#12121a] rounded-lg overflow-hidden border border-[#1a1a24]">
                      <div
                        className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff]"
                        style={{ width: `${item.engagement}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="neu-card p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-bold text-white">Traffic Sources</h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockTrafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {mockTrafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2a2a34', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 gap-2">
                {mockTrafficData.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-[#12121a] rounded">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-white">{source.name}</p>
                      <p className="text-xs text-[#a0a0b8]">{source.value} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Side Panels */}
          <div className="col-span-1 space-y-6">
            {/* AI Insights */}
            <AIInsightsPanel />

            {/* Real-Time Visitors */}
            <RealTimePanel />

            {/* Performance Score */}
            <PerformanceScore />
          </div>
        </div>

        {/* Visitor Details Table */}
        <div className="mt-12">
          <VisitorTable />
        </div>

        {/* Geographic Distribution */}
        <div className="mt-12 neu-card p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Geographic Distribution</h3>

          <div className="grid grid-cols-2 gap-4">
            {[
              { country: '🇺🇸 United States', views: 450, pct: 35 },
              { country: '🇮🇳 India', views: 320, pct: 25 },
              { country: '🇬🇧 United Kingdom', views: 220, pct: 17 },
              { country: '🇨🇦 Canada', views: 180, pct: 14 },
              { country: '🇦🇺 Australia', views: 120, pct: 9 },
              { country: '🇩🇪 Germany', views: 90, pct: 7 },
            ].map((location, idx) => (
              <div key={idx} className="p-3 bg-[#12121a] rounded-lg border border-[#1a1a24]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{location.country}</span>
                  <span className="text-xs text-[#a0a0b8]">{location.views}</span>
                </div>
                <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff]"
                    style={{ width: `${location.pct}%` }}
                  />
                </div>
                <p className="text-xs text-[#a0a0b8] mt-1">{location.pct}% of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
