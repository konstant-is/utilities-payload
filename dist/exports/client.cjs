"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/exports/client.ts
var client_exports = {};
__export(client_exports, {
  ArrayRowLabel: () => ArrayRowLabel
});
module.exports = __toCommonJS(client_exports);

// src/components/ArrayRowLabel.tsx
var import_utilities_ui = require("@konstant/utilities-ui");
var import_ui = require("@payloadcms/ui");
var ArrayRowLabel = (props) => {
  const { label } = useArrayRowLabel(props);
  return /* @__PURE__ */ React.createElement("div", null, label);
};
var useArrayRowLabel = (props) => {
  const { fallback, fieldName, prefix } = props;
  const { data, rowNumber } = (0, import_ui.useRowLabel)();
  const rowNr = `${(rowNumber || 0) + 1}`;
  const getLabel = () => {
    const field = (0, import_utilities_ui.getNestedProperty)(data, fieldName);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayRowLabel
});
//# sourceMappingURL=client.cjs.map