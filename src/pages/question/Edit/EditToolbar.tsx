import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { changeComponentHidden, removeSelectedComponent } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { selectedId: fe_id } = useGetComponentInfo()

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id, isHidden: true }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
