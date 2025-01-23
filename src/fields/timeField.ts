import { createField } from '@/utils/createField.js'
import { field } from '@/utils/field.js'

export const timeField = createField((props) =>
  field({
    name: props.name ?? 'time',
    type: 'date',
    label: props.label ?? 'Time',
    localized: false,
    required: props?.required,

    // defaultValue: name === "open" ? "09:00" : "16:00",
    admin: {
      condition: props?.condition,
      date: {
        displayFormat: 'HH:mm',
        pickerAppearance: 'timeOnly',
        timeFormat: 'HH:mm',
      },
      description: props?.description,
    },
  }),
)
