import { findSignatureReturns, findTags } from '@date-fns/docs/utils'
import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { SignatureReflection, TypeParameterReflection } from 'typedoc'
import { IgnoreParentTypesSourceContext } from '~/ui/contexts/IgnoreParentTypesSource'
import { Arguments } from '../Arguments'
import { Generics } from '../Generics'
import { Returns } from '../Returns'
import { Throws } from '../Throws'
import { Type } from '../Type'

interface SignatureProps {
  name: string
  signature: SignatureReflection
  header: 'h2' | 'h3'
}

export const Signature: FunctionComponent<SignatureProps> = ({
  name,
  signature,
  header,
}) => {
  const returns = useMemo(() => findSignatureReturns(signature), [signature])
  const throws = useMemo(
    () =>
      findTags(signature, '@throws').map((str) => {
        const captures = str.match(/^(?:(\w+) - )?(.*)$/)
        if (!captures) return { type: undefined, description: str }
        return { type: captures[1], description: captures[2] || str }
      }),
    [signature]
  )

  // @ts-ignore: Typing is inproper in TypeDoc
  const typeParameters = signature.typeParameter as
    | TypeParameterReflection[]
    | undefined

  return (
    <>
      <IgnoreParentTypesSourceContext.Provider value>
        <Type name={name} signature={signature} header={header} />
      </IgnoreParentTypesSourceContext.Provider>

      {signature.typeParameter && (
        <Generics args={signature.typeParameter} header={header} />
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

      {throws.length > 0 && <Throws throws={throws} header={header} />}

      <code>
        <pre>{JSON.stringify(signature, null, 2)}</pre>
      </code>
    </>
  )
}
