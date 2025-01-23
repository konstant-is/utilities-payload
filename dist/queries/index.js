import {
  getPayloadContext
} from "../chunk-JXSCPWB4.js";
import "../chunk-7D4SUZUM.js";

// src/queries/getDocumentById.ts
import { cache } from "react";
var getDocumentById = cache(
  async (config, params) => {
    try {
      const { id, collection } = params;
      const { payload, query } = await getPayloadContext(config, params);
      console.info(`Fetching ${collection} with id: ${id}`);
      const result = await payload.findByID({
        id,
        collection,
        ...query,
        depth: 30
      });
      if (!result) {
        throw new Error(`Document with id ${id} not found in collection ${collection}`);
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
export {
  getDocumentById
};
//# sourceMappingURL=index.js.map