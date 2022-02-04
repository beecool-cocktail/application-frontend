import React from 'react'
import Config from 'lib/types/config'

const AuthContext = React.createContext<Config | null>(null)

export default AuthContext
