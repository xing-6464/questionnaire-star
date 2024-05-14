import { useAppSelector } from '../store/hooks'

function useGetComponentInfo() {
  const components = useAppSelector(state => state.components)

  const { componentList, selectedId } = components
  const selectedComponent = componentList.find(component => component.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
  }
}

export default useGetComponentInfo
