import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface WholePageSpinnerStore {
  loading: boolean
  setLoading: (v: boolean) => void
}

const useWholePageSpinner = create<WholePageSpinnerStore>()(
  devtools<WholePageSpinnerStore>(set => ({
    loading: false,
    setLoading: value => set({ loading: value })
  }))
)

export default useWholePageSpinner
