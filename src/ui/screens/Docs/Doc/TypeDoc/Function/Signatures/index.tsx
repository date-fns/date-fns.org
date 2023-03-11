import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Entities } from '~/ui/components/Entities'
import { RichText } from '~/ui/components/RichText'
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
        <div>
          <h2 id="signatures">
            Signatures
            <DocHeaderAnchor anchor="syntax" />
          </h2>

          <RichText>
            <blockquote>
              This function has multiple signatures, meaning it can be called
              with a different set of arguments, and it might return different
              types. Check out every signature to find which one you need.
            </blockquote>
          </RichText>
        </div>
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
