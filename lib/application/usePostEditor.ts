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
import { CocktailPostForm } from './ports'
import useSnackbar from './ui/useSnackbar'
import useCornerRouter from './useCornerRouter'
import useConfirmDialog from './ui/useConfirmDialog'

const totalStep = 3

const defaultIngredients: Ingredient[] = [{ name: '', amount: '' }]
const defaultSteps: Step[] = [{ description: '' }]

const createModeDefaultValues: CocktailPostForm = {
  title: '',
  description: '',
  photos: [],
  ingredients: defaultIngredients,
  steps: defaultSteps
}

const snackbarMessages = {
  createPost: {
    success: '發布成功',
    error: '發佈失敗'
  },
  updatePost: {
    success: '發布成功',
    error: '發佈失敗'
  },
  createDraft: {
    success: '儲存成功',
    error: '儲存失敗'
  },
  updateDraft: {
    success: '儲存成功',
    error: '儲存失敗'
  }
}

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

const getDefaultValues = (draft?: CocktailPostDraft): CocktailPostForm => {
  if (!draft) return createModeDefaultValues
  const ingredients = draft.ingredients.length
    ? draft.ingredients
    : defaultIngredients
  const steps = draft.steps.length ? draft.steps : defaultSteps
  return {
    title: draft.title,
    description: draft.description,
    photos: draft.photos.map(p => ({
      id: p.id,
      originURL: p.path,
      editedURL: p.path
    })),
    ingredients,
    steps
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
  const [activeStep, setActiveStep] = useState<number>(0)
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty }
  } = useForm<CocktailPostForm>({
    defaultValues: getDefaultValues(draft)
  })

  const isEditPost = Boolean(draft) && !isDraft

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
    setValue('photos', move(index, 0, currentPhotos))
  }

  const handleImageUpload = async (index: number, urls: string[]) => {
    const originPhotos = getValues().photos
    if (originPhotos.length > index) {
      const url = urls[0]
      const updated = {
        originURL: url,
        editedURL: await getDefaultCroppedImage(url)
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
      editedURL: await getDefaultCroppedImage(url)
    }))

    const photos: EditablePhoto[] = await Promise.all(promiseObjs)
    setValue('photos', [...originPhotos, ...photos])
  }

  const handleImageEdit = (index: number, url: string) => {
    const values = getValues()
    const currentPhotos = values.photos
    const origin = currentPhotos[index]
    const updated: EditablePhoto = { ...origin, editedURL: url }
    setValue('photos', update(index, updated, currentPhotos))
  }

  const handleImageDelete = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setValue('photos', remove(index, 1, currentPhotos))
  }

  const saveDraft = async () => {
    const token = storage.getToken()
    if (!token) return

    let snackbarMessage = snackbarMessages.createDraft
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
    }
  }

  const onSubmit = async (form: CocktailPostForm) => {
    const token = storage.getToken()
    if (!token) return

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
    }
  }

  const submit = handleSubmit(onSubmit)

  return {
    form: { control, isDirty, getValues },
    isEditPost,
    totalStep,
    activeStep,
    goBack,
    goNext,
    goPreview,
    saveDraft,
    submit,
    handleImageUpload,
    handleImageToCover,
    handleImageEdit,
    handleImageDelete
  }
}

export default usePostEditor
