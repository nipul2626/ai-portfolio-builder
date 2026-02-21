import { apiClient } from './client'

export interface ResumeData {
  personal_info: {
    name: string
    email: string
    phone: string
    location?: string
    website?: string
  }
  skills: string[]
  experience: Array<{
    company: string
    role: string
    start_date: string
    end_date?: string
    description: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    url?: string
  }>
  education: Array<{
    institution: string
    degree: string
    field: string
    start_date: string
    end_date?: string
  }>
}

export const aiService = {
  async parseResume(file: File): Promise<ResumeData> {
    const formData = new FormData()
    formData.append('resume', file)

    const response = await apiClient.post('/ai/resume-parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.data.resume_data
  },

  async generatePortfolio(prompt: string): Promise<any> {
    const response = await apiClient.post('/ai/generate-portfolio', { prompt })
    return response.data.data
  },

  async improveContent(content: string, type: string): Promise<string> {
    const response = await apiClient.post('/ai/improve-content', { content, type })
    return response.data.data.improved_content
  },

  async optimizeATS(content: string): Promise<string> {
    const response = await apiClient.post('/ai/optimize-ats', { content })
    return response.data.data.optimized_content
  },

  async enhanceProject(description: string): Promise<string> {
    const response = await apiClient.post('/ai/project-enhance', { description })
    return response.data.data.enhanced_description
  },

  async getCareerAdvice(profile: any): Promise<string[]> {
    const response = await apiClient.post('/ai/career-advice', { profile })
    return response.data.data.advice
  },
}
