import React from 'react'
import { Button } from '@mui/material'
import useAuth from 'lib/application/useAuth'
import useUser from 'lib/application/useUser'

const LogoutButton = () => {
  const { logout } = useAuth()
  const { user } = useUser()

  if (!user) return null
  return <Button onClick={() => logout(user.id)}>Logout</Button>
}

export default LogoutButton
