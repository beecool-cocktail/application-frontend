import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { move, update, remove } from 'ramda'
import { paths } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import usePostEditorService from 'lib/services/postEditorAdapter'
import {
  CocktailPostDraft,
  CocktailPostForm,
  CocktailPostStep1Form,
  CocktailPostStep2Form,
  Ingredient,
  Step,
  toCocktailCreateForm,
  toCocktailUpdateForm
} from 'lib/domain/cocktail'
import { CropResult, EditablePhoto } from 'lib/domain/photo'
import { getDefaultCroppedImage } from 'lib/helper/image'
import snackbarMessages from 'lib/constants/snackbarMessages'
import dialogMessages from 'lib/constants/dialogMessages'
import useSnackbar from '../ui/useSnackbar'
import useCornerRouter from '../useCornerRouter'
import useConfirmDialog from '../ui/useConfirmDialog'
import useWholePageSpinner from '../ui/useWholePageSpinner'
import useErrorHandler from '../useErrorHandler'

const totalStep = 3

const getStep1DefaultValues = (
  cocktailDraft?: CocktailPostDraft
): CocktailPostStep1Form => {
  if (cocktailDraft) {
    const defaultIngredients: Ingredient[] = [{ name: '', amount: '' }]
    const defaultSteps: Step[] = [{ description: '' }]
    return {
      title: cocktailDraft.title,
      ingredients: cocktailDraft.ingredients.length
        ? cocktailDraft.ingredients
        : defaultIngredients,
      steps: cocktailDraft.steps.length ? cocktailDraft.steps : defaultSteps
    }
  }
  return {
    title: '',
    ingredients: [{ name: '', amount: '' }],
    steps: [{ description: '' }]
  }
}

const getStep2DefaultValues = (
  targetCocktail?: CocktailPostDraft
): CocktailPostStep2Form => {
  if (targetCocktail) {
    return {
      description: targetCocktail.description,
      photos: targetCocktail.photos.map(p => ({
        id: p.id,
        originURL: p.path,
        editedURL: p.path,
        shouldUploadImageFile: false
      }))
    }
  }
  return {
    description: '',
    photos: []
  }
}

const usePostCreate = (cocktailDraft?: CocktailPostDraft) => {
  const router = useCornerRouter()
  const { createPost, createDraft, updateDraft, toFormal } =
    usePostEditorService()
  const { mutate } = useSWRConfig()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const { setLoading } = useWholePageSpinner()
  const { handleError } = useErrorHandler()
  const {
    control: step1Control,
    handleSubmit: handleStep1Submit,
    getValues: getStep1Values,
    setValue: setStep1Value,
    formState: {
      isDirty: isStep1Dirty,
      isValid: isStep1Valid,
      errors: step1Errors
    }
  } = useForm<CocktailPostStep1Form>({
    mode: 'onChange',
    defaultValues: getStep1DefaultValues(cocktailDraft)
  })
  const {
    control: step2Control,
    handleSubmit: handleStep2Submit,
    getValues: getStep2Values,
    setValue: setStep2Value,
    formState: {
      isDirty: isStep2Dirty,
      isValid: isStep2Valid,
      errors: step2Errors
    }
  } = useForm<CocktailPostStep2Form>({
    mode: 'onChange',
    defaultValues: getStep2DefaultValues(cocktailDraft)
  })
  const [activeStep, setActiveStep] = useState<number>(0)

  const isDraft = !!cocktailDraft
  const isDirty = isStep1Dirty || isStep2Dirty
  const isValid = isStep1Valid && isStep2Valid

  const isStep1DraftValid = (() => {
    if (step1Errors.title && step1Errors.title.type !== 'required') return false
    if (
      step1Errors.ingredients &&
      step1Errors.ingredients.some?.(ingredient => {
        if (!ingredient) return false
        const { name, amount } = ingredient
        return (
          (name && name.type !== 'required') ||
          (amount && amount.type !== 'required')
        )
      })
    ) {
      return false
    }
    if (
      step1Errors.steps &&
      step1Errors.steps.some?.(err => err && err.type !== 'required')
    ) {
      return false
    }
    return true
  })()
  const isStep2DraftValid = Object.values(step2Errors).every(
    error => error.type === 'required'
  )
  const isDraftValid = isStep1DraftValid && isStep2DraftValid && isDirty

  const removeStep1EmptyFields = () => {
    const values = getStep1Values()
    setStep1Value(
      'ingredients',
      values.ingredients.filter(i => i.name.length !== 0)
    )
    setStep1Value(
      'steps',
      values.steps.filter(s => s.description.length !== 0)
    )
  }

  const getValues = (): CocktailPostForm => {
    return { ...getStep1Values(), ...getStep2Values() }
  }

  const goBack = () => {
    if (activeStep === 0) {
      if (!isDirty) return router.back()
      const dialogMessage = isDraft
        ? dialogMessages.abortUpdatePostOrDraft
        : dialogMessages.abortCreatePost
      return confirmDialog.open({
        ...dialogMessage,
        onCancel: confirmDialog.destroy,
        onConfirm: () => {
          confirmDialog.destroy()
          router.back()
        }
      })
    }
    return setActiveStep(activeStep - 1)
  }

  const goNext = () => {
    setActiveStep(prevStep => {
      if (prevStep >= totalStep - 1) return prevStep
      return prevStep + 1
    })
  }

  const goPreview = () => setActiveStep(totalStep - 1)

  const handleImageToCover = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setStep2Value('photos', move(index, 0, currentPhotos))
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
        setStep2Value('photos', update(index, updated, originPhotos))
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
      setStep2Value('photos', [...originPhotos, ...photos])
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
    setStep2Value('photos', update(index, updated, currentPhotos))
  }

  const handleImageDelete = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setStep2Value('photos', remove(index, 1, currentPhotos))
  }

  const saveDraft = async () => {
    const token = storage.getToken()
    if (!token) return

    let snackbarMessage = snackbarMessages.createDraft
    setLoading(true)
    try {
      removeStep1EmptyFields()
      const values = getValues()

      if (cocktailDraft) {
        snackbarMessage = snackbarMessages.updateDraft
        const updateForm = toCocktailUpdateForm(values)
        await updateDraft(cocktailDraft.id, updateForm, token)
        await mutate(`/cocktail-drafts/${cocktailDraft.id}`)
      } else {
        snackbarMessage = snackbarMessages.createDraft
        const createForm = toCocktailCreateForm(values)
        await createDraft(createForm, token)
      }
      mutate('/cocktail-drafts')
      router.push(paths.drafts)
      snackbar.success(snackbarMessage.success)
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
    } finally {
      setLoading(false)
    }
  }

  const submitPost = async () => {
    const token = storage.getToken()
    if (!token) return

    const values = getValues()
    let snackbarMessage = snackbarMessages.createPost

    setLoading(true)
    try {
      if (cocktailDraft) {
        snackbarMessage = snackbarMessages.createPost
        const updateForm = toCocktailUpdateForm(values)
        await updateDraft(cocktailDraft.id, updateForm, token)
        await Promise.all([
          toFormal(cocktailDraft.id, token),
          mutate('/cocktail-drafts'),
          mutate('/cocktails')
        ])
      } else {
        snackbarMessage = snackbarMessages.createPost
        const createForm = toCocktailCreateForm(values)
        await createPost(createForm, token)
        mutate('/cocktails')
      }
      snackbar.success(snackbarMessage.success)
      router.replace(paths.profile)
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
    } finally {
      setLoading(false)
    }
  }

  const buttonAction = (() => {
    switch (activeStep) {
      case 0:
        return {
          label: '下一步',
          type: 'button',
          isValid: isStep1Valid,
          onClick: handleStep1Submit(() => {
            removeStep1EmptyFields()
            goNext()
          })
        }
      case 1:
        return {
          label: '預覽',
          type: 'button',
          isValid: isStep2Valid,
          onClick: handleStep2Submit(goNext)
        }
      case 2:
        return {
          label: '發布',
          type: 'submit',
          isValid,
          onClick: submitPost
        }
      default:
        throw new Error('unexpected active step')
    }
  })()

  return {
    isValid,
    isDraftValid,
    getValues,
    step1Control,
    step2Control,
    buttonAction,
    isDraft,
    totalStep,
    activeStep,
    goBack,
    goPreview,
    saveDraft,
    handleImageUpload,
    handleImageToCover,
    handleImageEdit,
    handleImageDelete
  }
}

export default usePostCreate
