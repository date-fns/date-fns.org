import { Fragment, FunctionComponent, h } from 'preact'
import type { TypeParameterReflection } from 'typedoc'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { SectionHeader } from '~/ui/components/SectionHeader'
import { TypeDocInterface } from '~/ui/components/TypeDocInterface'

interface Props {
  args: TypeParameterReflection[]
  scope?: string
  header?: 'h2' | 'h3'
}

export const Generics: FunctionComponent<Props> = ({ args, scope, header }) => (
  <section>
    <SectionHeader header="Generics" scope={scope} tag={header} />
    <TypeDocInterface list={args} />
  </section>
)
