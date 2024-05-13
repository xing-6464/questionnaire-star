import { FC } from 'react'
import QuestionInputConf, { type QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { type QuestionTitlePropsType } from './QuestionTitle'

// 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件的配置类型
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置列表
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
