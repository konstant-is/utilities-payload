"use strict";
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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  blockBuilder: () => blockBuilder,
  blockBuilderHelper: () => blockBuilderHelper,
  createBlock: () => createBlock,
  createBlockWithSettings: () => createBlockWithSettings,
  createCollectionConfig: () => createCollectionConfig,
  createField: () => createField,
  createFieldOptions: () => createFieldOptions,
  createGlobalConfig: () => createGlobalConfig,
  field: () => field,
  getLocale: () => getLocale,
  getPayloadContext: () => getPayloadContext,
  getReference: () => getReference,
  getRelation: () => getRelation
});
module.exports = __toCommonJS(index_exports);

// src/utils/blockBuilder.ts
var blockBuilder = (config) => {
  const helper = blockBuilderHelper({
    config
  });
  return helper;
};
var blockBuilderHelper = (props) => {
  const { config } = props;
  let blockKeys = Object.keys(config).filter((b) => {
    const blockSettings = config[b];
    if (typeof blockSettings === "boolean" && blockSettings === false) {
      return false;
    }
    return true;
  }) || [];
  const exclude = (...blocks) => {
    blockKeys = blockKeys.filter((key) => !blocks.includes(key));
    return builder;
  };
  const filter = (predicate) => {
    blockKeys = blockKeys.filter(predicate);
  };
  const only = (...blocks) => {
    blockKeys = blockKeys.filter((key) => blocks.includes(key));
    return builder;
  };
  const build = (params) => {
    const blocks = blockKeys.map((key) => {
      const block = config[key];
      if (!block) {
        console.error(`Block ${key} not found in blockMap`);
        return null;
      }
      return block(params);
    });
    return blocks.filter((b) => b !== null);
  };
  const builder = {
    build,
    exclude,
    filter,
    only
  };
  return builder;
};

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

// src/utils/createBlock.ts
var createBlock = (block) => {
  const fallbackInterfaceName = () => block.slug.includes("Block") ? block.slug : `${block.slug}Block`;
  return {
    ...block,
    interfaceName: block?.interfaceName || fallbackInterfaceName()
  };
};
var createBlockWithSettings = (fn) => {
  return (props) => {
    const result = fn(props);
    return createBlock({
      ...result,
      fields: [
        field({
          type: "tabs",
          tabs: [
            { fields: result.fields, label: "Content" },
            {
              name: "settings",
              fields: [
                field({
                  name: "className",
                  type: "text",
                  admin: {
                    description: "Adds custom classes to the block"
                  },
                  hasMany: true,
                  label: "Class Name"
                }),
                field({
                  name: "id",
                  type: "text",
                  admin: {
                    description: "Add custom ID to the block"
                  },
                  label: "ID",
                  required: false
                })
              ],
              label: "Settings"
            }
          ]
        })
      ]
    });
  };
};

// src/utils/createCollectionConfig.ts
var createCollectionConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};

// src/utils/createField.ts
var import_utilities_ui = require("@konstant/utilities-ui");
function createField(fieldFn) {
  return (props = {}) => {
    const field2 = fieldFn(props);
    return (0, import_utilities_ui.deepMerge)(field2, props.overrides || {});
  };
}

// src/utils/createFieldOptions.ts
var import_utilities_ui2 = require("@konstant/utilities-ui");
var createFieldOptions = (keys) => {
  const values = (0, import_utilities_ui2.createObjectKeys)(keys);
  const options = keys.map((key) => ({
    label: (0, import_utilities_ui2.toCapitalized)(key),
    value: key
  }));
  return { options, values };
};

// src/utils/createGlobalConfig.ts
var createGlobalConfig = (config) => {
  return {
    access: {
      read: () => true,
      ...config.access
    },
    ...config
  };
};

// src/utils/getLocale.ts
var isLocale = (locale, localeCodes) => {
  if (!locale) {
    return false;
  }
  return localeCodes.includes(locale);
};
var getLocale = (config, locale) => {
  const { localization } = config;
  if (!localization) {
    throw new Error(`Localization is not supported by Payload`);
  }
  const { defaultLocale, localeCodes } = localization;
  if (isLocale(locale, localeCodes)) {
    return locale;
  }
  return defaultLocale;
};

// src/utils/getPayloadContext.ts
var import_headers = require("next/headers.js");
var import_payload = require("payload");
var getPayloadContext = async (config, params) => {
  const { isEnabled: draft } = await (0, import_headers.draftMode)();
  const payload = await (0, import_payload.getPayload)({ config });
  const processedLocale = getLocale(payload.config, params.locale);
  const query = {
    draft,
    locale: processedLocale,
    overrideAccess: draft
  };
  return { draft, locale: processedLocale, payload, query };
};

// src/utils/getReference.ts
function getReference(value) {
  const isResolved = typeof value !== "string";
  return isResolved ? value : null;
}

// src/utils/getRelation.ts
var getRelation = (props) => {
  const { relationTo, value } = props;
  const getValue = () => getReference(value);
  const fetch = async (query) => {
    return await query({
      id: value,
      collection: relationTo
    });
  };
  const getOrFetchValue = async (query) => {
    const resolvedValue = getValue();
    if (resolvedValue !== null) {
      return resolvedValue;
    }
    const result = fetch(query);
    return result;
  };
  return {
    getOrFetchValue,
    getValue,
    relationTo
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blockBuilder,
  blockBuilderHelper,
  createBlock,
  createBlockWithSettings,
  createCollectionConfig,
  createField,
  createFieldOptions,
  createGlobalConfig,
  field,
  getLocale,
  getPayloadContext,
  getReference,
  getRelation
});
//# sourceMappingURL=index.cjs.map