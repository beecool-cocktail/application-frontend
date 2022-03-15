import { setupServer } from 'msw/node'
import { appHandlers } from './handlers'

export const server = setupServer(...appHandlers)
