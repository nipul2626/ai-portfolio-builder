'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Grid, List, ChevronRight, Star, Clock } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  created: string
  downloads: number
  rating: number
  isFavorite: boolean
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Modern Minimal',
    description: 'Clean and elegant portfolio template',
    category: 'Portfolio',
    preview: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
    created: '2024-01-15',
    downloads: 1240,
    rating: 4.8,
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Tech Showcase',
    description: 'Perfect for developers and engineers',
    category: 'Tech',
    preview: 'bg-gradient-to-br from-magenta-500/20 to-pink-500/20',
    created: '2024-01-20',
    downloads: 856,
    rating: 4.6,
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Portfolio Pro',
    description: 'Professional portfolio with advanced features',
    category: 'Portfolio',
    preview: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20',
    created: '2024-02-01',
    downloads: 432,
    rating: 4.9,
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Creative Studio',
    description: 'Bold and vibrant design for creatives',
    category: 'Creative',
    preview: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
    created: '2023-12-10',
    downloads: 2156,
    rating: 4.7,
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Business Hub',
    description: 'Corporate portfolio template',
    category: 'Business',
    preview: 'bg-gradient-to-br from-slate-500/20 to-gray-500/20',
    created: '2024-01-05',
    downloads: 673,
    rating: 4.5,
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Designer Showcase',
    description: 'Grid-based portfolio for designers',
    category: 'Design',
    preview: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    created: '2024-01-25',
    downloads: 1089,
    rating: 4.8,
    isFavorite: false,
  },
]

type ViewMode = 'grid' | 'list'

export default function TemplatesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(mockTemplates.map((t) => t.category))]

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Animated gradient mesh background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-background to-magenta-500/5 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Templates</h1>
            <p className="text-base text-muted-foreground font-light">
              Choose a template and customize it for your portfolio
            </p>
          </div>
          <button className="neu-card px-6 py-3 rounded-lg hover:scale-102 transition-transform flex items-center gap-2 group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            Create Custom
          </button>
        </div>

        {/* Control Bar */}
        <div className="glass rounded-lg p-4 flex items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="neu-card p-1 rounded-lg flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-accent/20 glow-cyan' : ''} transition-all`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className="neu-card-inset rounded-lg px-4 py-2 flex items-center gap-2 flex-1 max-w-md">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'neu-card bg-accent/20 text-accent'
                : 'neu-card hover:bg-accent/10'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'neu-card bg-accent/20 text-accent'
                  : 'neu-card hover:bg-accent/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}/customize`}>
                <div className="neu-card rounded-lg overflow-hidden hover:scale-102 transition-transform cursor-pointer group h-full flex flex-col">
                  {/* Preview */}
                  <div className={`${template.preview} h-40 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 group-hover:from-cyan-500/20 group-hover:to-magenta-500/20 transition-colors" />
                    {template.isFavorite && (
                      <div className="absolute top-2 right-2 bg-accent/20 p-2 rounded-lg">
                        <Star size={16} className="fill-accent" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-accent transition-colors mb-1">
                      {template.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{template.description}</p>

                    <div className="mt-auto pt-4 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-semibold">{template.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Downloads</span>
                        <span className="font-semibold">{template.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="font-semibold">⭐ {template.rating}</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 neu-card py-2 rounded-lg hover:glow-cyan transition-all font-medium text-sm flex items-center justify-center gap-2 group/btn">
                      Customize
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTemplates.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}/customize`}>
                <div className="neu-card rounded-lg hover:glow-cyan transition-all cursor-pointer group p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`${template.preview} w-20 h-20 rounded-lg flex-shrink-0 flex items-center justify-center`} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold group-hover:text-accent transition-colors">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Category</p>
                        <span className="font-semibold">{template.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <span className="font-semibold">⭐ {template.rating}</span>
                      </div>
                      <button className="neu-card px-4 py-2 rounded-lg hover:scale-102 transition-transform flex items-center gap-2">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
