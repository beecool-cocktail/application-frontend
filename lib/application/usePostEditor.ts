import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { paths } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import usePostEditorService from 'lib/services/postEditorAdapter'
import { CocktailPostDraft, Ingredient, Step } from 'lib/domain/cocktail'
import { CocktailPostForm } from './ports'
import useSnackbar from './useSnackbar'
import useCornerRouter from './useCornerRouter'

const steps = ['step 1', 'step 2', 'step 3']

const defaultIngredients: Ingredient[] = [{ name: '', amount: '' }]
const defaultSteps: Step[] = [{ description: '' }]

const createModeDefaultValues: CocktailPostForm = {
  title: '',
  description: '',
  photos: null,
  ingredients: defaultIngredients,
  steps: defaultSteps
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
    photos: null,
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
  const [activeStep, setActiveStep] = useState<number>(0)
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    draft?.photos.map(p => p.path) || []
  )
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty }
  } = useForm<CocktailPostForm>({
    defaultValues: getDefaultValues(draft)
  })

  const goBack = () => {
    setActiveStep(prevStep => {
      if (prevStep <= 0) {
        router.back()
        return prevStep
      }
      return prevStep - 1
    })
  }

  const goNext = () => {
    setActiveStep(prevStep => {
      if (prevStep >= steps.length - 1) return prevStep
      return prevStep + 1
    })
  }

  const saveDraft = async () => {
    const token = storage.getToken()
    if (!token) return
    const values = getValues()
    if (draft) {
      await updateDraft(draft.id, values, token)
      mutate(`/cocktail-drafts/${draft.id}`)
    } else {
      await createDraft(values, token)
    }
    mutate('/cocktail-drafts')
    router.push(paths.profile)
    snackbar.success('saved!')
  }

  const handlePreviewUrlsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return setPreviewUrls([])
    let previewUrls = Array.from(e.target.files).map(file =>
      URL.createObjectURL(file)
    )
    if (previewUrls.length >= 5) {
      previewUrls = previewUrls.slice(0, 5)
    }
    setPreviewUrls(previewUrls)
  }

  const onSubmit = async (form: CocktailPostForm) => {
    const token = storage.getToken()
    if (!token) return
    if (isDraft) {
      if (draft) {
        await updateDraft(draft.id, form, token)
        await toFormal(draft.id, token)
        mutate(`/cocktails-drafts/${draft.id}`)
      } else {
        await createPost(form, token)
      }
      mutate('/cocktail-drafts')
    } else {
      if (draft) {
        await updatePost(draft.id, form, token)
        mutate('/cocktails')
        mutate(`/cocktails/${draft.id}`)
      }
    }

    router.push(paths.profile)
    snackbar.success('saved!')
  }

  const submit = handleSubmit(onSubmit)

  return {
    form: { control, isDirty, getValues },
    activeStep,
    previewUrls,
    goBack,
    goNext,
    saveDraft,
    submit,
    handlePreviewUrlsChange
  }
}

export default usePostEditor
