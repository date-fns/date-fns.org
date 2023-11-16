import { FunctionComponent, h } from 'preact'
import type { SomeType } from 'typedoc'
import { DocReturns } from '~/ui/components/DocReturns'
import { TypeDocType } from '~/ui/components/TypeDocType'

interface Props {
  type: SomeType | undefined
  description: string
  header: 'h2' | 'h3'
  scope?: string | undefined
}

export const Returns: FunctionComponent<Props> = ({
  type,
  description,
  header,
  scope,
}) => {
  return (
    <DocReturns
      returns={[
        {
          type: type && <TypeDocType type={type} />,
          description,
        },
      ]}
      header={header}
      scope={scope}
    />
  )
}
