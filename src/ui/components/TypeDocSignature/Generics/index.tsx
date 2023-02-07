import { FunctionComponent, h, Fragment } from 'preact'
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
    <>
      {'<'}
      {params.map((param, index) => {
        const id = inline.buildId?.(param)
        return (
          <>
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
              <>
                {' '}
                extends <TypeDocType type={param.type} />
              </>
            )}
            {param.default && (
              <>
                {' '}
                = <TypeDocType type={param.default} />
              </>
            )}
            {index < params.length - 1 && ', '}
          </>
        )
      })}
      {'>'}
    </>
  )
}
