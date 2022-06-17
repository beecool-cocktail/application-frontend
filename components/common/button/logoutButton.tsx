import React from 'react'
import { Button } from '@mui/material'
import useAuth from 'lib/application/useAuth'
import useCurrentUser from 'lib/application/user/useCurrentUser'

const LogoutButton = () => {
  const { logout } = useAuth()
  const { user } = useCurrentUser()

  if (!user) return null
  return <Button onClick={() => logout(user.id)}>Logout</Button>
}

export default LogoutButton
