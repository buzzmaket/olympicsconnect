import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface User {
  id: string
  email: string
  role: 'admin' | 'athlete' | 'sponsor'
  athlete_id?: string
}

interface AuthStore {
  user: User | null
  loading: boolean
  isDemoMode: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  enableDemoMode: () => void
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  isDemoMode: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  enableDemoMode: () =>
    set({
      isDemoMode: true,
      user: { id: 'demo', email: 'demo@olympic.org.il', role: 'admin' },
      loading: false,
    }),

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const meta = data.user?.user_metadata
    set({
      user: {
        id: data.user!.id,
        email: data.user!.email!,
        role: meta?.role ?? 'sponsor',
        athlete_id: meta?.athlete_id,
      },
    })
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, isDemoMode: false })
  },
}))
