import { apiClient } from './client'
import type { Template, ComponentVariant } from '@/types/template'

export const templateService = {
  async getAll(): Promise<Template[]> {
    const response = await apiClient.get('/templates')
    return response.data.data
  },

  async getById(id: string): Promise<Template> {
    const response = await apiClient.get(`/templates/${id}`)
    return response.data.data
  },

  async create(data: Partial<Template>): Promise<Template> {
    const response = await apiClient.post('/templates', data)
    return response.data.data
  },

  async clone(id: string): Promise<Template> {
    const response = await apiClient.post(`/templates/${id}/clone`)
    return response.data.data
  },

  async getComponents(): Promise<ComponentVariant[]> {
    const response = await apiClient.get('/templates/components')
    return response.data.data
  },

  async getCommunityTemplates(params?: {
    sort?: 'popular' | 'recent' | 'trending'
    category?: string
  }): Promise<Template[]> {
    const response = await apiClient.get('/templates/community', { params })
    return response.data.data
  },
}
