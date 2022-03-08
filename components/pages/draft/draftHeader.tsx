import React from 'react'
import Header from 'components/layout/header'
import BackButton from 'components/common/button/backButton'
import DeleteButton from 'components/common/button/deleteButton'

export interface DraftHeaderProps {
  onDelete(): void
}

const DraftHeader = ({ onDelete }: DraftHeaderProps) => {
  return (
    <Header
      title="草稿夾"
      leftButton={<BackButton />}
      rightButton={<DeleteButton onClick={onDelete} />}
    />
  )
}

export default DraftHeader
