import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Entities } from '~/ui/components/Entities'
import { Signature } from '../Signature'

interface SignaturesProps {
  name: string
  signatures: SignatureReflection[]
}

export const Signatures: FunctionComponent<SignaturesProps> = ({
  name,
  signatures,
}) => {
  const solo = signatures.length === 1
  return (
    <section>
      {!solo && (
        <h2 id="signatures">
          Signatures
          <DocHeaderAnchor anchor="syntax" />
        </h2>
      )}

      <Entities>
        {signatures.map((signature, index) => (
          <Signature
            name={name}
            signature={signature}
            header={solo ? 'h2' : 'h3'}
          />
        ))}
      </Entities>
    </section>
  )
}
