import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserStateName = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateName = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (state: UserStateName, action: PayloadAction<UserStateName>) => {
      return action.payload
    },
    logoutReducer: () => INIT_STATE,
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
