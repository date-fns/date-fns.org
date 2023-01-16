import { findSignatureReturns } from '@date-fns/docs/utils'
import { h, FunctionComponent, Fragment } from 'preact'
import { useMemo } from 'preact/hooks'
import type { SignatureReflection, TypeParameterReflection } from 'typedoc'
import { Arguments } from '../Arguments'
import { Generics } from '../Generics'
import { Returns } from '../Returns'

interface SignatureProps {
  signature: SignatureReflection
  header: 'h2' | 'h3'
}

export const Signature: FunctionComponent<SignatureProps> = ({
  signature,
  header,
}) => {
  const returns = useMemo(() => findSignatureReturns(signature), [signature])

  // @ts-ignore: Typing is inproper in TypeDoc
  const typeParameters = signature.typeParameter as
    | TypeParameterReflection[]
    | undefined

  return (
    <>
      {/*page.syntax && <Syntax syntax={page.syntax} />*/}

      {signature.typeParameters && (
        <Generics args={signature.typeParameters} header={header} />
      )}

      {signature.parameters && signature.parameters.length > 0 && (
        <Arguments args={signature.parameters} header={header} />
      )}

      {signature.type && (
        <Returns
          description={returns || ''}
          type={signature.type}
          header={header}
        />
      )}

      <code>
        <pre>{JSON.stringify(signature, null, 2)}</pre>
      </code>
    </>
  )
}
