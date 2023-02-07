import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { Code } from '~/ui/components/Code'
import { SectionHeader } from '~/ui/components/SectionHeader'
import { TypeDocSignature } from '~/ui/components/TypeDocSignature'

interface TypeProps {
  name: string
  signature: SignatureReflection
  scope?: string
  header?: 'h2' | 'h3'
}

export const Type: FunctionComponent<TypeProps> = ({
  name,
  signature,
  scope,
  header,
}) => {
  return (
    <section>
      <SectionHeader header="Type" scope={scope} tag={header} />
      <Code value={<TypeDocSignature name={name} signature={signature} />} />
    </section>
  )
}
