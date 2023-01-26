import { Fragment, FunctionComponent, h } from 'preact'
import type { ParameterReflection } from 'typedoc'
import { SectionHeader } from '~/ui/components/SectionHeader'
import { TypeDocInterface } from '~/ui/components/TypeDocInterface'

interface ArgumentsProps {
  args: ParameterReflection[]
  scope?: string
  header?: 'h2' | 'h3'
}

export const Arguments: FunctionComponent<ArgumentsProps> = ({
  args,
  scope,
  header,
}) => (
  <section>
    <SectionHeader header="Arguments" scope={scope} tag={header} />
    <TypeDocInterface list={args} />
  </section>
)
