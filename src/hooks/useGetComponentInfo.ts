import { useAppSelector } from '../store/hooks'

function useGetComponentInfo() {
  const components = useAppSelector(state => state.components.present)

  const { componentList, selectedId, copiedComponent } = components
  const selectedComponent = componentList.find(component => component.fe_id === selectedId)

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetComponentInfo
