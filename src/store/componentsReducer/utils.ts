import { type ComponentInfoType } from '.'

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(component => !component.isHidden)
  const index = visibleComponentList.findIndex(component => component.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 删除最后一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 不是最后一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }

  return newSelectedId
}
