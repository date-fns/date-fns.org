import { FunctionComponent, h } from 'preact'
import type { SomeType } from 'typedoc'

interface Props {
  type: SomeType
}

export const DocType: FunctionComponent<Props> = ({ type }) => {
  // console.log({ type })

  switch (type.type) {
    case 'intrinsic':
      return <span>{type.name}</span>

    case 'array':
      return (
        <span>
          Array{'<'}
          <DocType type={type.elementType} />
          {'>'}
        </span>
      )

    case 'reference':
      return (
        <span>
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
    case 'literal':
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
