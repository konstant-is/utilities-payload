import type { Field } from 'payload'

import { createField } from '@/utils/createField.js'
import { createFieldOptions } from '@/utils/createFieldOptions.js'
import { field } from '@/utils/field.js'

import { urlField } from './urlField.js'

const linkAppearanceOptions = createFieldOptions(['button', 'cta', 'custom', 'default', 'link'])
const linkOptions = createFieldOptions(['reference', 'custom'])

export const linkField = createField<{
  relationTo: string[]
  showAppearance: boolean
}>((props) => {
  const options = field({
    type: 'row',
    fields: [
      field({
        name: 'type',
        type: 'radio',
        admin: {
          layout: 'horizontal',
          width: '50%',
        },
        defaultValue: linkOptions.values.reference,
        options: linkOptions.options,
        required: true,
      }),
      field({
        name: 'newTab',
        type: 'checkbox',
        admin: {
          style: {
            alignSelf: 'flex-end',
          },
          width: '50%',
        },
        label: 'Open in new tab',
      }),
    ],
  })

  const types: Field[] = [
    internalLinkField({
      condition: (_, siblingData) => siblingData?.type === linkOptions.values.reference,
      relationTo: props.relationTo,
    }),
    urlField({
      condition: (_, siblingData) => siblingData?.type === linkOptions.values.custom,
      label: 'Custom URL',
    }),
  ]

  const appearance = field({
    name: 'appearance',
    type: 'select',
    admin: {
      condition: () => props.showAppearance || false,
    },
    defaultValue: linkAppearanceOptions.values.default,
    label: 'Appearance',
    options: linkAppearanceOptions.options,
    required: false,
  })

  const label = field({
    name: 'label',
    type: 'text',
    label: 'Link Text',
    required: true,
  })

  const group = field({
    name: props.name || 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [options, ...types, label, appearance],
    label: props.label || 'Link',
  })

  return group
})

export const internalLinkField = createField<{
  relationTo: string[]
}>((props) =>
  field({
    name: 'reference',
    type: 'relationship',
    label: 'Document to link to',
    maxDepth: 1,
    relationTo: props.relationTo,
    required: props.required || true,
  }),
)
