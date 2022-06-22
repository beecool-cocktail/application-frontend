import { useState } from 'react'
import produce from 'immer'
import useSWR from 'swr'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import draftService from 'lib/services/draftAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from '../useConfig'

const FETCH_KEY = 'DRAFTS'

const useDrafts = () => {
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

  const toggleDeleteMode = () => {
    setBatchDeleteMode(mode => !mode)
    setSelectedIds([])
  }

  const deleteSelected = async () => {
    const token = storage.getToken()
    if (token) await draftService.deleteByIds(selectedIds, token)
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

  return {
    isBatchDeleteMode,
    selectedIds,
    drafts: resData?.data,
    error,
    loading: (!resData && !error) || configLoading,
    toggleDeleteMode,
    select,
    deleteSelected
  }
}

export default useDrafts
