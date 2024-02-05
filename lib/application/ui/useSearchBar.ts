import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface SearchBarStore {
  keyword: string
  setKeyword: (v: string) => void
}

const useSearchBar = create<SearchBarStore>()(
  devtools<SearchBarStore>(set => ({
    keyword: '',
    setKeyword: v => set({ keyword: v })
  }))
)

export default useSearchBar