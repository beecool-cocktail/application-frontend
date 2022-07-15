import { useState } from 'react'
import useCornerRouter from 'lib/application/useCornerRouter'
import useConfirmDialog from 'lib/application/ui/useConfirmDialog'
import { MyCocktailItem } from 'lib/domain/cocktail'
import { paths } from 'lib/configs/routes'

const useMyCocktailCard = (
  cocktail: MyCocktailItem,
  onDelete: (id: number) => void
) => {
  const router = useCornerRouter()
  const confirmDialog = useConfirmDialog()
  const [isEditMode, setEditMode] = useState(false)

  const handleClick = () => {
    router.push(paths.cocktailById(cocktail.id))
  }

  const handleClickMoreAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setEditMode(editMode => !editMode)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditMode(false)
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
    router.push(paths.editPost(cocktail.id))
  }

  return {
    isEditMode,
    handleClick,
    handleClickMoreAction,
    handleClose,
    handleDelete,
    handleEdit
  }
}

export default useMyCocktailCard
