import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import type {
  ParameterReflection,
  SignatureReflection,
  TypeParameterReflection,
} from 'typedoc'
import { Code } from '~/ui/components/Code'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { SectionHeader } from '~/ui/components/SectionHeader'
import { TypeDocType } from '~/ui/components/TypeDocType'
import * as styles from './styles.css'

interface TypeProps {
  name: string
  signature: SignatureReflection
  scope?: string
  header?: 'h2' | 'h3'
}

export const Type: FunctionComponent<TypeProps> = ({
  name,
  signature,
  scope,
  header,
}) => {
  const withArgs = signature.parameters && signature.parameters.length > 0

  return (
    <section>
      <SectionHeader header="Type" scope={scope} tag={header} />

      <Code
        value={
          <div>
            <span class={classNames(withArgs && styles.withArgs)}>
              function {name}
              {signature.typeParameter && (
                <Generics params={signature.typeParameter} />
              )}
              (
            </span>

            {signature.parameters && <Arguments args={signature.parameters} />}

            <span class={classNames(withArgs && styles.withArgs)}>
              )
              {signature.type && (
                <span>
                  : <TypeDocType type={signature.type} />
                </span>
              )}
              ;
            </span>
          </div>
        }
      />
    </section>
  )
}

interface GenericsProps {
  params: TypeParameterReflection[]
}

function Generics({ params }: GenericsProps) {
  return (
    <span>
      {'<'}
      {params.map((param, index) => (
        <span>
          <a href={`#types/${param.name}/${param.id}`}>{param.name}</a>
          {param.type && (
            <span>
              {' '}
              extends <TypeDocType type={param.type} />
            </span>
          )}
          {param.default && (
            <span>
              {' '}
              = <TypeDocType type={param.default} />
            </span>
          )}
          {index < params.length - 1 && ', '}
        </span>
      ))}
      {'>'}
    </span>
  )
}

interface ArgumentsProps {
  args: ParameterReflection[]
}

function Arguments({ args }: ArgumentsProps) {
  return (
    <>
      {args.map((arg) => (
        <div>
          {'  '}
          {arg.name}
          {arg.type && (
            <span>
              : <TypeDocType type={arg.type} />
            </span>
          )}
          {arg.defaultValue && <span> = {arg.defaultValue}</span>}
        </div>
      ))}
    </>
  )
}
