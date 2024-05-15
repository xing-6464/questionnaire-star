import { useKeyPress } from 'ahooks'
import { useAppDispatch } from '../store/hooks'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
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

  // 选中上一个组件
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个组件
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  // TODO: 撤销 重做
}

export default useBindCanvasKeyPress
