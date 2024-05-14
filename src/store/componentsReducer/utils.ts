import { type ComponentInfoType } from '.'

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const index = componentList.findIndex(component => component.fe_id === fe_id)
  if (index < 0) return ''

  // 重新计算 selectedId
  let newSelectedId = ''
  const length = componentList.length
  if (length <= 1) {
    // 组件长度就一个
    newSelectedId = ''
  } else {
    if (index + 1 === length) {
      // 删除最后一个
      newSelectedId = componentList[index - 1].fe_id
    } else {
      // 不是最后一个
      newSelectedId = componentList[index + 1].fe_id
    }
  }

  return newSelectedId
}
