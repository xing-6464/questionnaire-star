import React from 'react'
import { Typography } from 'antd'
import { componentConfGroup } from '../../../components/QuestionComponents'

const { Title } = Typography

const ComponentLib: React.FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
