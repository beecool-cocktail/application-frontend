import { useState } from 'react'
import useCornerRouter from 'lib/application/useCornerRouter'
import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import useShare from 'lib/application/ui/useShare'
import { FavoriteCocktailItem } from 'lib/domain/cocktail'
import { paths } from 'lib/configs/routes'

const useFavoriteCocktailCard = (
  cocktail: FavoriteCocktailItem,
  onRemove: (id: number) => void
) => {
  const router = useCornerRouter()
  const share = useShare()
  const confirmDialog = useConfirmDialog()
  const [moreActionMenuAnchorEl, setMoreActionMenuAnchorEl] =
    useState<HTMLButtonElement | null>(null)

  const handleClick = () => {
    router.push(paths.cocktailById(cocktail.id))
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

  const handleRemove = (e: React.MouseEvent) => {
    handleClose(e)
    confirmDialog.open({
      title: '取消收藏',
      content: '確定取消收藏此發文， 一旦取消收藏將無法復原？',
      onConfirm: () => {
        onRemove(cocktail.id)
        confirmDialog.destroy()
      },
      onCancel: () => confirmDialog.destroy()
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    handleClose(e)
    share(
      cocktail.title,
      new URL(`/cocktails/${cocktail.id}`, window.location.origin).href
    )
  }
  const moreActionMenuOpen = Boolean(moreActionMenuAnchorEl)

  return {
    moreActionMenuOpen,
    moreActionMenuAnchorEl,
    handleClick,
    handleClickMoreAction,
    handleClose,
    handleRemove,
    handleShare
  }
}

export default useFavoriteCocktailCard
