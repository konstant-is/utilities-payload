import { P as PayloadQuery } from './types-96Og7R1r.cjs';
export { F as FieldOverrides } from './types-96Og7R1r.cjs';
import * as payload from 'payload';
import { Block, CollectionConfig, Field, GlobalConfig, SanitizedConfig } from 'payload';

type BlockConfig = Record<string, (props: unknown) => Block>;
type BlockKey = keyof BlockConfig;
declare const blockBuilder: (config: BlockConfig) => {
    build: (params?: unknown) => Block[];
    exclude: (...blocks: BlockKey[]) => /*elided*/ any;
    filter: (predicate: (value: string, index: number) => boolean) => void;
    only: (...blocks: BlockKey[]) => /*elided*/ any;
};
declare const blockBuilderHelper: (props: {
    config: BlockConfig;
}) => {
    build: (params?: unknown) => Block[];
    exclude: (...blocks: BlockKey[]) => /*elided*/ any;
    filter: (predicate: (value: string, index: number) => boolean) => void;
    only: (...blocks: BlockKey[]) => /*elided*/ any;
};

declare const createBlock: (block: Block) => Block;

declare const createCollectionConfig: (config: CollectionConfig) => CollectionConfig;

type FieldCreateType<P = unknown> = {
    condition?: (data: any, siblingData: any) => boolean;
    description?: string;
    fields?: Field[];
    hidden?: boolean;
    hideGutter?: boolean;
    label?: string;
    localized?: boolean;
    name?: string;
    overrides?: Record<string, unknown>;
    required?: boolean;
} & P;
type FieldCreationFunction<P = unknown> = (props: FieldCreateType<P>) => Field;
declare function createField<P>(fieldFn: FieldCreationFunction<P>): (props?: FieldCreateType<P>) => Field;

type ExtractKeys<T> = T extends string ? T : never;
declare const createFieldOptions: <T extends string>(keys: ExtractKeys<T>[]) => {
    options: {
        label: string;
        value: ExtractKeys<T>;
    }[];
    values: Record<ExtractKeys<T>, string>;
};

declare const createGlobalConfig: (config: GlobalConfig) => GlobalConfig;

declare const field: (props: Field) => Field;

/**
 * Validates and returns the locale.
 * @param locale The locale string to validate.
 * @returns The validated locale.
 */
declare const getLocale: (config: SanitizedConfig, locale: null | string | undefined) => string;

declare const getPayloadContext: (config: Promise<SanitizedConfig> | SanitizedConfig, params: PayloadQuery) => Promise<{
    draft: boolean;
    locale: string;
    payload: payload.BasePayload;
    query: {
        draft: boolean;
        locale: string;
        overrideAccess: boolean;
    };
}>;

declare function getReference<T>(value: null | string | T | undefined): T | null;

type RelationProps<T> = {
    relationTo: string;
    value: string | T;
};
type FetchQuery<T> = (params: {
    collection: string;
    id: string;
}) => Promise<T>;
declare const getRelation: <T>(props: RelationProps<T>) => {
    getOrFetchValue: (query: FetchQuery<T>) => Promise<null | T>;
    getValue: () => null | T;
    relationTo: string;
};

export { type FieldCreateType, PayloadQuery, blockBuilder, blockBuilderHelper, createBlock, createCollectionConfig, createField, createFieldOptions, createGlobalConfig, field, getLocale, getPayloadContext, getReference, getRelation };
