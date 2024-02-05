import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { CocktailListStore } from './useCocktailListStore'

const useCocktailSearchListStore = create<CocktailListStore>()(
  devtools<CocktailListStore>(set => ({
    fetchId: uuidv4(),
    scrollPosition: 0,
    setScrollPosition: (posY: number) => set({ scrollPosition: posY }),
    regenerateFetchId: () => set({ fetchId: uuidv4() }),
    removeFetchId: () => set({ fetchId: null })
  }))
)

export default useCocktailSearchListStore
