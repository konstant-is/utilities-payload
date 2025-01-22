import type { Block } from 'payload'

export const createBlock = (block: Block): Block => {
  const fallbackInterfaceName = () =>
    block.slug.includes('Block') ? block.slug : `${block.slug}Block`

  return {
    ...block,
    interfaceName: block?.interfaceName || fallbackInterfaceName(),
  }
}
