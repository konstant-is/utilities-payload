import {
  createField,
  createFieldOptions,
  field
} from "../chunk-CEFZZZ2N.js";
import {
  createObjectKeys,
  toCapitalized
} from "../chunk-FPZPHT2L.js";
import "../chunk-7D4SUZUM.js";

// src/fields/addressField.ts
var fields = createObjectKeys([
  "addressLine1",
  "addressLine2",
  "city",
  "location",
  "postalCode",
  "state"
]);
var addressField = createField((props) => {
  const fieldCondition = (fieldName) => {
    if (!props.hideFields?.length) {
      return true;
    }
    return props.hideFields.includes(fieldName) ? false : true;
  };
  return field({
    name: props.name ?? "address",
    type: "group",
    admin: {
      condition: props?.condition,
      description: props?.description,
      hideGutter: props?.hideGutter
    },
    fields: [
      field({
        type: "row",
        fields: [
          field({
            name: "addressLine1",
            type: "text",
            label: "Address",
            localized: false,
            required: false
          }),
          field({
            name: "addressLine2",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("addressLine2")
            },
            label: "Address extra",
            localized: false,
            required: false
          })
        ]
      }),
      field({
        type: "row",
        fields: [
          field({
            name: "state",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("state")
            },
            label: "State",
            localized: false,
            required: false
          }),
          field({
            name: "city",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("city")
            },
            label: "City",
            localized: false,
            required: false
          }),
          field({
            name: "postalCode",
            type: "text",
            admin: {
              condition: (_) => fieldCondition("postalCode")
            },
            label: "Postal Code",
            localized: false,
            required: false
          })
        ]
      }),
      field({
        name: "location",
        type: "point",
        admin: {
          condition: (_) => fieldCondition("location")
        },
        localized: false,
        required: false
      })
    ],
    interfaceName: "Address",
    label: props?.label,
    localized: false
  });
});

// src/fields/arrayRowLabelField.ts
var arrayRowLabelField = (props) => {
  return {
    clientProps: props,
    path: "@konstant/utilities-payload/client#ArrayRowLabel"
  };
};

// src/fields/timeField.ts
var timeField = createField(
  () => field({
    name: "time",
    type: "date",
    label: "Time",
    localized: false,
    // defaultValue: name === "open" ? "09:00" : "16:00",
    admin: {
      date: {
        displayFormat: "HH:mm",
        pickerAppearance: "timeOnly",
        timeFormat: "HH:mm"
      }
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

// src/fields/urlField.ts
var urlField = createField((props) => {
  const required = props?.required ?? true;
  return field({
    name: props?.name ?? "url",
    type: "text",
    admin: {
      condition: props?.condition,
      hidden: props.hidden
    },
    hasMany: false,
    label: props?.label ?? "Url",
    required,
    validate: (val) => {
      if (!required && !val) {
        return true;
      }
      try {
        new URL(val);
        return true;
      } catch (err) {
        return "Invalid URL";
      }
    }
  });
});

// src/fields/socialsField.ts
var socialsOptions = createFieldOptions([
  "facebook",
  "instagram",
  "linkedin",
  "strava",
  "twitter"
]);
var fields2 = (showOnly = []) => {
  const { options } = socialsOptions;
  return options.map((option) => {
    const show = showOnly.length === 0 || showOnly.includes(option.value);
    return urlField({
      name: option.value,
      condition: () => show,
      label: option.label,
      overrides: {
        admin: {
          width: "50%"
        }
      },
      required: false
    });
  });
};
var socialsField = createField((props) => {
  return field({
    name: props.name || "socialMedia",
    type: "group",
    fields: [
      field({
        type: "row",
        fields: fields2(props.showOnly)
      })
    ],
    label: props.label || "Social Media"
  });
});
export {
  addressField,
  arrayRowLabelField,
  openingHoursField,
  socialsField,
  timeField,
  urlField,
  weekdaysMap
};
//# sourceMappingURL=index.js.map