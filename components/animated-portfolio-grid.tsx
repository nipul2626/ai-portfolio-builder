'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Eye, Heart, MessageSquare, Share2 } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  likes: number
  views: number
  comments: number
  demoUrl: string
  githubUrl: string
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Dashboard',
    description: 'Modern admin dashboard with real-time analytics',
    image: '/placeholder.svg',
    tags: ['React', 'TypeScript', 'Tailwind'],
    likes: 234,
    views: 1205,
    comments: 45,
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'AI Chat Application',
    description: 'Real-time messaging with AI-powered responses',
    image: '/placeholder.svg',
    tags: ['Next.js', 'AI', 'WebSocket'],
    likes: 567,
    views: 3420,
    comments: 89,
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Stunning 3D portfolio with Three.js animations',
    image: '/placeholder.svg',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    likes: 892,
    views: 4102,
    comments: 123,
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Task Management App',
    description: 'Collaborative project management tool',
    image: '/placeholder.svg',
    tags: ['Vue', 'Firebase', 'Vuetify'],
    likes: 345,
    views: 2134,
    comments: 67,
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 5,
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with smooth animations',
    image: '/placeholder.svg',
    tags: ['React', 'API', 'CSS'],
    likes: 456,
    views: 2890,
    comments: 34,
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 6,
    title: 'Social Media Platform',
    description: 'Full-stack social network with real-time features',
    image: '/placeholder.svg',
    tags: ['MERN', 'Socket.io', 'Redis'],
    likes: 1234,
    views: 5678,
    comments: 234,
    demoUrl: '#',
    githubUrl: '#'
  }
]

export function AnimatedPortfolioGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set())

  const handleLike = (id: number) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -8 }}
          onHoverStart={() => setHoveredId(project.id)}
          onHoverEnd={() => setHoveredId(null)}
          className="relative group"
        >
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            {/* Image Container */}
            <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              
              {/* Overlay on hover */}
              <AnimatePresence>
                {hoveredId === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-10 flex items-center justify-center gap-3"
                  >
                    <motion.a
                      href={project.demoUrl}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
                    >
                      <Eye className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.15 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.button
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated gradient background */}
              <motion.div
                animate={{
                  scale: hoveredId === project.id ? 1.1 : 1,
                  rotate: hoveredId === project.id ? 2 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-white mb-2 text-balance">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4 text-balance line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(project.id)}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedProjects.has(project.id)
                          ? 'fill-red-500 text-red-500'
                          : ''
                      }`}
                    />
                    <span>{project.likes + (likedProjects.has(project.id) ? 1 : 0)}</span>
                  </motion.button>

                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{project.views}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{project.comments}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Share2 className="w-4 h-4 text-slate-400 hover:text-blue-400 transition-colors" />
                </motion.button>
              </div>
            </div>

            {/* Hover glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredId === project.id ? 0.1 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 pointer-events-none"
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
