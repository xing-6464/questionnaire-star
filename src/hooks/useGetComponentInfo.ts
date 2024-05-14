import { useAppSelector } from '../store/hooks'

function useGetComponentInfo() {
  const components = useAppSelector(state => state.components)

  const { componentList, selectedId } = components
  return {
    componentList,
    selectedId,
  }
}

export default useGetComponentInfo
