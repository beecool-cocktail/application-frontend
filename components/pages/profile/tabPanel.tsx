import React from 'react'

export interface TabPanelProps {
  value: number
  index: number
  children: React.ReactElement
}

const TabPanel = ({ index, value, children }: TabPanelProps) => {
  if (index !== value) return null
  return children
}

export default TabPanel
