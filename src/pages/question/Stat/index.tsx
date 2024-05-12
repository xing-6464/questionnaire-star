import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <div>
      <p>stat page</p>
      {loading ? <p>loading</p> : <p></p>}
    </div>
  )
}

export default Stat
