import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { move, update, remove } from 'ramda'
import { Crop } from 'react-image-crop'
import { paths } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import usePostEditorService from 'lib/services/postEditorAdapter'
import { CocktailPostDraft, Ingredient, Step } from 'lib/domain/cocktail'
import { EditablePhoto } from 'lib/domain/photo'
import { centerAspectCrop, getCroppedImage } from 'lib/helper/image'
import snackbarMessages from 'lib/constants/snackbarMessages'
import {
  CocktailPostForm,
  CocktailPostStep1Form,
  CocktailPostStep2Form
} from './ports'
import useSnackbar from './ui/useSnackbar'
import useCornerRouter from './useCornerRouter'
import useConfirmDialog from './ui/useConfirmDialog'
import useWholePageSpinner from './ui/useWholePageSpinner'

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
  draft?: CocktailPostDraft
): CocktailPostStep1Form => {
  if (!draft)
    return { title: '', ingredients: defaultIngredients, steps: defaultSteps }
  const ingredients = draft.ingredients.length
    ? draft.ingredients
    : defaultIngredients
  const steps = draft.steps.length ? draft.steps : defaultSteps
  return {
    title: draft.title,
    ingredients,
    steps
  }
}

const getStep2DefaultValues = (
  draft?: CocktailPostDraft
): CocktailPostStep2Form => {
  if (!draft) return { description: '', photos: [] }
  return {
    description: draft.description,
    photos: draft.photos.map(p => ({
      id: p.id,
      originURL: p.path,
      editedURL: p.path
    }))
  }
}

const usePostEditor = (isDraft: boolean, draft?: CocktailPostDraft) => {
  const router = useCornerRouter()
  const { createPost, updatePost, createDraft, updateDraft, toFormal } =
    usePostEditorService()
  const { mutate } = useSWRConfig()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const confirmDialog = useConfirmDialog()
  const { setLoading } = useWholePageSpinner()
  const {
    control: step1Control,
    handleSubmit: handleStep1Submit,
    getValues: getStep1Values,
    formState: {
      isDirty: isStep1Dirty,
      isValid: isStep1Valid,
      errors: step1Errors
    }
  } = useForm<CocktailPostStep1Form>({
    mode: 'onChange',
    defaultValues: getStep1DefaultValues(draft)
  })
  const {
    control: step2Control,
    handleSubmit: handleStep2Submit,
    setValue: setStep2Value,
    getValues: getStep2Values,
    formState: {
      isDirty: isStep2Dirty,
      isValid: isStep2Valid,
      errors: step2Errors
    }
  } = useForm<CocktailPostStep2Form>({
    mode: 'onChange',
    defaultValues: getStep2DefaultValues(draft)
  })
  const [activeStep, setActiveStep] = useState<number>(0)

  const isEditPost = Boolean(draft) && !isDraft
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

  const getValues = (): CocktailPostForm => {
    return { ...getStep1Values(), ...getStep2Values() }
  }

  const goBack = () => {
    if (activeStep === 0) {
      if (!isDirty) return router.back()
      return confirmDialog.open({
        title: isEditPost ? '放棄編輯' : '放棄發文',
        content: '修改內容還沒儲存，是否要放棄編輯的內容？',
        primaryButton: 'cancel',
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
    } catch (err) {
      snackbar.error('上傳照片失敗')
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
      const values = getValues()
      if (draft) {
        snackbarMessage = snackbarMessages.updateDraft
        await updateDraft(draft.id, values, token)
        mutate(`/cocktail-drafts/${draft.id}`)
      } else {
        snackbarMessage = snackbarMessages.createDraft
        await createDraft(values, token)
      }
      mutate('/cocktail-drafts')
      router.push(paths.profile)
      snackbar.success(snackbarMessage.success)
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        snackbar.error(snackbarMessage.error)
      }
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
        if (draft) {
          snackbarMessage = snackbarMessages.updateDraft
          await updateDraft(draft.id, form, token)
          await toFormal(draft.id, token)
          mutate(`/cocktails-drafts/${draft.id}`)
        } else {
          snackbarMessage = snackbarMessages.createPost
          await createPost(form, token)
        }
        mutate('/cocktail-drafts')
      } else {
        if (draft) {
          snackbarMessage = snackbarMessages.updatePost
          await updatePost(draft.id, form, token)
          mutate('/cocktails')
          mutate(`/cocktails/${draft.id}`)
        }
      }
      snackbar.success(snackbarMessage.success)
      const id = draft?.id
      if (router.query.backToCocktailPage && id)
        router.push(paths.cocktailById(id))
      else router.push(paths.profile)
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        snackbar.error(snackbarMessage.error)
      }
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
          onClick: handleStep1Submit(goNext)
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
          label: draft ? '重新發佈' : '發布',
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
