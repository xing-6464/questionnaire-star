import React from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

import styles from './ComponentList.module.scss'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import classNames from 'classnames'
import type { PropsType } from './types'

function ComponentList(props: PropsType) {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentInfo()

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(component => {
          const { fe_id, props, type } = component

          const componentConf = getComponentConfByType(type)
          if (componentConf == null) return null
          const { Component } = componentConf

          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassName = styles.selected
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedComponentId,
          })

          return (
            <div
              className={wrapperClassName}
              key={fe_id}
              onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
              }}
            >
              <div className={styles.component}>
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
