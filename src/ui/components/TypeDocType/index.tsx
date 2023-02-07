import classNames from 'classnames'
import { FunctionComponent, Fragment, h } from 'preact'
import { useContext } from 'preact/hooks'
import type { SomeType } from 'typedoc'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import { ParentTypesMap, typeHash } from '~/utils/docs'
import { Debug } from '../Debug'
import { Missing } from '../Missing'
import { TypeDocReflection } from '../TypeDocReflection'
import * as styles from './styles.css'

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
      return <span class={styles.code}>{type.name}</span>

    case 'array':
      return (
        <span class={styles.code}>
          Array{'<'}
          <TypeDocType type={type.elementType} />
          {'>'}
        </span>
      )

    case 'reference':
      // TODO: Get rid of it one TypeDoc adds it
      const id = ((type as unknown) as { id: number }).id
      const hash = inline.parentTypesMap?.[id] || typeHash(type.name, id)
      const typeArguments = type.typeArguments
      return (
        <span class={styles.code}>
          <span class={styles.unbreakable}>
            {type.package ? (
              <span>{type.name}</span>
            ) : (
              <a href={hash}>{type.name}</a>
            )}

            {typeArguments && '<'}
          </span>
          {typeArguments && (
            <>
              {typeArguments.map((arg, index) => (
                <>
                  <span class={styles.unbreakable}>
                    <TypeDocType type={arg} />
                    {index < typeArguments.length - 1 && ', '}
                  </span>
                </>
              ))}
              {'>'}
            </>
          )}
        </span>
      )

    case 'union':
      return (
        <span class={styles.code}>
          {type.types.map((t, index) => (
            <span>
              <TypeDocType type={t} listed key={index} />
              {index < type.types.length - 1 && ' | '}
            </span>
          ))}
        </span>
      )

    case 'literal':
      return <span class={styles.code}>{JSON.stringify(type.value)}</span>

    case 'reflection':
      return <TypeDocReflection reflection={type} listed={listed} />

    case 'typeOperator':
      return (
        <span class={classNames(styles.code, styles.unbreakable)}>
          {type.operator} <TypeDocType type={type.target} />
        </span>
      )

    case 'tuple':
      return (
        <span class={styles.code}>
          [
          {type.elements.map((t, index) => (
            <span class={styles.unbreakable}>
              <TypeDocType type={t} />
              {index < type.elements.length - 1 && ', '}
            </span>
          ))}
          ]
        </span>
      )

    case 'conditional':
      return (
        <span class={styles.code}>
          <span class={styles.unbreakable}>
            <TypeDocType type={type.checkType} /> extends{' '}
            <TypeDocType type={type.extendsType} />
          </span>{' '}
          <span class={styles.unbreakable}>
            ? <TypeDocType type={type.trueType} />
          </span>{' '}
          <span class={styles.unbreakable}>
            : <TypeDocType type={type.falseType} />
          </span>
        </span>
      )

    case 'mapped':
      return (
        <span class={styles.code}>
          {'{'}{' '}
          <span class={styles.unbreakable}>
            [{type.parameter} in <TypeDocType type={type.parameterType} />
            ]:
          </span>{' '}
          <TypeDocType type={type.templateType} /> {'}'}
        </span>
      )

    case 'indexedAccess':
      return (
        <span class={styles.code}>
          <span class={styles.unbreakable}>
            <TypeDocType type={type.objectType} />[
          </span>
          <TypeDocType type={type.indexType} />]
        </span>
      )

    case 'query':
    case 'predicate':
    case 'conditional':
    case 'inferred':
    case 'unknown':
    case 'intersection':
    case 'typeOperator':
    case 'template-literal':
    case 'named-tuple-member':
    case 'optional':
    case 'rest':
      return <Missing data={type} />
  }
}
