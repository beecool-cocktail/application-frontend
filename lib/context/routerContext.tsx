import React from 'react'
import Config from 'lib/types/config'

const RouterContext = React.createContext<Config | null>(null)

export default RouterContext
