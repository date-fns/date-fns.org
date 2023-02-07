import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { TypeDocSignature } from '../../TypeDocSignature'

interface TypeDocReflectionProps {
  signature: SignatureReflection
  listed: boolean | undefined
}

export const TypeDocReflectionSignature: FunctionComponent<TypeDocReflectionProps> = ({
  signature,
  listed,
}) => {
  const content = <TypeDocSignature signature={signature} />
  if (listed) {
    return <>({content})</>
  } else {
    return content
  }
}
