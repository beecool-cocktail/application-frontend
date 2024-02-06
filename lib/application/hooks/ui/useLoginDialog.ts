import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { LoginState } from 'lib/domain/auth'
import useAuth from '../auth/useAuth'

export interface LoginDialogState {
  isOpen: boolean
  loginState: LoginState | null
}

export interface LoginDialogStore extends LoginDialogState {
  open: (v?: LoginState) => void
  close: () => void
}

const initialState: LoginDialogState = {
  isOpen: false,
  loginState: null
}

const useLoginDialogStore = create<LoginDialogStore>()(
  devtools(set => ({
    ...initialState,
    open: value =>
      set({
        isOpen: true,
        loginState: value ?? null
      }),
    close: () => set({ isOpen: false })
  }))
)

const useLoginDialog = () => {
  const { askUserPermission } = useAuth()
  const { isOpen, loginState, open, close } = useLoginDialogStore()
  const confirm = () => askUserPermission(loginState ?? undefined)

  return {
    isOpen,
    open,
    close,
    confirm
  }
}

export default useLoginDialog
