'use client'

import { useState } from 'react'
import { Search, ChevronDown, Star } from 'lucide-react'

interface ComponentItem {
  id: string
  name: string
  category: string
  thumbnail?: string
}

interface ComponentLibraryProps {
  onComponentAdd: (component: any) => void
}

const componentCategories = [
  {
    name: 'SECTIONS',
    items: [
      { id: 'hero-1', name: 'Hero Section v1', category: 'sections' },
      { id: 'hero-2', name: 'Hero Section v2', category: 'sections' },
      { id: 'about-1', name: 'About Section', category: 'sections' },
      { id: 'projects-1', name: 'Project Grid', category: 'sections' },
      { id: 'skills-1', name: 'Skills Section', category: 'sections' },
    ],
  },
  {
    name: 'BLOCKS',
    items: [
      { id: 'text-heading', name: 'Heading', category: 'blocks' },
      { id: 'text-paragraph', name: 'Paragraph', category: 'blocks' },
      { id: 'image-block', name: 'Image', category: 'blocks' },
      { id: 'button', name: 'Button', category: 'blocks' },
      { id: 'form', name: 'Contact Form', category: 'blocks' },
    ],
  },
  {
    name: 'COMPONENTS',
    items: [
      { id: 'navbar', name: 'Navigation Bar', category: 'components' },
      { id: 'card', name: 'Project Card', category: 'components' },
      { id: 'testimonial', name: 'Testimonial Card', category: 'components' },
      { id: 'timeline', name: 'Timeline', category: 'components' },
      { id: 'faq', name: 'FAQ Accordion', category: 'components' },
    ],
  },
  {
    name: 'DECORATIVE',
    items: [
      { id: 'gradient-bg', name: 'Gradient Background', category: 'decorative' },
      { id: 'divider', name: 'Divider', category: 'decorative' },
      { id: 'spacer', name: 'Spacer', category: 'decorative' },
      { id: 'glow-effect', name: 'Glow Effect', category: 'decorative' },
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

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const filteredCategories = componentCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((cat) => cat.items.length > 0)

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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <h3 className="font-semibold mb-3">Components</h3>
        <div className="neu-card-inset rounded-lg px-3 py-2 flex items-center gap-2">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
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
                  <div className="px-4 pb-4 space-y-2">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="neu-card rounded-lg p-3 hover:scale-102 transition-transform cursor-pointer group"
                        onClick={() => handleAddComponent(item)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-xs font-semibold group-hover:text-accent transition-colors">
                              {item.name}
                            </h4>
                          </div>
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
                        <div className="w-full h-16 bg-gradient-to-br from-cyan-500/10 to-magenta-500/10 rounded flex items-center justify-center text-xs text-muted-foreground group-hover:from-cyan-500/20 group-hover:to-magenta-500/20 transition-colors">
                          Preview
                        </div>
                      </div>
                    ))}
                  </div>
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
    </div>
  )
}
