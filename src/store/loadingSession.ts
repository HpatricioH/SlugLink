import { create } from 'zustand'

interface LoadingSessionProps {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useLoadingSession = create<LoadingSessionProps>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading })
}))
