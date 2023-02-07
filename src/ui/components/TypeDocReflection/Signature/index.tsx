import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { TypeDocSignature } from '../../TypeDocSignature'

interface TypeDocReflectionSignatureProps {
  signature: SignatureReflection
  listed: boolean | undefined
}

export const TypeDocReflectionSignature: FunctionComponent<TypeDocReflectionSignatureProps> = ({
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
