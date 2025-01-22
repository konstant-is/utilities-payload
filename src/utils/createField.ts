import type { Field } from 'payload'

export const createField = (overrites: Field): Field => {
  const base = {}
  const merged = { ...base, ...overrites }

  return merged
}

export const field = (props: Field): Field => createField(props)
