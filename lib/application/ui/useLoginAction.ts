import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface LoginActionStore {
  collectAfterLogin: boolean
  setCollectAfterLogin: (v: boolean) => void
}

const useLoginAction = create<LoginActionStore>()(
  devtools(set => ({
    collectAfterLogin: false,
    setCollectAfterLogin: value => set({ collectAfterLogin: value })
  }))
)

export const createStore = () => useLoginAction

export default useLoginAction
