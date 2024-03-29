import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { move, update, remove } from 'ramda'
import { paths } from 'lib/application/configs/routes'
import usePostEditorService from 'lib/services/postEditorAdapter'
import { CocktailPostDraft, Ingredient, Step } from 'lib/domain/cocktail'
import { toCocktailUpdateForm } from 'lib/application/utils/user'
import { CocktailPostForm } from 'lib/application/types/cocktail'
import { CropResult, EditablePhoto } from 'lib/domain/photo'
import { getDefaultCroppedImage } from 'lib/application/utils/image'
import snackbarMessages from 'lib/application/constants/snackbarMessages'
import dialogMessages from 'lib/application/constants/dialogMessages'
import useSnackbar from '../ui/useSnackbar'
import useCornerRouter from '../useCornerRouter'
import useConfirmDialog from '../ui/useConfirmDialog'
import useWholePageSpinner from '../ui/useWholePageSpinner'
import useErrorHandler from '../useErrorHandler'
import useAuth from '../auth/useAuth'

const totalStep = 2

const getDefaultValues = (
  targetCocktail: CocktailPostDraft
): CocktailPostForm => {
  const defaultIngredients: Ingredient[] = [{ name: '', amount: '' }]
  const defaultSteps: Step[] = [{ description: '' }]
  const ingredients = targetCocktail.ingredients.length
    ? targetCocktail.ingredients
    : defaultIngredients
  const steps = targetCocktail.steps.length
    ? targetCocktail.steps
    : defaultSteps
  return {
    title: targetCocktail.title,
    ingredients,
    steps,
    description: targetCocktail.description,
    photos: targetCocktail.photos.map(p => ({
      id: p.id,
      originURL: p.path,
      editedURL: p.path,
      shouldUploadImageFile: false
    }))
  }
}

const usePostEditor = (targetCocktail: CocktailPostDraft) => {
  const router = useCornerRouter()
  const { updatePost } = usePostEditorService()
  const { mutate } = useSWRConfig()
  const { token } = useAuth()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const { setLoading } = useWholePageSpinner()
  const { handleError } = useErrorHandler()
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<CocktailPostForm>({
    mode: 'onChange',
    defaultValues: getDefaultValues(targetCocktail)
  })
  const [activeStep, setActiveStep] = useState<number>(0)

  const removeEmptyFields = () => {
    const values = getValues()
    setValue(
      'ingredients',
      values.ingredients.filter(i => i.name.length !== 0)
    )
    setValue(
      'steps',
      values.steps.filter(s => s.description.length !== 0)
    )
  }

  const goBack = () => {
    if (activeStep === 0) {
      if (!isDirty) return router.back()
      return confirmDialog.open({
        ...dialogMessages.abortUpdatePostOrDraft,
        onCancel: confirmDialog.destroy,
        onConfirm: () => {
          confirmDialog.destroy()
          router.back()
        }
      })
    }
    return setActiveStep(activeStep - 1)
  }

  const goPreview = () => {
    removeEmptyFields()
    setActiveStep(totalStep - 1)
  }

  const handleImageToCover = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setValue('photos', move(index, 0, currentPhotos))
  }

  const handleImageUpload = async (index: number, urls: string[]) => {
    setLoading(true)
    try {
      const originPhotos = getValues().photos
      if (originPhotos.length > index) {
        const url = urls[0]
        const updated = {
          originURL: url,
          editedURL: await getDefaultCroppedImage(url),
          shouldUploadImageFile: true
        }
        setValue('photos', update(index, updated, originPhotos))
        return
      }

      const maxImageCount = 5
      const availableImageCount = maxImageCount - originPhotos.length

      if (urls.length > availableImageCount) {
        urls = urls.slice(0, availableImageCount)
        snackbar.warning(`最多只能上傳 ${availableImageCount} 張照片`)
      }
      const promiseObjs = urls.map(async url => ({
        originURL: url,
        editedURL: await getDefaultCroppedImage(url),
        shouldUploadImageFile: true
      }))

      const photos: EditablePhoto[] = await Promise.all(promiseObjs)
      setValue('photos', [...originPhotos, ...photos])
    } catch (error) {
      handleError(error, { snackbarMessage: '上傳照片失敗' })
    } finally {
      setLoading(false)
    }
  }

  const handleImageEdit = (index: number, cropResult: CropResult) => {
    const values = getValues()
    const currentPhotos = values.photos
    const origin = currentPhotos[index]
    const updated: EditablePhoto = {
      ...origin,
      editedURL: cropResult.croppedImage,
      shouldUploadImageFile: true,
      cropResult
    }
    setValue('photos', update(index, updated, currentPhotos))
  }

  const handleImageDelete = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setValue('photos', remove(index, 1, currentPhotos))
  }

  const submitPost = async () => {
    const values = getValues()
    if (!token) return

    const updateForm = toCocktailUpdateForm(values)

    setLoading(true)
    const snackbarMessage = snackbarMessages.updatePost
    try {
      await updatePost(targetCocktail.id, updateForm, token)
      await Promise.all([
        mutate('/cocktails'),
        mutate(`/cocktails/${targetCocktail.id}`)
      ])
      snackbar.success(snackbarMessage.success, undefined, () => {
        router.push(paths.cocktailById(id))
      })
      const id = targetCocktail.id
      router.back()
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
    } finally {
      setLoading(false)
    }
  }

  const buttonAction = {
    label: '重新發佈',
    type: 'submit',
    isValid,
    onClick: handleSubmit(submitPost)
  }

  return {
    isValid,
    getValues,
    control,
    buttonAction,
    totalStep,
    activeStep,
    goBack,
    goPreview,
    handleImageUpload,
    handleImageToCover,
    handleImageEdit,
    handleImageDelete
  }
}

export default usePostEditor
