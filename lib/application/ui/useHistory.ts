import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface HistoryStore {
  history: string[]
  setHistory: (v: string[]) => void
}

const useHistory = create<HistoryStore>()(
  devtools<HistoryStore>(set => ({
    history: [],
    setHistory: value => set({ history: value })
  }))
)

export const createStore = () => useHistory

export default useHistory
