import React, { useCallback } from 'react'
import { Typography } from 'antd'
import { componentConfGroup, type ComponentConfType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { useAppDispatch } from '../../../store/hooks'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }, [])

  return (
    <div className={styles.wrapper} key={type} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

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
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
