import { ElForm } from 'element-plus'
import { FormItemRule } from 'element-plus/packages/components/form/src/form.type'

export type IElForm = InstanceType<typeof ElForm>

export type IFormRule = Record<string, FormItemRule[]> // Record TS高级类型,用于定义对象键和值的类型
