import { useKeyPress } from 'ahooks'
import { useAppDispatch } from '../store/hooks'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
} from '../store/componentsReducer'

function isActiveElementValid() {
  const activeElem = document.activeElement

  if (activeElem === document.body) return true // 光标没有 focus 到input元素

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useAppDispatch()

  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
}

export default useBindCanvasKeyPress
