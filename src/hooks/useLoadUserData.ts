import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { useAppDispatch } from '../store/hooks'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const dispatch = useAppDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(data) {
      const { username, nickname } = data
      // 存储到store
      dispatch(loginReducer({ username, nickname })) // 存储到store
    },
    onFinally() {
      setWaitingUserData(false) // 加载完成，关闭等待提示
    },
  })

  // 判断当前 redux store 中是否有用户信息，如果有，则不显示等待提示
  useEffect(() => {
    if (username) {
      setWaitingUserData(false) // 如果有用户信息，则不显示等待提示
      return
    }
    run() // 否则，发起请求获取用户信息
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
