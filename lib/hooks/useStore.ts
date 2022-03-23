import create from 'zustand'

export interface CornerState {
  searchBarInput: string
  setSearchBarInput: (v: string) => void
}

const useStore = create<CornerState>(set => ({
  searchBarInput: '',
  setSearchBarInput: (value: string) => set({ searchBarInput: value })
}))

export default useStore
