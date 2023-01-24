import { Fragment, FunctionComponent, h } from 'preact'
import type { TypeParameterReflection } from 'typedoc'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { TypeDocInterface } from '~/ui/components/TypeDocInterface'

interface Props {
  args: TypeParameterReflection[]
  header: 'h2' | 'h3'
}

export const Generics: FunctionComponent<Props> = ({ args, header }) => {
  const headerContent = (
    <>
      Generics
      <DocHeaderAnchor anchor="generics" />
    </>
  )

  return (
    <section>
      {header === 'h2' ? (
        <h2 id="generics">{headerContent}</h2>
      ) : (
        <h3 id="generics">{headerContent}</h3>
      )}

      <TypeDocInterface list={args} />
    </section>
  )
}
