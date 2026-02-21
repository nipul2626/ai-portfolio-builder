'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Upload, Sliders, LayoutGrid, List, Image as ImageIcon, ChevronDown,
  FileStack, Search, Clock, Star, MoreVertical, FolderOpen, Trash2, Archive,
  Download, Eye, BarChart3, Pencil, X, Check, Folder, Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface PortfolioDashboardClientProps {
  portfolioId: string
}

interface Portfolio {
  id: string
  name: string
  template: string
  views: number
  created: string
  updated: string
  status: 'published' | 'draft' | 'archived'
  thumbnail: string
  isFavorite: boolean
  folder?: string
}

const mockPortfolios: Portfolio[] = [
  { id: '1', name: 'Product Designer Portfolio', template: 'Modern Minimal', views: 1240, created: '2024-01-15', updated: '2024-02-10', status: 'published', thumbnail: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20', isFavorite: true, folder: 'Design' },
  { id: '2', name: 'Full Stack Developer', template: 'Tech Showcase', views: 856, created: '2024-01-20', updated: '2024-02-08', status: 'published', thumbnail: 'bg-gradient-to-br from-[#ff00ff]/20 to-pink-500/20', isFavorite: false, folder: 'Tech' },
  { id: '3', name: 'Creative Freelancer', template: 'Portfolio Pro', views: 432, created: '2024-02-01', updated: '2024-02-12', status: 'draft', thumbnail: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20', isFavorite: true },
  { id: '4', name: 'UI/UX Designer', template: 'Modern Minimal', views: 2156, created: '2023-12-10', updated: '2024-02-09', status: 'published', thumbnail: 'bg-gradient-to-br from-cyan-500/20 to-[#ff00ff]/20', isFavorite: false, folder: 'Design' },
  { id: '5', name: 'Data Scientist', template: 'Analytics Pro', views: 673, created: '2024-01-05', updated: '2024-02-07', status: 'published', thumbnail: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20', isFavorite: false, folder: 'Tech' },
  { id: '6', name: 'Marketing Manager', template: 'Business Hub', views: 1089, created: '2024-01-25', updated: '2024-02-11', status: 'draft', thumbnail: 'bg-gradient-to-br from-orange-500/20 to-red-500/20', isFavorite: false },
]

const folders = [
  { name: 'All Portfolios', count: 6, color: '#00f0ff', icon: FolderOpen },
  { name: 'Design', count: 2, color: '#ff00ff', icon: Folder },
  { name: 'Tech', count: 2, color: '#7b2ff7', icon: Folder },
  { name: 'Published', count: 4, color: '#22c55e', icon: Eye, smart: true },
  { name: 'Drafts', count: 2, color: '#f97316', icon: Pencil, smart: true },
]

type ViewMode = 'grid' | 'list' | 'gallery'
type SortOption = 'recent' | 'popular' | 'alphabetical' | 'oldest'

export default function PortfolioDashboardClient({ portfolioId }: PortfolioDashboardClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [columnsPerRow, setColumnsPerRow] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [selectedFolder, setSelectedFolder] = useState('All Portfolios')
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const filteredPortfolios = useMemo(() => {
    let filtered = mockPortfolios.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.template.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus
      const matchesFolder = selectedFolder === 'All Portfolios' ||
        (selectedFolder === 'Published' && p.status === 'published') ||
        (selectedFolder === 'Drafts' && p.status === 'draft') ||
        p.folder === selectedFolder
      return matchesSearch && matchesStatus && matchesFolder
    })

    switch (sortBy) {
      case 'popular': filtered.sort((a, b) => b.views - a.views); break
      case 'alphabetical': filtered.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'oldest': filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()); break
      default: filtered.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    }
    return filtered
  }, [searchQuery, selectedStatus, sortBy, selectedFolder])

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const gridColsClass = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }[columnsPerRow] || 'grid-cols-3'

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-[#ff00ff]/5" />
      </div>

      <div className="relative flex">
        {/* Folder Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="sticky top-0 h-screen bg-[#12121a] border-r border-white/[0.06] overflow-hidden flex-shrink-0"
            >
              <div className="p-5">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Folders</h3>
                <div className="space-y-1">
                  {folders.map((folder) => (
                    <motion.button
                      key={folder.name}
                      whileHover={{ x: 2 }}
                      onClick={() => setSelectedFolder(folder.name)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedFolder === folder.name
                          ? 'bg-cyan-500/10 text-white border border-cyan-400/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <folder.icon className="w-4 h-4" style={{ color: selectedFolder === folder.name ? folder.color : undefined }} />
                      <span className="flex-1 text-left font-medium">{folder.name}</span>
                      <span className="text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded-full">{folder.count}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Separator */}
                <div className="border-t border-white/[0.06] my-4" />

                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-cyan-400 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  New Folder
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 max-w-7xl mx-auto px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-start mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-bold gradient-text">My Portfolios</h1>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="neu-card px-3 py-1 rounded-full"
                >
                  <span className="text-sm font-semibold text-white">{mockPortfolios.length}</span>
                </motion.div>
              </div>
              <p className="text-sm text-slate-400">Manage and organize your portfolio collection</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="neu-card px-5 py-2.5 rounded-lg flex items-center gap-2 group bg-gradient-to-r from-[#00f0ff]/10 to-[#ff00ff]/10 border border-cyan-400/20 hover:glow-cyan transition-all"
              >
                <Plus className="w-4 h-4 text-cyan-400 group-hover:rotate-90 transition-transform" />
                <span className="text-sm font-medium text-white">Create New</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="neu-card px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import
              </motion.button>
            </div>
          </motion.div>

          {/* Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-xl p-3 flex items-center justify-between gap-6 sticky top-0 z-40 mb-6"
          >
            <div className="flex items-center gap-4">
              {/* View toggle */}
              <div className="neu-card p-0.5 rounded-lg flex gap-0.5">
                {[
                  { mode: 'grid' as ViewMode, icon: LayoutGrid },
                  { mode: 'list' as ViewMode, icon: List },
                  { mode: 'gallery' as ViewMode, icon: ImageIcon },
                ].map(({ mode, icon: Icon }) => (
                  <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    whileTap={{ scale: 0.9 }}
                    className={`relative p-2 rounded ${viewMode === mode ? 'text-cyan-400' : 'text-slate-500 hover:text-white'} transition-all`}
                  >
                    {viewMode === mode && (
                      <motion.div layoutId="view-mode-bg" className="absolute inset-0 bg-cyan-500/15 rounded border border-cyan-400/30" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                  </motion.button>
                ))}
              </div>

              {viewMode === 'grid' && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">Cols:</span>
                  <input type="range" min="2" max="4" value={columnsPerRow} onChange={e => setColumnsPerRow(parseInt(e.target.value))} className="w-16 h-1.5 bg-card rounded-lg cursor-pointer accent-cyan-400" />
                  <span className="text-xs font-mono text-white w-3">{columnsPerRow}</span>
                </div>
              )}

              {/* Quick filters */}
              <div className="flex gap-1.5">
                {['all', 'published', 'draft'].map(status => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedStatus === status
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-400/30'
                        : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="neu-card-inset rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm text-white placeholder-slate-500 w-32 focus:w-48 transition-all"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="neu-card px-3 py-1.5 rounded-lg text-xs text-white bg-transparent border-0"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="alphabetical">A-Z</option>
                <option value="oldest">Oldest</option>
              </select>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
              >
                <Sliders className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </motion.div>

          {/* Content */}
          {filteredPortfolios.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotateY: [0, 20, 0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <FolderOpen className="w-12 h-12 text-slate-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-1">No portfolios found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
            </motion.div>
          ) : viewMode === 'list' ? (
            <div className="space-y-2">
              {filteredPortfolios.map((portfolio, idx) => (
                <motion.div
                  key={portfolio.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Link href={`/portfolio/${portfolio.id}`}>
                    <div className="neu-card rounded-lg p-4 flex items-center gap-4 hover:glow-cyan transition-all group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(portfolio.id)}
                        onChange={e => { e.preventDefault(); toggleSelect(portfolio.id) }}
                        onClick={e => e.stopPropagation()}
                        className="w-4 h-4 accent-cyan-400 flex-shrink-0"
                      />
                      <div className={`w-16 h-12 rounded-lg ${portfolio.thumbnail} flex items-center justify-center flex-shrink-0`}>
                        <FileStack className="w-5 h-5 text-slate-500 opacity-50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#00f0ff] transition-colors truncate">{portfolio.name}</h3>
                        <p className="text-xs text-slate-500">{portfolio.template}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${portfolio.status === 'published' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
                        {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                      </span>
                      <span className="text-xs text-slate-400 w-20 text-right">{portfolio.views.toLocaleString()} views</span>
                      <span className="text-xs text-slate-500 w-24 text-right">{new Date(portfolio.updated).toLocaleDateString()}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`grid ${viewMode === 'gallery' ? 'grid-cols-2' : gridColsClass} gap-5`}>
              {filteredPortfolios.map((portfolio, idx) => {
                // Spiral animation - calculate position from center
                const cols = viewMode === 'gallery' ? 2 : columnsPerRow
                const row = Math.floor(idx / cols)
                const col = idx % cols
                const centerX = (cols - 1) / 2
                const centerY = 0
                const dx = col - centerX
                const dy = row - centerY

                return (
                  <motion.div
                    key={portfolio.id}
                    initial={{ opacity: 0, scale: 0.3, rotate: dx * 15, x: dx * 50, y: dy * 30 + 60 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                    transition={{
                      delay: 0.15 + idx * 0.06,
                      duration: 0.7,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <Link href={`/portfolio/${portfolio.id}`}>
                      <div className="neu-card rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.03] transition-transform">
                        {/* Thumbnail */}
                        <div className={`${portfolio.thumbnail} relative overflow-hidden ${viewMode === 'gallery' ? 'h-56' : 'h-40'}`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-[#ff00ff]/5 group-hover:from-cyan-500/15 group-hover:to-[#ff00ff]/15 transition-colors" />
                          <FileStack className="absolute inset-0 m-auto w-8 h-8 text-slate-500 opacity-30" />

                          {/* Status badge */}
                          <div className="absolute top-2.5 left-2.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm ${
                              portfolio.status === 'published' ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/25 text-amber-300 border border-amber-400/30'
                            }`}>
                              {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                            </span>
                          </div>

                          {portfolio.isFavorite && (
                            <div className="absolute top-2.5 right-2.5 p-1.5 bg-amber-500/20 rounded-lg backdrop-blur-sm">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            </div>
                          )}

                          {/* Hover actions */}
                          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center justify-center gap-2">
                              {[
                                { icon: Pencil, label: 'Edit' },
                                { icon: Eye, label: 'View' },
                                { icon: BarChart3, label: 'Analytics' },
                                { icon: MoreVertical, label: 'More' },
                              ].map((action) => (
                                <motion.button
                                  key={action.label}
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.85 }}
                                  onClick={e => e.preventDefault()}
                                  className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-colors"
                                  title={action.label}
                                >
                                  <action.icon className="w-4 h-4" />
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#00f0ff] transition-colors line-clamp-1">{portfolio.name}</h3>
                          </div>
                          <p className="text-xs text-slate-500 mb-3">{portfolio.template}</p>

                          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06]">
                            <span className="text-xs text-slate-400">{portfolio.views.toLocaleString()} views</span>
                            <span className="text-[10px] text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(portfolio.updated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Bulk Actions Bar */}
          <AnimatePresence>
            {selectedItems.size > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 glass rounded-xl p-3 flex items-center gap-4 z-50 shadow-2xl border border-white/10"
              >
                <span className="text-sm font-medium text-white px-2">{selectedItems.size} selected</span>
                <div className="flex gap-1.5">
                  {[
                    { icon: Eye, label: 'Publish All', color: 'text-green-400 hover:bg-green-500/10' },
                    { icon: Archive, label: 'Archive', color: 'text-amber-400 hover:bg-amber-500/10' },
                    { icon: Download, label: 'Export', color: 'text-cyan-400 hover:bg-cyan-500/10' },
                    { icon: Trash2, label: 'Delete', color: 'text-red-400 hover:bg-red-500/10' },
                  ].map(action => (
                    <button key={action.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${action.color}`}>
                      <action.icon className="w-3.5 h-3.5" />
                      {action.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setSelectedItems(new Set())} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
