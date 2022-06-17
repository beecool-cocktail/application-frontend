import { useState } from 'react'
import useCornerRouter from 'lib/application/useCornerRouter'
import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import { MyCocktailItem } from 'lib/domain/cocktail'

const useMyCocktailCard = (
  cocktail: MyCocktailItem,
  onDelete: (id: number) => void
) => {
  const router = useCornerRouter()
  const confirmDialog = useConfirmDialog()
  const [moreActionMenuAnchorEl, setMoreActionMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  const handleClick = () => {
    router.gotoCocktailDetails(cocktail.id)
  }

  const handleClickMoreAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setMoreActionMenuAnchorEl(e.currentTarget)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setMoreActionMenuAnchorEl(null)
  }

  const handleDelete = (e: React.MouseEvent) => {
    handleClose(e)
    confirmDialog.open({
      title: '刪除發文',
      content: '確定刪除此發文，一旦刪除將無法復原？',
      onConfirm: () => {
        onDelete(cocktail.id)
        confirmDialog.destroy()
      },
      onCancel: () => confirmDialog.destroy()
    })
  }

  const handleEdit = (e: React.MouseEvent) => {
    handleClose(e)
    router.gotoEditPost(cocktail.id)
  }
  const moreActionMenuOpen = Boolean(moreActionMenuAnchorEl)

  return {
    moreActionMenuOpen,
    moreActionMenuAnchorEl,
    handleClick,
    handleClickMoreAction,
    handleClose,
    handleDelete,
    handleEdit
  }
}

export default useMyCocktailCard
