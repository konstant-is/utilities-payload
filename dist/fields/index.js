import {
  createField,
  field
} from "../chunk-ZAKMJOKW.js";
import {
  toCapitalized
} from "../chunk-5BBR5ZPB.js";
import "../chunk-7D4SUZUM.js";

// src/fields/arrayRowLabelField.ts
var arrayRowLabelField = (props) => {
  return {
    clientProps: props,
    path: "@konstant/utilities-payload/client#ArrayRowLabel"
  };
};

// src/fields/timeField.ts
var timeField = createField(
  (props) => field({
    name: props.name ?? "time",
    type: "date",
    label: props.label ?? "Time",
    localized: false,
    required: props?.required,
    // defaultValue: name === "open" ? "09:00" : "16:00",
    admin: {
      condition: props?.condition,
      date: {
        displayFormat: "HH:mm",
        pickerAppearance: "timeOnly",
        timeFormat: "HH:mm"
      },
      description: props?.description
    }
  })
);

// src/fields/openingHoursField.ts
var weekdaysMap = {
  1: "Mondays",
  2: "Tuesdays",
  3: "Wednesdays",
  4: "Thursdays",
  5: "Fridays",
  6: "Saturdays",
  7: "Sundays"
};
var dayOptions = Object.keys(weekdaysMap).map((key) => ({
  label: weekdaysMap[key] || "",
  value: key
}));
var openingHoursField = () => {
  const items = field({
    name: "items",
    type: "array",
    admin: {
      components: {
        RowLabel: arrayRowLabelField({
          fieldName: "label",
          prefix: ""
        })
      }
    },
    fields: [
      field({
        name: "days",
        type: "select",
        defaultValue: [],
        hasMany: true,
        localized: false,
        options: dayOptions,
        required: true
      }),
      field({ name: "label", type: "text", localized: true, required: true }),
      ...timeFields()
    ],
    label: "Opening Hours"
  });
  const customOpeningHours = field({
    name: "custom",
    type: "array",
    fields: [
      field({ name: "label", type: "text", localized: true, required: true }),
      field({
        name: "date",
        type: "date",
        admin: {
          date: {
            displayFormat: "d MMM yyy",
            pickerAppearance: "dayOnly"
          }
        },
        label: "Date",
        localized: false,
        required: true
      }),
      ...timeFields()
    ],
    label: "Custom Opening Hours"
  });
  return field({
    name: "openingHours",
    type: "group",
    fields: [items, customOpeningHours],
    interfaceName: "OpeningHours",
    label: ""
  });
};
var timeFields = () => {
  return [
    field({
      type: "row",
      admin: {
        condition: (_, siblingData) => !siblingData.isClosed
      },
      fields: ["openingTime", "closingTime"].map(
        (name) => timeField({ name, label: toCapitalized(name) })
      )
    }),
    field({ name: "isClosed", type: "checkbox", label: "Closed whole day" }),
    field({
      name: "closedLabel",
      type: "text",
      admin: { condition: (_, siblingData) => siblingData.isClosed }
    })
  ];
};
export {
  arrayRowLabelField,
  openingHoursField,
  timeField,
  weekdaysMap
};
//# sourceMappingURL=index.js.map