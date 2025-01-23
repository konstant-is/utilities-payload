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
import { deepMerge } from "@konstant/utilities-ui";
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return deepMerge(field2, props.overrides || {});
  };
}

// src/utils/createFieldOptions.ts
import { createObjectKeys, toCapitalized } from "@konstant/utilities-ui";
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
//# sourceMappingURL=chunk-4T2HK2UC.js.map