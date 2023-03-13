import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { move, update, remove } from 'ramda'
import { Crop } from 'react-image-crop'
import { paths } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import usePostEditorService from 'lib/services/postEditorAdapter'
import {
  CocktailPostDraft,
  CocktailPostForm,
  CocktailPostStep1Form,
  CocktailPostStep2Form,
  Ingredient,
  Step
} from 'lib/domain/cocktail'
import { EditablePhoto } from 'lib/domain/photo'
import { centerAspectCrop, getCroppedImage } from 'lib/helper/image'
import snackbarMessages from 'lib/constants/snackbarMessages'
import dialogMessages from 'lib/constants/dialogMessages'
import useSnackbar from '../ui/useSnackbar'
import useCornerRouter from '../useCornerRouter'
import useConfirmDialog from '../ui/useConfirmDialog'
import useWholePageSpinner from '../ui/useWholePageSpinner'
import useErrorHandler from '../useErrorHandler'

const totalStep = 3

const defaultIngredients: Ingredient[] = [{ name: '', amount: '' }]
const defaultSteps: Step[] = [{ description: '' }]

const getDefaultCroppedImage = async (src: string): Promise<string> => {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => {
      const crop = centerAspectCrop(img.width, img.height, 4 / 3)
      const pixelCrop: Crop = {
        x: Math.floor(crop.x * img.width * (1 / 100)),
        y: Math.floor(crop.y * img.height * (1 / 100)),
        width: Math.floor(crop.width * img.width * (1 / 100)),
        height: Math.floor(crop.height * img.height * (1 / 100)),
        unit: 'px'
      }
      const result = getCroppedImage(img, pixelCrop)
      resolve(result)
    }
  })
}

const getStep1DefaultValues = (
  targetCocktail?: CocktailPostDraft
): CocktailPostStep1Form => {
  if (!targetCocktail)
    return { title: '', ingredients: defaultIngredients, steps: defaultSteps }
  const ingredients = targetCocktail.ingredients.length
    ? targetCocktail.ingredients
    : defaultIngredients
  const steps = targetCocktail.steps.length
    ? targetCocktail.steps
    : defaultSteps
  return {
    title: targetCocktail.title,
    ingredients,
    steps
  }
}

const getStep2DefaultValues = (
  targetCocktail?: CocktailPostDraft
): CocktailPostStep2Form => {
  if (!targetCocktail) return { description: '', photos: [] }
  return {
    description: targetCocktail.description,
    photos: targetCocktail.photos.map(p => ({
      id: p.id,
      originURL: p.path,
      editedURL: p.path
    }))
  }
}

const usePostEditor = (
  isDraft: boolean,
  targetCocktail?: CocktailPostDraft
) => {
  const router = useCornerRouter()
  const { createPost, updatePost, createDraft, updateDraft, toFormal } =
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
    defaultValues: getStep1DefaultValues(targetCocktail)
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
    defaultValues: getStep2DefaultValues(targetCocktail)
  })
  const [activeStep, setActiveStep] = useState<number>(0)

  const isEditPost = Boolean(targetCocktail) && !isDraft
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
      return confirmDialog.open({
        ...(isEditPost
          ? dialogMessages.abortUpdatePost
          : dialogMessages.abortCreatePost),
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
          editedURL: await getDefaultCroppedImage(url)
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
        editedURL: await getDefaultCroppedImage(url)
      }))

      const photos: EditablePhoto[] = await Promise.all(promiseObjs)
      setStep2Value('photos', [...originPhotos, ...photos])
    } catch (error) {
      handleError(error, { snackbarMessage: '上傳照片失敗' })
    } finally {
      setLoading(false)
    }
  }

  const handleImageEdit = (index: number, url: string) => {
    const values = getValues()
    const currentPhotos = values.photos
    const origin = currentPhotos[index]
    const updated: EditablePhoto = { ...origin, editedURL: url }
    setStep2Value('photos', update(index, updated, currentPhotos))
  }

  const handleImageDelete = (index: number) => {
    confirmDialog.open({
      ...dialogMessages.deleteCocktailPhoto,
      onCancel: confirmDialog.destroy,
      onConfirm: () => {
        const values = getValues()
        const currentPhotos = values.photos
        setStep2Value('photos', remove(index, 1, currentPhotos))
        confirmDialog.destroy()
      }
    })
  }

  const saveDraft = async () => {
    const token = storage.getToken()
    if (!token) return

    let snackbarMessage = snackbarMessages.createDraft
    setLoading(true)
    try {
      removeStep1EmptyFields()
      const values = getValues()
      if (targetCocktail) {
        snackbarMessage = snackbarMessages.updateDraft
        await updateDraft(targetCocktail.id, values, token)
        mutate(`/cocktail-drafts/${targetCocktail.id}`)
      } else {
        snackbarMessage = snackbarMessages.createDraft
        await createDraft(values, token)
      }
      mutate('/cocktail-drafts')
      router.push(paths.profile)
      snackbar.success(snackbarMessage.success)
    } catch (error) {
      handleError(error, { snackbarMessage: snackbarMessage.error })
    } finally {
      setLoading(false)
    }
  }

  const submitPost = async () => {
    const form = getValues()
    const token = storage.getToken()
    if (!token) return

    setLoading(true)
    let snackbarMessage = snackbarMessages.createPost
    try {
      if (isDraft) {
        if (targetCocktail) {
          snackbarMessage = snackbarMessages.updateDraft
          await updateDraft(targetCocktail.id, form, token)
          await toFormal(targetCocktail.id, token)
          mutate(`/cocktails-drafts/${targetCocktail.id}`)
        } else {
          snackbarMessage = snackbarMessages.createPost
          await createPost(form, token)
        }
        mutate('/cocktail-drafts')
      } else {
        if (targetCocktail) {
          snackbarMessage = snackbarMessages.updatePost
          await updatePost(targetCocktail.id, form, token)
          mutate('/cocktails')
          mutate(`/cocktails/${targetCocktail.id}`)
        }
      }
      snackbar.success(snackbarMessage.success)
      const id = targetCocktail?.id
      if (router.query.backToCocktailPage && id)
        router.push(paths.cocktailById(id))
      else router.push(paths.profile)
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
          label: targetCocktail ? '重新發佈' : '發布',
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
    isEditPost,
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

export default usePostEditor
