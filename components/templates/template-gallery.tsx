'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Eye, Sparkles, TrendingUp, Clock, Grid3x3, LayoutGrid } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  category: string
  style: string
  isPremium: boolean
  rating: number
  downloads: number
  createdAt: Date
  tags: string[]
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Minimalist Pro',
    description: 'Clean and modern portfolio for professionals',
    thumbnail: '/placeholder.svg',
    category: 'professional',
    style: 'minimalist',
    isPremium: false,
    rating: 4.8,
    downloads: 1234,
    createdAt: new Date('2024-01-15'),
    tags: ['minimal', 'clean', 'modern'],
  },
  {
    id: '2',
    name: 'Creative Studio',
    description: 'Bold and vibrant for creative professionals',
    thumbnail: '/placeholder.svg',
    category: 'creative',
    style: 'bold',
    isPremium: true,
    rating: 4.9,
    downloads: 2341,
    createdAt: new Date('2024-02-01'),
    tags: ['creative', 'bold', 'colorful'],
  },
  {
    id: '3',
    name: 'Tech Developer',
    description: 'Perfect for software developers and engineers',
    thumbnail: '/placeholder.svg',
    category: 'developer',
    style: 'technical',
    isPremium: false,
    rating: 4.7,
    downloads: 3456,
    createdAt: new Date('2024-01-20'),
    tags: ['tech', 'code', 'developer'],
  },
  {
    id: '4',
    name: 'Designer Showcase',
    description: 'Showcase your design work beautifully',
    thumbnail: '/placeholder.svg',
    category: 'designer',
    style: 'artistic',
    isPremium: true,
    rating: 5.0,
    downloads: 987,
    createdAt: new Date('2024-02-10'),
    tags: ['design', 'portfolio', 'showcase'],
  },
]

export function TemplateGallery() {
  const [templates] = useState<Template[]>(mockTemplates)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredTemplates = templates
    .filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = category === 'all' || t.category === category
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads
      if (sortBy === 'rating') return b.rating - a.rating
      return b.createdAt.getTime() - a.createdAt.getTime()
    })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40 h-12">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-40 h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Most Popular
                </div>
              </SelectItem>
              <SelectItem value="recent">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Most Recent
                </div>
              </SelectItem>
              <SelectItem value="rating">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Highest Rated
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 ${viewMode === 'grid' ? 'bg-accent' : 'hover:bg-accent/50'}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 ${viewMode === 'list' ? 'bg-accent' : 'hover:bg-accent/50'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Template Grid */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/templates/${template.id}/customize`}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`group cursor-pointer ${
                  viewMode === 'grid'
                    ? 'rounded-xl overflow-hidden border border-border bg-card hover:border-cyan-500/50 transition-all'
                    : 'flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-cyan-500/50 transition-all'
                }`}
              >
                {/* Thumbnail */}
                <div
                  className={`relative overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-600/20 ${
                    viewMode === 'grid' ? 'aspect-video' : 'w-48 h-32 flex-shrink-0 rounded-lg'
                  }`}
                >
                  {template.isPremium && (
                    <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Premium
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                    {template.id}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 flex flex-col justify-between'}>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-cyan-500 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-accent rounded-full text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          {template.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {template.downloads.toLocaleString()}
                        </span>
                      </div>
                      <Button size="sm" className="h-8">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
