import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface TokenStore {
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist<TokenStore>(
      set => ({
        token: null,
        setToken: (token: string) => set({ token }),
        removeToken: () => set({ token: null })
      }),
      {
        name: 'token-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export default useTokenStore
