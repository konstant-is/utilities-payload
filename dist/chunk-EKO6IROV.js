import {
  export_deepMerge
} from "./chunk-5BBR5ZPB.js";

// src/utils/createField.ts
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return export_deepMerge(field2, props.overrides || {});
  };
}

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

export {
  createField,
  field
};
//# sourceMappingURL=chunk-EKO6IROV.js.map