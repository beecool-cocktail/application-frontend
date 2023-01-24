import useStore from 'lib/services/storeAdapter'

const useWholePageSpinner = () => {
  const { loading, setLoading } = useStore()
  return { loading, setLoading }
}

export default useWholePageSpinner
