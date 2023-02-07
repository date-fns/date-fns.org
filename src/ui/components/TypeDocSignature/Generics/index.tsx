import { FunctionComponent, h } from 'preact'
import { useContext } from 'preact/hooks'
import type { TypeParameterReflection } from 'typedoc'
import { InlineTypeContext } from '~/ui/contexts/InlineTypeContext'
import { ParentTypesMap, typeHash } from '~/utils/docs'
import { IdHightlight } from '../../IdHighlight'
import { TypeDocType } from '../../TypeDocType'

interface TypeDocSignatureGenericsProps {
  params: TypeParameterReflection[]
}

export const TypeDocSignatureGenerics: FunctionComponent<TypeDocSignatureGenericsProps> = ({
  params,
}) => {
  const inline = useContext(InlineTypeContext)

  return (
    <span>
      {'<'}
      {params.map((param, index) => {
        const id = inline.buildId?.(param)
        return (
          <span>
            {inline ? (
              <span id={id}>
                <IdHightlight id={id} match={inline.idHighlightMatch}>
                  {param.name}
                </IdHightlight>
              </span>
            ) : (
              <a href={typeHash(param.name, param.id)}>{param.name}</a>
            )}

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
        )
      })}
      {'>'}
    </span>
  )
}
