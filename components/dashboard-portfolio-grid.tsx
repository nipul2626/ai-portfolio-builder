'use client';

import { useState } from 'react';
import { Eye, Edit, ExternalLink, MoreVertical, Trash2, Copy, Share2 } from 'lucide-react';

interface Portfolio {
  id: string;
  name: string;
  template: string;
  views: number;
  status: 'published' | 'draft';
  lastEdited: string;
  thumbnail?: string;
}

const portfolios: Portfolio[] = [
  {
    id: '1',
    name: 'Web Design Portfolio',
    template: 'Modern Minimal',
    views: 342,
    status: 'published',
    lastEdited: '2 hours ago',
  },
  {
    id: '2',
    name: 'Full Stack Developer',
    template: 'Tech Pro',
    views: 1205,
    status: 'published',
    lastEdited: '1 day ago',
  },
  {
    id: '3',
    name: 'Product Designer',
    template: 'Creative Showcase',
    views: 0,
    status: 'draft',
    lastEdited: '3 days ago',
  },
];

function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="neu-card rounded-lg overflow-hidden group hover:scale-105 hover:shadow-2xl hover:shadow-cyan-DEFAULT/20 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-deep-card to-deep-bg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10">
          P
        </div>
        <div
          className={`absolute inset-0 bg-gradient-to-t from-deep-bg to-transparent transition-all duration-300 ${
            showActions ? 'opacity-80' : 'opacity-0'
          }`}
        />

        {/* Status badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              portfolio.status === 'published'
                ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/50'
                : 'bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/50'
            } animate-pulse`}
          >
            {portfolio.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 z-20 animate-fadeIn">
            <button className="w-12 h-12 bg-cyan-DEFAULT rounded-lg flex items-center justify-center text-deep-bg hover:scale-110 transition-transform shadow-lg">
              <Edit className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-deep-bg hover:scale-110 transition-transform shadow-lg">
              <ExternalLink className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-deep-card rounded-lg flex items-center justify-center text-foreground hover:scale-110 transition-transform shadow-lg">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg truncate">{portfolio.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{portfolio.template}</p>
        <p className="text-xs text-muted-foreground mt-2">Last edited {portfolio.lastEdited}</p>

        {/* View count */}
        <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>{portfolio.views} views</span>
        </div>

        {/* More menu */}
        <div className="relative mt-4 flex justify-end">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-deep-card rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>

          {showMenu && (
            <div className="absolute right-0 bottom-12 w-40 neu-card rounded-lg p-2 shadow-lg z-50">
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-deep-card rounded transition-colors text-sm text-foreground">
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-deep-card rounded transition-colors text-sm text-foreground">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-deep-card rounded transition-colors text-sm text-red-500">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DashboardPortfolioGrid() {
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPortfolios = portfolios.filter((p) => {
    if (filter === 'published') return p.status === 'published';
    if (filter === 'draft') return p.status === 'draft';
    return true;
  });

  return (
    <div className="mt-12">
      {/* Header with filters */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground font-heading">My Portfolios</h2>

        <div className="flex items-center gap-4">
          {/* Filter buttons */}
          <div className="flex gap-2 bg-deep-card p-1 rounded-lg">
            {['all', 'published', 'draft'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-cyan-DEFAULT text-deep-bg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex gap-2 bg-deep-card p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${
                viewMode === 'grid' ? 'bg-cyan-DEFAULT text-deep-bg' : 'text-muted-foreground'
              }`}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${
                viewMode === 'list' ? 'bg-cyan-DEFAULT text-deep-bg' : 'text-muted-foreground'
              }`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio grid */}
      {filteredPortfolios.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'}>
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No portfolios yet</h3>
          <p className="text-muted-foreground mb-6">Create your first portfolio to get started</p>
          <button className="px-6 py-3 bg-cyan-DEFAULT text-deep-bg font-semibold rounded-lg hover:scale-105 transition-transform">
            Create Portfolio
          </button>
        </div>
      )}
    </div>
  );
}
