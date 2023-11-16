import type { DateFnsDocs } from '@date-fns/docs/types'
import { FunctionComponent, h } from 'preact'
import { DocReturns } from '~/ui/components/DocReturns'

interface Props {
  returns: DateFnsDocs.JSDocAttribute[]
}

export const Returns: FunctionComponent<Props> = ({ returns }) => (
  <DocReturns
    returns={returns.map((returnData) => ({
      type: returnData.type.names.join(' | '),
      description: returnData.description,
    }))}
  />
)
