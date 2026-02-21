export interface Portfolio {
  id: string
  userId: string
  name: string
  slug: string
  templateId: string
  status: 'draft' | 'published' | 'archived'
  visibility: 'private' | 'unlisted' | 'public'
  content: PortfolioContent
  themeConfig: ThemeConfig
  seoConfig: SeoConfig
  viewCount: number
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface PortfolioContent {
  sections: Section[]
}

export interface Section {
  id: string
  portfolioId?: string
  sectionType: 'hero' | 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'custom'
  orderIndex: number
  content: Record<string, any>
  visible: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: string
  borderRadius: string
}

export interface SeoConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export interface PortfolioState {
  portfolios: Portfolio[]
  currentPortfolio: Portfolio | null
  loading: boolean
  error: string | null
}
