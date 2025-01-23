import {
  export_deepMerge
} from "./chunk-5BBR5ZPB.js";

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

export {
  field,
  createField
};
//# sourceMappingURL=chunk-ZAKMJOKW.js.map