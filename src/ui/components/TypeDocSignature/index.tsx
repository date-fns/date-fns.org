import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection } from 'typedoc'
import { TypeDocType } from '../TypeDocType'
import { TypeDocSignatureArguments as Arguments } from './Arguments'
import { TypeDocSignatureGenerics as Generics } from './Generics'

interface TypeDocSignatureProps {
  name?: string
  signature: SignatureReflection
}

export const TypeDocSignature: FunctionComponent<TypeDocSignatureProps> = ({
  name,
  signature,
}) => {
  const withArgs = signature.parameters && signature.parameters.length > 0

  return (
    <>
      <span>
        {name && `function ${name}`}
        {signature.typeParameter && (
          <Generics params={signature.typeParameter} />
        )}
        (
      </span>

      {signature.parameters && <Arguments args={signature.parameters} />}

      {withArgs && <br />}
      <span>
        )
        {signature.type && (
          <span>
            {name ? ':' : ' =>'} <TypeDocType type={signature.type} />
          </span>
        )}
      </span>
    </>
  )
}
