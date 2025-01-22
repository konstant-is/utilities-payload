import { getNestedProperty } from '@konstant/utilities-ui'
import { useRowLabel } from '@payloadcms/ui'

type Props = {
  fallback?: string
  fieldName: string
  prefix?: string
}
export const ArrayRowLabel = (props: Props) => {
  const { label } = useArrayRowLabel(props)

  return <div>{label}</div>
}

const useArrayRowLabel = (props: Props) => {
  const { fallback, fieldName, prefix } = props
  const { data, rowNumber } = useRowLabel<{
    [key: string]: any // Allow indexing with a string key
  }>()

  const rowNr = `${(rowNumber || 0) + 1}`

  const getLabel = () => {
    const field = getNestedProperty(data, fieldName)

    return field || fallback || 'Item'
  }

  const getFullLabel = () => {
    const label = getLabel()
    return `${prefix || ''} ${rowNr}: ${label}`
  }
  return {
    label: getFullLabel(),
    rowNr: `${(rowNumber || 0) + 1}`,
  }
}
