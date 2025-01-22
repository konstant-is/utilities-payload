import { Block, CollectionConfig, Field, GlobalConfig } from 'payload';

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

declare const createField: (overrites: Field) => Field;
declare const field: (props: Field) => Field;

declare const createGlobalConfig: (config: GlobalConfig) => GlobalConfig;

export { blockBuilder, blockBuilderHelper, createBlock, createCollectionConfig, createField, createGlobalConfig, field };
