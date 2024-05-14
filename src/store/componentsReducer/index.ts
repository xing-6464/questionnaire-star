import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
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
  },
})

export const { resetComponents, changeSelectedId, addComponent } = componentSlice.actions

export default componentSlice.reducer
