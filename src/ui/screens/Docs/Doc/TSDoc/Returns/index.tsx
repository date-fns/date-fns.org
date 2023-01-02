import { findReturns } from '@date-fns/docs/utils'
import { FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { DocReturns } from '~/ui/components/DocReturns'
import { DocType } from '~/ui/components/DocType'

interface Props {
  fn: DeclarationReflection
}

export const Returns: FunctionComponent<Props> = ({ fn }) => {
  const description = useMemo(() => findReturns(fn), [fn])
  console.log({ fn })
  return (
    <DocReturns
      returns={
        fn.signatures?.map((s) => ({
          type: s.type && <DocType type={s.type} />,
          description: description || '',
        })) || []
      }
    />
  )
}
