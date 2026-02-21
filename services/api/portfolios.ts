import { apiClient } from './client'
import type { Portfolio } from '@/types/portfolio'

export const portfolioService = {
  async getAll(): Promise<Portfolio[]> {
    const response = await apiClient.get('/portfolios')
    return response.data.data
  },

  async getById(id: string): Promise<Portfolio> {
    const response = await apiClient.get(`/portfolios/${id}`)
    return response.data.data
  },

  async create(data: Partial<Portfolio>): Promise<Portfolio> {
    const response = await apiClient.post('/portfolios', data)
    return response.data.data
  },

  async update(id: string, data: Partial<Portfolio>): Promise<Portfolio> {
    const response = await apiClient.put(`/portfolios/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/portfolios/${id}`)
  },

  async publish(id: string): Promise<Portfolio> {
    const response = await apiClient.post(`/portfolios/${id}/publish`)
    return response.data.data
  },

  async duplicate(id: string): Promise<Portfolio> {
    const response = await apiClient.post(`/portfolios/${id}/duplicate`)
    return response.data.data
  },
}
