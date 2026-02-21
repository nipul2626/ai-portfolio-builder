export interface Template {
  id: string
  name: string
  description: string
  category: 'developer' | 'designer' | 'researcher' | 'freelancer' | 'business' | 'creative'
  thumbnailUrl: string
  structure: TemplateStructure
  isPublic: boolean
  creatorId?: string
  usageCount: number
  createdAt: Date
}

export interface TemplateStructure {
  sections: TemplateSectionStructure[]
  defaultTheme: {
    colors: Record<string, string>
    fonts: Record<string, string>
  }
}

export interface TemplateSectionStructure {
  type: string
  name: string
  defaultContent: Record<string, any>
  customizable: string[]
}

export interface ComponentVariant {
  id: string
  name: string
  type: 'section' | 'block' | 'component' | 'decorative'
  category: string
  thumbnailUrl: string
  description: string
  structure: Record<string, any>
  animationPresets?: AnimationPreset[]
}

export interface AnimationPreset {
  id: string
  name: string
  type: 'fadeIn' | 'slideIn' | 'scaleIn' | 'rotateIn' | 'bounce' | 'elastic' | 'custom'
  keyframes: Keyframe[]
  duration: number
  easing: string
}

export interface Keyframe {
  id: string
  time: number // 0-1
  properties: {
    x?: number
    y?: number
    scale?: number
    rotation?: number
    opacity?: number
    color?: string
    [key: string]: any
  }
}
