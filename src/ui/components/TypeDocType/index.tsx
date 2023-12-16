import { Fragment, FunctionComponent, h } from 'preact'
import { useContext } from 'preact/hooks'
import type { SomeType } from 'typedoc'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import { typeHash } from '~/utils/docs'
import { Missing } from '../Missing'
import { TypeDocReflection } from '../TypeDocReflection'

interface TypeDocTypeProps {
  type: SomeType
  /** When the type is part of union or intersection */
  listed?: boolean
}

export const TypeDocType: FunctionComponent<TypeDocTypeProps> = ({
  type,
  listed,
}) => {
  const inline = useContext(InlineTypeContext)

  switch (type.type) {
    case 'intrinsic':
      return <>{type.name}</>

    case 'array':
      return (
        <>
          Array{'<'}
          <TypeDocType type={type.elementType} />
          {'>'}
        </>
      )

    case 'reference':
      // TODO: Get rid of it one TypeDoc adds it
      const id = ((type as unknown) as { target: number }).target
      const hash = inline.parentTypesMap?.[id] || typeHash(type.name, id)
      const typeArguments = type.typeArguments
      return (
        <>
          <>
            {type.package !== 'date-fns' ? (
              <>{type.name}</>
            ) : (
              <a href={hash}>{type.name}</a>
            )}

            {typeArguments && '<'}
          </>
          {typeArguments && (
            <>
              {typeArguments.map((arg, index) => (
                <>
                  <TypeDocType type={arg} />
                  {index < typeArguments.length - 1 && <>, </>}
                </>
              ))}
              {'>'}
            </>
          )}
        </>
      )

    case 'union':
      return (
        <>
          {type.types.map((t, index) => (
            <>
              {index !== 0 && <>|&nbsp;</>}
              <TypeDocType type={t} listed key={index} />
              {index < type.types.length - 1 && <> </>}
            </>
          ))}
        </>
      )

    case 'intersection':

    case 'literal':
      return (
        <>
          {
            // @ts-expect-error - TypeDoc is being difficult
            JSON.stringify(type.value)
          }
        </>
      )

    case 'reflection':
      return <TypeDocReflection reflection={type} listed={listed} />

    case 'typeOperator':
      return (
        <>
          {type.operator} <TypeDocType type={type.target} />
        </>
      )

    case 'tuple':
      return (
        <>
          [
          {type.elements.map((t, index) => (
            <>
              <TypeDocType type={t} />
              {index < type.elements.length - 1 && ', '}
            </>
          ))}
          ]
        </>
      )

    case 'conditional':
      return (
        <>
          <>
            <TypeDocType type={type.checkType} /> extends{' '}
            <TypeDocType type={type.extendsType} />
          </>{' '}
          <>
            ? <TypeDocType type={type.trueType} />
          </>{' '}
          <>
            : <TypeDocType type={type.falseType} />
          </>
        </>
      )

    case 'mapped':
      return (
        <>
          {'{'}{' '}
          <>
            [{type.parameter} in <TypeDocType type={type.parameterType} />
            ]:
          </>{' '}
          <TypeDocType type={type.templateType} /> {'}'}
        </>
      )

    case 'indexedAccess':
      return (
        <>
          <>
            <TypeDocType type={type.objectType} />[
          </>
          <TypeDocType type={type.indexType} />]
        </>
      )

    case 'query':
    case 'predicate':
    case 'conditional':
    case 'inferred':
    case 'unknown':
    case 'typeOperator':
    case 'template-literal':
    case 'named-tuple-member':
    case 'optional':
    case 'rest':
      return <Missing data={type} />
  }
}
