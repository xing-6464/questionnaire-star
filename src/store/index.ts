import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentsReducer from './componentsReducer'
import pageInfoReducer from './pageInfoReducer'

const store = configureStore({
  reducer: {
    user: userReducer,

    components: componentsReducer,

    pageInfo: pageInfoReducer,
  },
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
