import React from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: React.FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined onPointerEnterCapture={null} onPointerLeaveCapture={null} />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined onPointerEnterCapture={null} onPointerLeaveCapture={null} />
          设置
        </span>
      ),
      children: <ComponentProp />,
    },
  ]

  return <Tabs defaultActiveKey="prop" items={tabsItems}></Tabs>
}

export default RightPanel
