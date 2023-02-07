import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import type { SignatureReflection, TypeParameterReflection } from 'typedoc'
import { ParentTypesMap } from '~/utils/docs'
import { TypeDocType } from '../TypeDocType'
import { TypeDocSignatureArguments as Arguments } from './Arguments'
import { TypeDocSignatureGenerics as Generics } from './Generics'
import * as styles from './styles.css'

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
