import React, { useState } from 'react'
import { noop } from 'ramda-adjunct'
import ConfirmDialog from 'components/common/dialog/confirmDialog'

export interface ApiProps {
  title: string
  content: string
  onConfirm(): void
  onCancel(): void
}

export interface ConfirmDialogState extends ApiProps {
  open: boolean
}

export interface ConfirmDialogApi {
  open(props: ApiProps): void
  destroy(): void
}

export interface ConfirmDialogContextProps {
  api: ConfirmDialogApi
  state: ConfirmDialogState
}

export const ConfirmDialogContext = React.createContext(
  {} as ConfirmDialogContextProps
)

const DEFAULT_STATE = {
  open: false,
  title: '',
  content: '',
  onConfirm: noop,
  onCancel: noop
}

const ConfirmDialogWrapper = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ConfirmDialogState>(DEFAULT_STATE)

  const api: ConfirmDialogApi = {
    open: (props: ApiProps) => {
      setState({ ...props, open: true })
    },
    destroy: () => {
      setState(DEFAULT_STATE)
    }
  }

  return (
    <ConfirmDialogContext.Provider value={{ state, api }}>
      {children}
      <ConfirmDialog
        open={state.open}
        title={state.title}
        content={state.content}
        onConfirm={state.onConfirm}
        onCancel={state.onCancel}
      />
    </ConfirmDialogContext.Provider>
  )
}

export default ConfirmDialogWrapper
