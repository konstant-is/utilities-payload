import { createField } from '@/utils/createField.js'
import { field } from '@/utils/field.js'

export const timeField = createField(() =>
  field({
    name: 'time',
    type: 'date',
    label: 'Time',
    localized: false,

    // defaultValue: name === "open" ? "09:00" : "16:00",
    admin: {
      date: {
        displayFormat: 'HH:mm',
        pickerAppearance: 'timeOnly',
        timeFormat: 'HH:mm',
      },
    },
  }),
)
