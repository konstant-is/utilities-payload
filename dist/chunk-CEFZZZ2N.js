import {
  createObjectKeys,
  export_deepMerge,
  toCapitalized
} from "./chunk-FPZPHT2L.js";

// src/utils/field.ts
var getBaseProperties = () => {
  return {};
};
var field = (props) => {
  const base = getBaseProperties();
  return {
    ...base,
    ...props
  };
};

// src/utils/createField.ts
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    const fieldOverrides = {};
    mergeProp("name", fieldOverrides, props.name);
    mergeProp("label", fieldOverrides, props.label);
    mergeProp("localized", fieldOverrides, props.localized);
    mergeProp("required", fieldOverrides, props.required);
    const adminOverrides = {};
    mergeProp("condition", adminOverrides, props.condition);
    mergeProp("description", adminOverrides, props.description);
    mergeProp("hidden", adminOverrides, props.hidden);
    mergeProp("hideGutter", adminOverrides, props.hideGutter);
    const result = {
      ...field2,
      ...fieldOverrides,
      admin: {
        ...field2.admin,
        ...adminOverrides
      }
    };
    return export_deepMerge(result, props.overrides || {});
  };
}
var mergeProp = (key, obj, value) => {
  obj[`${key}`] = value || void 0;
};

// src/utils/createFieldOptions.ts
var createFieldOptions = (keys) => {
  const values = createObjectKeys(keys);
  const options = keys.map((key) => ({
    label: toCapitalized(key),
    value: key
  }));
  return { options, values };
};

export {
  field,
  createField,
  createFieldOptions
};
//# sourceMappingURL=chunk-CEFZZZ2N.js.map