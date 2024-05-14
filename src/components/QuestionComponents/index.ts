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
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置列表
const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
