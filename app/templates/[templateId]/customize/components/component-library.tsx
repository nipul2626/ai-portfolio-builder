'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, Star, Eye, Sparkles, Clock, HelpCircle, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ComponentItem {
  id: string
  name: string
  category: string
  thumbnail?: string
  description?: string
  variants?: number
  tags?: string[]
}

interface ComponentLibraryProps {
  onComponentAdd: (component: any) => void
}

const componentCategories = [
  {
    name: 'SECTIONS',
    items: [
      { id: 'hero-1', name: 'Hero Section v1', category: 'sections', variants: 5, description: 'Eye-catching introduction', tags: ['header', 'intro', 'landing'] },
      { id: 'hero-2', name: 'Hero Section v2', category: 'sections', variants: 5, description: 'Animated hero with 3D', tags: ['header', '3d', 'animated'] },
      { id: 'about-1', name: 'About Section', category: 'sections', variants: 4, description: 'Showcase your story', tags: ['bio', 'profile'] },
      { id: 'projects-1', name: 'Project Grid', category: 'sections', variants: 3, description: 'Display your work', tags: ['portfolio', 'gallery'] },
      { id: 'skills-1', name: 'Skills Section', category: 'sections', variants: 4, description: 'Highlight expertise', tags: ['abilities', 'tech'] },
      { id: 'contact-1', name: 'Contact Section', category: 'sections', variants: 3, description: 'Get in touch form', tags: ['email', 'form'] },
    ],
  },
  {
    name: 'BLOCKS',
    items: [
      { id: 'text-heading', name: 'Heading', category: 'blocks', description: 'Rich text heading', tags: ['title', 'h1', 'text'] },
      { id: 'text-paragraph', name: 'Paragraph', category: 'blocks', description: 'Content text', tags: ['content', 'body', 'text'] },
      { id: 'image-block', name: 'Image', category: 'blocks', description: 'Add images', tags: ['photo', 'media'] },
      { id: 'button', name: 'Button', category: 'blocks', description: 'Call to action', tags: ['cta', 'link', 'action'] },
      { id: 'form', name: 'Contact Form', category: 'blocks', description: 'Input form', tags: ['input', 'email', 'contact'] },
      { id: 'video', name: 'Video Block', category: 'blocks', description: 'Embed videos', tags: ['media', 'youtube'] },
    ],
  },
  {
    name: 'COMPONENTS',
    items: [
      { id: 'navbar', name: 'Navigation Bar', category: 'components', description: 'Site navigation', tags: ['menu', 'header', 'nav'] },
      { id: 'card', name: 'Project Card', category: 'components', description: 'Content container', tags: ['box', 'container'] },
      { id: 'testimonial', name: 'Testimonial Card', category: 'components', description: 'Client feedback', tags: ['review', 'quote'] },
      { id: 'timeline', name: 'Timeline', category: 'components', description: 'Event history', tags: ['history', 'events'] },
      { id: 'faq', name: 'FAQ Accordion', category: 'components', description: 'Q&A section', tags: ['questions', 'answers'] },
      { id: 'footer', name: 'Footer', category: 'components', description: 'Bottom section', tags: ['bottom', 'links'] },
    ],
  },
  {
    name: 'DECORATIVE',
    items: [
      { id: 'gradient-bg', name: 'Gradient Background', category: 'decorative', description: 'Colorful backgrounds', tags: ['bg', 'color'] },
      { id: 'divider', name: 'Divider', category: 'decorative', description: 'Section separator', tags: ['line', 'separator'] },
      { id: 'spacer', name: 'Spacer', category: 'decorative', description: 'Add spacing', tags: ['space', 'gap'] },
      { id: 'glow-effect', name: 'Glow Effect', category: 'decorative', description: 'Neon glow', tags: ['effect', 'neon'] },
      { id: 'particles', name: 'Particle Effect', category: 'decorative', description: 'Animated particles', tags: ['animation', 'stars'] },
    ],
  },
]

export default function ComponentLibrary({ onComponentAdd }: ComponentLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    SECTIONS: true,
    BLOCKS: true,
    COMPONENTS: true,
    DECORATIVE: false,
  })
  const [favorites, setFavorites] = useState<string[]>([])
  const [previewComponent, setPreviewComponent] = useState<ComponentItem | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('category')

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const filteredCategories = useMemo(() => {
    return componentCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const query = searchQuery.toLowerCase()
          return (
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.tags?.some((tag) => tag.includes(query))
          )
        }),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [searchQuery])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value && !recentSearches.includes(value)) {
      setRecentSearches((prev) => [value, ...prev.slice(0, 4)])
    }
  }

  const handleAddComponent = (item: ComponentItem) => {
    onComponentAdd({
      id: Date.now().toString(),
      type: item.category,
      name: item.name,
      content: `Sample ${item.name}`,
      styles: {
        padding: '24px',
        backgroundColor: '#1a1a24',
        borderRadius: '8px',
      },
    })
  }

  return (
    <div className="flex flex-col h-full" data-tutorial="component-library">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Components</h3>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <div className="neu-card-inset rounded-lg px-3 py-2 flex items-center gap-2">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
          {recentSearches.length > 0 && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 p-2">
              <div className="text-xs text-muted-foreground mb-2 px-2">Recent</div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-accent text-sm flex items-center gap-2"
                >
                  <Clock className="w-3 h-3" />
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs text-muted-foreground flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>Try: button, hero, card</span>
          </motion.div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pt-3 border-b border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-auto bg-background/50">
            <TabsTrigger value="category" className="text-xs">Category</TabsTrigger>
            <TabsTrigger value="section" className="text-xs">Section</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">Style</TabsTrigger>
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-auto">
        {filteredCategories.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">No components found</div>
        ) : (
          <div className="divide-y divide-border">
            {filteredCategories.map((category) => (
              <div key={category.name} className="border-b border-border last:border-b-0">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent/5 transition-colors text-sm font-medium"
                >
                  {category.name}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${expandedCategories[category.name] ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedCategories[category.name] && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 space-y-2"
                    >
                      {category.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onMouseEnter={() => setHoveredComponent(item.id)}
                          onMouseLeave={() => setHoveredComponent(null)}
                          className="relative"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="neu-card rounded-lg p-3 cursor-pointer group"
                            onClick={() => handleAddComponent(item)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold group-hover:text-accent transition-colors">
                                  {item.name}
                                </h4>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {item.description}
                                  </p>
                                )}
                                {item.variants && (
                                  <span className="text-xs text-cyan-400 mt-1 inline-block">
                                    {item.variants} variants
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setPreviewComponent(item)
                                  }}
                                  className="p-1 hover:bg-accent/20 rounded transition-colors"
                                >
                                  <Eye size={14} className="text-muted-foreground" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(item.id)
                                  }}
                                  className="p-1 hover:bg-accent/20 rounded transition-colors"
                                >
                                  <Star
                                    size={14}
                                    className={favorites.includes(item.id) ? 'fill-accent text-accent' : 'text-muted-foreground'}
                                  />
                                </button>
                              </div>
                            </div>
                            <div className="w-full h-16 bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 rounded flex items-center justify-center text-xs text-muted-foreground group-hover:from-cyan-500/20 group-hover:to-magenta-500/20 transition-colors">
                              <Plus className="w-5 h-5" />
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="border-t border-border p-4 flex-shrink-0">
          <h4 className="text-xs font-semibold mb-3 flex items-center gap-2">
            <Star size={14} className="text-accent" />
            FAVORITES
          </h4>
          <div className="space-y-2">
            {componentCategories
              .flatMap((cat) => cat.items)
              .filter((item) => favorites.includes(item.id))
              .map((item) => (
                <div
                  key={item.id}
                  className="neu-card rounded-lg p-2 text-xs font-medium hover:glow-cyan transition-all cursor-pointer"
                  onClick={() => handleAddComponent(item)}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <Dialog open={!!previewComponent} onOpenChange={(open) => !open && setPreviewComponent(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{previewComponent?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">{previewComponent?.description}</p>
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-sm text-muted-foreground">Component Preview</p>
              </div>
            </div>
            {previewComponent?.variants && (
              <div className="text-sm text-muted-foreground">
                Available variants: {previewComponent.variants}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (previewComponent) handleAddComponent(previewComponent)
                  setPreviewComponent(null)
                }}
                className="flex-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Canvas
              </Button>
              <Button variant="outline" onClick={() => setPreviewComponent(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
