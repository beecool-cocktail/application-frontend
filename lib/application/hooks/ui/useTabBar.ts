import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TabBarStore {
  isVisible: boolean
  setVisible: (visible: boolean) => void
}

const useTabBar = create<TabBarStore>()(
  devtools<TabBarStore>(set => ({
    isVisible: false,
    setVisible: (isVisible: boolean) => set({ isVisible })
  }))
)

export default useTabBar
