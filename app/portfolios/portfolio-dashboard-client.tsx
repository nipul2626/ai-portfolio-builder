'use client'

import { useState, useMemo } from 'react'
import { Plus, Upload, Sliders, LayoutGrid, List, Image as ImageIcon, ChevronDown, FileStack, Search, Filter, Clock, Star, MoreVertical, FolderOpen } from 'lucide-react'
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
    status: 'published' | 'draft'
    thumbnail: string
    isFavorite: boolean
}

const mockPortfolios: Portfolio[] = [
    {
        id: '1',
        name: 'Product Designer Portfolio',
        template: 'Modern Minimal',
        views: 1240,
        created: '2024-01-15',
        updated: '2024-02-10',
        status: 'published',
        thumbnail: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
        isFavorite: true,
    },
    {
        id: '2',
        name: 'Full Stack Developer',
        template: 'Tech Showcase',
        views: 856,
        created: '2024-01-20',
        updated: '2024-02-08',
        status: 'published',
        thumbnail: 'bg-gradient-to-br from-magenta-500/20 to-pink-500/20',
        isFavorite: false,
    },
    {
        id: '3',
        name: 'Creative Freelancer',
        template: 'Portfolio Pro',
        views: 432,
        created: '2024-02-01',
        updated: '2024-02-12',
        status: 'draft',
        thumbnail: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
        isFavorite: true,
    },
    {
        id: '4',
        name: 'UI/UX Designer',
        template: 'Modern Minimal',
        views: 2156,
        created: '2023-12-10',
        updated: '2024-02-09',
        status: 'published',
        thumbnail: 'bg-gradient-to-br from-cyan-500/20 to-magenta-500/20',
        isFavorite: false,
    },
    {
        id: '5',
        name: 'Data Scientist',
        template: 'Analytics Pro',
        views: 673,
        created: '2024-01-05',
        updated: '2024-02-07',
        status: 'published',
        thumbnail: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
        isFavorite: false,
    },
    {
        id: '6',
        name: 'Marketing Manager',
        template: 'Business Hub',
        views: 1089,
        created: '2024-01-25',
        updated: '2024-02-11',
        status: 'draft',
        thumbnail: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
        isFavorite: false,
    },
]

type ViewMode = 'grid' | 'list' | 'gallery'
type SortOption = 'recent' | 'popular' | 'alphabetical' | 'oldest'

export default function PortfolioDashboardClient({
                                                     portfolioId,
                                                 }: PortfolioDashboardClientProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const [columnsPerRow, setColumnsPerRow] = useState(3)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterOpen, setFilterOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft'>('all')
    const [sortBy, setSortBy] = useState<SortOption>('recent')
    const [density, setDensity] = useState<'comfortable' | 'compact' | 'spacious'>('comfortable')

    const filteredPortfolios = useMemo(() => {
        let filtered = mockPortfolios.filter((p) => {
            const matchesSearch =
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.template.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus
            return matchesSearch && matchesStatus
        })

        // Sort
        switch (sortBy) {
            case 'popular':
                filtered.sort((a, b) => b.views - a.views)
                break
            case 'alphabetical':
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'oldest':
                filtered.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())
                break
            case 'recent':
            default:
                filtered.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        }

        return filtered
    }, [searchQuery, selectedStatus, sortBy])

    const gridColsClass = {
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
    }[columnsPerRow] || 'grid-cols-3'

    return (
        <div className="min-h-screen bg-background">
            {/* Animated gradient mesh background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-background to-magenta-500/5 animate-pulse" />
            </div>

            <div className="relative">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-5xl font-bold gradient-text">My Portfolios</h1>
                                <div className="neu-card px-4 py-2 rounded-full">
                                    <span className="text-sm font-medium">{mockPortfolios.length} portfolios</span>
                                </div>
                            </div>
                            <p className="text-base text-muted-foreground font-light">
                                Manage and organize your portfolio collection
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="neu-card px-6 py-3 rounded-lg hover:scale-102 transition-transform flex items-center gap-2 group">
                                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                                Create New
                            </button>
                            <div className="relative group">
                                <button className="neu-card px-6 py-3 rounded-lg hover:scale-102 transition-transform flex items-center gap-2">
                                    <Upload size={20} />
                                    Import
                                    <ChevronDown size={16} />
                                </button>
                                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg neu-card p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                                    <button className="w-full text-left px-4 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                                        From File
                                    </button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                                        From URL
                                    </button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-accent/10 rounded transition-colors text-sm">
                                        From Template
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Control Bar */}
                    <div className="glass rounded-lg p-4 flex items-center justify-between gap-8 sticky top-0 z-40">
                        {/* View Controls */}
                        <div className="flex items-center gap-6">
                            <div className="neu-card p-1 rounded-lg flex gap-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
                                >
                                    <List size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('gallery')}
                                    className={`p-2 rounded ${viewMode === 'gallery' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
                                >
                                    <ImageIcon size={20} />
                                </button>
                            </div>

                            {viewMode === 'grid' && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Columns:</span>
                                    <input
                                        type="range"
                                        min="2"
                                        max="5"
                                        value={columnsPerRow}
                                        onChange={(e) => setColumnsPerRow(parseInt(e.target.value))}
                                        className="w-24 h-2 bg-card rounded-lg cursor-pointer"
                                    />
                                    <span className="text-xs font-medium w-4">{columnsPerRow}</span>
                                </div>
                            )}

                            {viewMode === 'list' && (
                                <select
                                    value={density}
                                    onChange={(e) => setDensity(e.target.value as any)}
                                    className="neu-card px-3 py-2 rounded text-sm bg-background border-0"
                                >
                                    <option value="comfortable">Comfortable</option>
                                    <option value="compact">Compact</option>
                                    <option value="spacious">Spacious</option>
                                </select>
                            )}
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-3 flex-1 max-w-md">
                            <div className="neu-card-inset rounded-lg px-4 py-2 flex items-center gap-2 flex-1">
                                <Search size={18} className="text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search portfolios..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent outline-none flex-1 text-sm"
                                />
                            </div>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="neu-card p-2 rounded-lg hover:glow-cyan transition-all"
                            >
                                <Sliders size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {filterOpen && (
                        <div className="mt-4 neu-card rounded-lg p-6 animate-slideDown">
                            <div className="grid grid-cols-3 gap-8">
                                <div>
                                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Status</h3>
                                    <div className="space-y-2">
                                        {['all', 'published', 'draft'].map((status) => (
                                            <label key={status} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value={status}
                                                    checked={selectedStatus === status}
                                                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm capitalize">{status}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Sort By</h3>
                                    <div className="space-y-2">
                                        {(['recent', 'popular', 'alphabetical', 'oldest'] as const).map((option) => (
                                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value={option}
                                                    checked={sortBy === option}
                                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm capitalize">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Info</h3>
                                    <p className="text-xs text-muted-foreground">
                                        Showing <span className="font-semibold text-foreground">{filteredPortfolios.length}</span> of{' '}
                                        <span className="font-semibold text-foreground">{mockPortfolios.length}</span> portfolios
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    <div className="mt-8">
                        {filteredPortfolios.length === 0 ? (
                            <div className="text-center py-20">
                                <FolderOpen size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                                <h3 className="text-lg font-semibold mb-2">No portfolios found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className={`grid ${gridColsClass} gap-6`}>
                                {filteredPortfolios.map((portfolio) => (
                                    <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
                                        <div className="neu-card rounded-lg overflow-hidden hover:scale-102 transition-transform cursor-pointer group h-full flex flex-col">
                                            {/* Thumbnail */}
                                            <div className={`${portfolio.thumbnail} h-40 flex items-center justify-center relative overflow-hidden`}>
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 group-hover:from-cyan-500/20 group-hover:to-magenta-500/20 transition-colors" />
                                                <FileStack size={32} className="text-muted-foreground opacity-50" />
                                                {portfolio.isFavorite && (
                                                    <div className="absolute top-2 right-2 bg-accent/20 p-2 rounded-lg">
                                                        <Star size={16} className="fill-accent" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 flex flex-col flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-sm group-hover:text-accent transition-colors line-clamp-2">
                                                        {portfolio.name}
                                                    </h3>
                                                    <button className="p-1 hover:bg-accent/10 rounded transition-colors">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>

                                                <p className="text-xs text-muted-foreground mb-3">{portfolio.template}</p>

                                                <div className="mt-auto space-y-2 pt-3 border-t border-border">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-muted-foreground">Views</span>
                                                        <span className="font-semibold">{portfolio.views.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                            <span
                                className={`text-xs px-2 py-1 rounded font-medium ${
                                    portfolio.status === 'published'
                                        ? 'bg-emerald-500/20 text-emerald-200'
                                        : 'bg-amber-500/20 text-amber-200'
                                }`}
                            >
                              {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                            </span>
                                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={12} />
                                                            {new Date(portfolio.updated).toISOString().split('T')[0]}
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : viewMode === 'list' ? (
                            <div className="space-y-2">
                                {filteredPortfolios.map((portfolio) => (
                                    <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
                                        <div
                                            className={`neu-card rounded-lg hover:glow-cyan transition-all cursor-pointer group ${
                                                density === 'comfortable' ? 'p-4' : density === 'compact' ? 'p-2' : 'p-6'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 flex items-center justify-center flex-shrink-0">
                                                        <FileStack size={20} className="text-muted-foreground" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold group-hover:text-accent transition-colors truncate">
                                                            {portfolio.name}
                                                        </h3>
                                                        <p className="text-xs text-muted-foreground">{portfolio.template}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-8 text-sm">
                                                    <div className="text-right">
                                                        <span className="font-semibold">{portfolio.views.toLocaleString()}</span>
                                                        <p className="text-xs text-muted-foreground">views</p>
                                                    </div>
                                                    <span
                                                        className={`px-3 py-1 rounded font-medium text-xs ${
                                                            portfolio.status === 'published'
                                                                ? 'bg-emerald-500/20 text-emerald-200'
                                                                : 'bg-amber-500/20 text-amber-200'
                                                        }`}
                                                    >
                            {portfolio.status.charAt(0).toUpperCase() + portfolio.status.slice(1)}
                          </span>
                                                    <span className="text-muted-foreground whitespace-nowrap">
                            {new Date(portfolio.updated).toISOString().split('T')[0]}
                          </span>
                                                    <button className="p-2 hover:bg-accent/10 rounded transition-colors">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-5 gap-4 auto-rows-max">
                                {filteredPortfolios.map((portfolio) => (
                                    <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
                                        <div className="group cursor-pointer">
                                            <div className={`${portfolio.thumbnail} aspect-video rounded-lg flex items-center justify-center overflow-hidden mb-2 group-hover:scale-102 transition-transform`}>
                                                <FileStack size={24} className="text-muted-foreground opacity-50" />
                                            </div>
                                            <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-accent transition-colors">
                                                {portfolio.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1">{portfolio.views.toLocaleString()} views</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
