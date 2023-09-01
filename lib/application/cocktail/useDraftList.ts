import { useState } from 'react'
import produce from 'immer'
import useSWR from 'swr'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import draftService from 'lib/services/draftAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import snackbarMessages from 'lib/constants/snackbarMessages'
import useConfig from '../useConfig'
import useErrorHandler from '../useErrorHandler'

const FETCH_KEY = 'DRAFTS'

const useDraftList = () => {
  const { handleError } = useErrorHandler()
  const storage = useLocalStorage()
  const { config, loading: configLoading } = useConfig()
  const { data, error, mutate } = useSWR(
    () => [storage.getToken(), FETCH_KEY],
    draftService.getList
  )
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isBatchDeleteMode, setBatchDeleteMode] = useState(false)

  let resData = data
  if (resData && config) {
    resData = produce(resData, base => {
      base.data = base.data.map(d => ({
        ...d,
        title: d.title || 'Untitled',
        coverPhotoUrl: d.coverPhotoUrl
          ? join(config.staticBaseUrl, d.coverPhotoUrl)
          : FALLBACK_URL
      }))
    })
  }
  const drafts = resData?.data
  const isAllSelected = (drafts || []).length === selectedIds.length
  const canToggleBatchDeleteMode = drafts != null && drafts.length > 0

  const toggleDeleteMode = () => {
    setBatchDeleteMode(mode => !mode)
    setSelectedIds([])
  }

  const deleteSelected = async () => {
    const token = storage.getToken()
    if (token) {
      try {
        await draftService.deleteByIds(selectedIds, token)
      } catch (error) {
        handleError(error, {
          snackbarMessage: snackbarMessages.deleteDraft.error
        })
      }
    }
    setBatchDeleteMode(false)
    setSelectedIds([])
    mutate()
  }

  const select = (targetId: number, checked: boolean) => {
    if (!checked)
      return setSelectedIds(ids => ids.filter(id => id !== targetId))
    if (selectedIds.includes(targetId)) return
    setSelectedIds(ids => [...ids, targetId])
  }

  const selectAll = () => {
    if (!drafts) return
    if (isAllSelected) return setSelectedIds([])
    setSelectedIds(drafts.map(draft => draft.id))
  }

  return {
    isBatchDeleteMode,
    selectedIds,
    isAllSelected,
    drafts,
    error,
    loading: (!resData && !error) || configLoading,
    canToggleBatchDeleteMode,
    toggleDeleteMode,
    select,
    selectAll,
    deleteSelected
  }
}

export default useDraftList
