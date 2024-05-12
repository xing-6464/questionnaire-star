import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionService } from '../services/question'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { resetComponents } from '../store/componentsReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useAppDispatch()

  // ajax加载
  const { run, loading, data, error } = useRequest(async (id: string) => {
    if (!id) throw new Error('没有问卷')
    const data = await getQuestionService(id)

    return data
  })

  // 根据获取的 data 设置，redux store
  useEffect(() => {
    if (!data) return

    const { title = '', componentList = [] } = data

    // 把 componentList 存入 redux store
    dispatch(resetComponents(componentList))
  }, [data])

  // 判断id变化， 执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
