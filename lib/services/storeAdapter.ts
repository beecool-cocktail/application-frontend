import create from 'zustand'

export const initialState = {
  searchBarInput: ''
}

export interface CornerState {
  searchBarInput: string
  setSearchBarInput: (v: string) => void
  toInitialState: () => void
}

const useStore = create<CornerState>(set => ({
  ...initialState,
  setSearchBarInput: (value: string) => set({ searchBarInput: value }),
  toInitialState: () => set(initialState)
}))

export const createStore = () => useStore

export default useStore
