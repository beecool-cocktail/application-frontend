import { CommandService } from 'lib/application/ports'
import { commandApi } from './api'

const undoCommand = async (id: string, token: string) => {
  const res = await commandApi.undoCommand(id, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

const commandService: CommandService = { undoCommand }

export default commandService
