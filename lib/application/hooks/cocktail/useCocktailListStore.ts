import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export interface CocktailListStore {
  fetchId: string | null
  scrollPosition: number
  setScrollPosition: (posY: number) => void
  regenerateFetchId: () => void
  removeFetchId: () => void
}

const useCocktailListStore = create<CocktailListStore>()(
  devtools<CocktailListStore>(set => ({
    fetchId: uuidv4(),
    scrollPosition: 0,
    setScrollPosition: (posY: number) => set({ scrollPosition: posY }),
    regenerateFetchId: () => set({ fetchId: uuidv4() }),
    removeFetchId: () => set({ fetchId: null })
  }))
)

export default useCocktailListStore
