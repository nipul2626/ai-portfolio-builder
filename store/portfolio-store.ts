import { create } from 'zustand'
import type { Portfolio, PortfolioState } from '@/types/portfolio'
import { portfolioService } from '@/services/api/portfolios'

interface PortfolioActions {
  fetchPortfolios: () => Promise<void>
  fetchPortfolio: (id: string) => Promise<void>
  createPortfolio: (data: Partial<Portfolio>) => Promise<Portfolio>
  updatePortfolio: (id: string, data: Partial<Portfolio>) => Promise<void>
  deletePortfolio: (id: string) => Promise<void>
  publishPortfolio: (id: string) => Promise<void>
  duplicatePortfolio: (id: string) => Promise<Portfolio>
  setCurrentPortfolio: (portfolio: Portfolio | null) => void
  clearError: () => void
}

export const usePortfolioStore = create<PortfolioState & PortfolioActions>((set, get) => ({
  // State
  portfolios: [],
  currentPortfolio: null,
  loading: false,
  error: null,

  // Actions
  fetchPortfolios: async () => {
    set({ loading: true, error: null })
    try {
      const portfolios = await portfolioService.getAll()
      set({ portfolios, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  fetchPortfolio: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const portfolio = await portfolioService.getById(id)
      set({ currentPortfolio: portfolio, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  createPortfolio: async (data: Partial<Portfolio>) => {
    set({ loading: true, error: null })
    try {
      const portfolio = await portfolioService.create(data)
      set((state) => ({
        portfolios: [...state.portfolios, portfolio],
        currentPortfolio: portfolio,
        loading: false,
      }))
      return portfolio
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  updatePortfolio: async (id: string, data: Partial<Portfolio>) => {
    set({ loading: true, error: null })
    try {
      const updated = await portfolioService.update(id, data)
      set((state) => ({
        portfolios: state.portfolios.map((p) => (p.id === id ? updated : p)),
        currentPortfolio: state.currentPortfolio?.id === id ? updated : state.currentPortfolio,
        loading: false,
      }))
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  deletePortfolio: async (id: string) => {
    set({ loading: true, error: null })
    try {
      await portfolioService.delete(id)
      set((state) => ({
        portfolios: state.portfolios.filter((p) => p.id !== id),
        currentPortfolio: state.currentPortfolio?.id === id ? null : state.currentPortfolio,
        loading: false,
      }))
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  publishPortfolio: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const published = await portfolioService.publish(id)
      set((state) => ({
        portfolios: state.portfolios.map((p) => (p.id === id ? published : p)),
        currentPortfolio: state.currentPortfolio?.id === id ? published : state.currentPortfolio,
        loading: false,
      }))
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  duplicatePortfolio: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const duplicated = await portfolioService.duplicate(id)
      set((state) => ({
        portfolios: [...state.portfolios, duplicated],
        loading: false,
      }))
      return duplicated
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  setCurrentPortfolio: (portfolio: Portfolio | null) => {
    set({ currentPortfolio: portfolio })
  },

  clearError: () => {
    set({ error: null })
  },
}))
