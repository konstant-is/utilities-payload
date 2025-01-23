import type { Field } from 'payload'

import { deepMerge } from '@konstant/utilities-ui'

export type FieldCreateType<P = unknown> = {
  condition?: (data: any, siblingData: any) => boolean
  description?: string
  fields?: Field[]
  hidden?: boolean
  hideGutter?: boolean
  label?: string
  localized?: boolean
  name?: string
  overrides?: Record<string, unknown>
  required?: boolean
} & P

type FieldCreationFunction<P = unknown> = (props: FieldCreateType<P>) => Field

export function createField<P>(fieldFn: FieldCreationFunction<P>) {
  return (props: FieldCreateType<P> = {} as FieldCreateType<P>): Field => {
    // Ensure fieldFn returns a valid Field
    const field: Field = fieldFn(props)

    const fieldOverrides = {}
    mergeProp('name', fieldOverrides, props.name)
    mergeProp('label', fieldOverrides, props.label)
    mergeProp('localized', fieldOverrides, props.localized)
    mergeProp('required', fieldOverrides, props.required)

    const adminOverrides = {}
    mergeProp('condition', adminOverrides, props.condition)
    mergeProp('description', adminOverrides, props.description)
    mergeProp('hidden', adminOverrides, props.hidden)
    mergeProp('hideGutter', adminOverrides, props.hideGutter)

    const result = {
      ...field,
      ...fieldOverrides,
      admin: {
        ...field.admin,
        ...adminOverrides,
      },
    }

    // Merge overrides with the base field
    return deepMerge(result, props.overrides || {}) as Field
  }
}

const mergeProp = (key: string, obj: any, value: any) => {
  obj[`${key}`] = value || undefined
}
