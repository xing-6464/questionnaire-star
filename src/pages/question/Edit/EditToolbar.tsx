import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { removeSelectedComponent } from '../../../store/componentsReducer'

const EditToolbar: React.FC = () => {
  const dispatch = useAppDispatch()

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
