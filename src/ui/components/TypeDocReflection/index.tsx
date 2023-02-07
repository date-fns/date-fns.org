import { FunctionComponent, h } from 'preact'
import type { ReflectionType } from 'typedoc'
import { Missing } from '../Missing'
import { TypeDocReflectionObject } from './Object'
import { TypeDocReflectionSignature } from './Signature'

interface TypeDocReflection {
  reflection: ReflectionType
  listed: boolean | undefined
}

export const TypeDocReflection: FunctionComponent<TypeDocReflection> = ({
  reflection,
  listed,
}) => {
  if ('signatures' in reflection.declaration) {
    if (
      !reflection.declaration.signatures ||
      reflection.declaration.signatures.length !== 1
    )
      return <Missing data={reflection} />

    return (
      <TypeDocReflectionSignature
        signature={reflection.declaration.signatures[0]}
        listed={listed}
      />
    )
  }

  return <TypeDocReflectionObject declaration={reflection.declaration} />
}
