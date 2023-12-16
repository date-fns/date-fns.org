import {
  findExamples,
  findSignatureReturns,
  findTags,
} from '@date-fns/docs/utils'
import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import type { SignatureReflection, TypeParameterReflection } from 'typedoc'
import { IgnoreParentTypesSourceContext } from '~/ui/contexts/IgnoreParentTypesSource'
import { Arguments } from '../Arguments'
import { Generics } from '../Generics'
import { Returns } from '../Returns'
import { Type } from '../Type'
import { Debug } from '~/ui/components/Debug'
import { DocExamples } from '~/ui/components/DocExamples'
import { extractCodeFromTagString } from '~/utils/docs'
import { Throws } from '../Throws'

interface SignatureProps {
  name: string
  signature: SignatureReflection
  header: 'h2' | 'h3'
  index: number | undefined
}

export const Signature: FunctionComponent<SignatureProps> = ({
  name,
  signature,
  header,
  index,
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
  const examples = useMemo(
    () => findExamples(signature).map(extractCodeFromTagString),
    [signature]
  )

  // @ts-ignore: Typing is inproper in TypeDoc
  const typeParameters = signature.typeParameter as
    | TypeParameterReflection[]
    | undefined

  const scope = index === undefined ? undefined : `${index + 1}`

  return (
    <>
      <IgnoreParentTypesSourceContext.Provider value>
        <Type name={name} signature={signature} header={header} scope={scope} />
      </IgnoreParentTypesSourceContext.Provider>

      {
        // @ts-expect-error - TypeDoc is being difficult
        signature.typeParameter && (
          <Generics
            args={
              // @ts-expect-error - TypeDoc is being difficult
              signature.typeParameter
            }
            header={header}
            scope={scope}
          />
        )
      }

      {signature.parameters && signature.parameters.length > 0 && (
        <Arguments args={signature.parameters} header={header} scope={scope} />
      )}

      {signature.type && (
        <Returns
          description={returns || ''}
          type={signature.type}
          header={header}
          scope={scope}
        />
      )}

      {throws.length > 0 && (
        <Throws throws={throws} header={header} scope={scope} />
      )}

      {examples && <DocExamples examples={examples} />}

      <Debug data={signature} />
    </>
  )
}
