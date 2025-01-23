"use client";
import {
  getNestedProperty
} from "../chunk-FPZPHT2L.js";
import "../chunk-7D4SUZUM.js";

// src/components/ArrayRowLabel.tsx
import { useRowLabel } from "@payloadcms/ui";
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ React.createElement("div", null, label);
};
var useArrayRowLabel = (props) => {
  const { fallback, fieldName, prefix } = props;
  const { data, rowNumber } = useRowLabel();
  const rowNr = `${(rowNumber || 0) + 1}`;
  const getLabel = () => {
    const field = getNestedProperty(data, fieldName);
    return field || fallback || "Item";
  };
  const getFullLabel = () => {
    const label = getLabel();
    return `${prefix || ""} ${rowNr}: ${label}`;
  };
  return {
    label: getFullLabel(),
    rowNr: `${(rowNumber || 0) + 1}`
  };
};
export {
  ArrayRowLabel
};
//# sourceMappingURL=client.js.map