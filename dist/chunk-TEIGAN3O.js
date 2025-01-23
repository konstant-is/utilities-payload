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
    return export_deepMerge(field2, props.overrides || {});
  };
}

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
//# sourceMappingURL=chunk-TEIGAN3O.js.map