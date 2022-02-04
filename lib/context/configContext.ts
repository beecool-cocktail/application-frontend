import React from 'react'
import Config from 'lib/types/config'

const ConfigContext = React.createContext<Config | null>(null)

export default ConfigContext
