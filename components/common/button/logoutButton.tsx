import React from 'react'
import { Button } from '@mui/material'
import useAuth from 'lib/application/useAuth'
import useUserInfo from 'lib/hooks/useUserInfo'

const LogoutButton = () => {
  const { logout } = useAuth()
  const { userInfo } = useUserInfo()

  if (!userInfo) return null
  return <Button onClick={() => logout(userInfo.user_id)}>Logout</Button>
}

export default LogoutButton
