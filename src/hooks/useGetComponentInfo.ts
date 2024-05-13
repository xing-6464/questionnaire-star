import { useAppSelector } from '../store/hooks'

function useGetComponentInfo() {
  const components = useAppSelector(state => state.components)

  const { componentList } = components
  return {
    componentList,
  }
}

export default useGetComponentInfo
