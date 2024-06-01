import { FC } from 'react'
import QuestionInputConf, { type QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { type QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { type QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { type QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { type QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, {
  type QuestionRadioPropsType,
  type QuestionRadioStatPropsType,
} from './QuestionRadio'
import QuestionCheckboxConf, { type QuestionCheckboxPropsType } from './QuestionCheckbox'

// 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

// 各个组件的统计实现类型
type ComponentStatPropsType = QuestionRadioStatPropsType

// 组件的配置类型
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  StatComponent?: FC<ComponentStatPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
