import { useAppSelector } from '../store/hooks'

function useGetPageInfo() {
  const pageInfo = useAppSelector(state => state.pageInfo)
  return pageInfo
}

export default useGetPageInfo
