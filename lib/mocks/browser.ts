import { setupWorker } from 'msw'
import { appHandlers } from './handlers'

export const worker = setupWorker(...appHandlers)
