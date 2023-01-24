import { Fragment, FunctionComponent, h } from 'preact'
import type { ParameterReflection } from 'typedoc'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { TypeDocInterface } from '~/ui/components/TypeDocInterface'

interface Props {
  args: ParameterReflection[]
  header: 'h2' | 'h3'
}

export const Arguments: FunctionComponent<Props> = ({ args, header }) => {
  const headerContent = (
    <>
      Arguments
      <DocHeaderAnchor anchor="arguments" />
    </>
  )

  return (
    <section>
      {header === 'h2' ? (
        <h2 id="arguments">{headerContent}</h2>
      ) : (
        <h3 id="arguments">{headerContent}</h3>
      )}

      <TypeDocInterface list={args} />
    </section>
  )
}
