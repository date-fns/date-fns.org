import classNames from 'classnames'
import { h, FunctionComponent, Fragment } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Signature } from '../Signature'
import * as styles from './styles.css'

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

      <div>
        {signatures.map((signature, index) => (
          <div
            class={classNames(styles.signature, !solo && styles.multiSignature)}
            key={index}
          >
            <Signature
              name={name}
              signature={signature}
              header={solo ? 'h2' : 'h3'}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
