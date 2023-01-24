import { FunctionComponent, h } from 'preact'
import type { SomeType } from 'typedoc'
import * as styles from './styles.css'

interface Props {
  type: SomeType
}

export const TypeDocType: FunctionComponent<Props> = ({ type }) => {
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
      return (
        <span class={styles.code}>
          <a
            href={`#types/${type.name}/${
              /* TODO: Get rid of it one TypeDoc adds it */
              ((type as unknown) as { id: number }).id
            }`}
          >
            {type.name}
          </a>
        </span>
      )

    case 'union':
      return (
        <span>
          {type.types.map((t, index) => (
            <span>
              <TypeDocType type={t} key={index} />
              {index < type.types.length - 1 && ' | '}
            </span>
          ))}
        </span>
      )

    case 'literal':
      return <span>{JSON.stringify(type.value)}</span>

    case 'reflection':
    case 'query':
    case 'predicate':
    case 'indexedAccess':
    case 'conditional':
    case 'inferred':
    case 'unknown':
    case 'tuple':
    case 'union':
    case 'intersection':
    case 'typeOperator':
    case 'template-literal':
    case 'named-tuple-member':
    case 'mapped':
    case 'optional':
    case 'rest':
      return (
        <div>
          If you see this, <a href="https://twitter.com/kossnocorp">ping me</a>.
        </div>
      )
  }
}
