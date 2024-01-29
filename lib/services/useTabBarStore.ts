import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TabBarStore {
  isVisible: boolean
  setVisible: (visible: boolean) => void
}

const useTabBarStore = create<TabBarStore>()(
  devtools(set => ({
    isVisible: false,
    setVisible: (isVisible: boolean) => set({ isVisible })
  }))
)

export default useTabBarStore
