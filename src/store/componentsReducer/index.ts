import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
}

export const componentSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload
    },
    // 修改 selectedId
    changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    // 新增组件
    addComponent: (state: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const { selectedId, componentList } = state
      const newComponent = action.payload

      const index = componentList.findIndex(c => c.fe_id === selectedId)
      if (index < 0) {
        state.componentList.push(newComponent)
      } else {
        state.componentList.splice(index + 1, 0, newComponent)
      }

      state.selectedId = newComponent.fe_id
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; props: ComponentPropsType }>
    ) => {
      const { fe_id, props } = action.payload
      // 找到当前修改组件
      const curComp = state.componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...props,
        }
      }
    },
    // 删除选中组件
    removeSelectedComponent: (state: ComponentStateType) => {
      const { componentList, selectedId: removedId } = state
      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList)
      state.selectedId = newSelectedId

      const index = componentList.findIndex(c => c.fe_id === removedId)
      state.componentList.splice(index, 1)
    },
    // 隐藏/显示 组件
    changeComponentHidden: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload

      // 重新计算 selectedId
      const newSelectedId = getNextSelectedId(fe_id, componentList)
      state.selectedId = newSelectedId

      const curComp = componentList.find(c => c.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
} = componentSlice.actions

export default componentSlice.reducer
