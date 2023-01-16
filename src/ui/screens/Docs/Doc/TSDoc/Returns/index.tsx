import { FunctionComponent, h } from 'preact'
import type { SomeType } from 'typedoc'
import { DocReturns } from '~/ui/components/DocReturns'
import { TSDocType } from '~/ui/components/TSDocType'

interface Props {
  type: SomeType | undefined
  description: string
  header: 'h2' | 'h3'
}

export const Returns: FunctionComponent<Props> = ({
  type,
  description,
  header,
}) => {
  return (
    <DocReturns
      returns={[
        {
          type: type && <TSDocType type={type} />,
          description,
        },
      ]}
      header={header}
    />
  )
}
