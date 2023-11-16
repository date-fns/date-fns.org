import { Fragment, FunctionComponent, h } from 'preact'
import { useContext } from 'preact/hooks'
import type { ParameterReflection } from 'typedoc'
import { TypeIndentContext } from '~/ui/contexts/TypeIndentContext'
import { ParentTypesMap } from '~/utils/docs'
import { TypeDocType } from '../../TypeDocType'

interface TypeDocSignatureArgumentsProps {
  args: ParameterReflection[]
}

export const TypeDocSignatureArguments: FunctionComponent<TypeDocSignatureArgumentsProps> = ({
  args,
}) => {
  const indent = useContext(TypeIndentContext)
  const localIndent = indent + 2

  return (
    <TypeIndentContext.Provider value={localIndent}>
      {args.map((arg, index) => (
        <>
          <br />
          <span>
            {' '.repeat(localIndent)}
            {arg.name}
            {arg.flags.isOptional && '?'}
            {arg.type && (
              <span>
                : <TypeDocType type={arg.type} />
              </span>
            )}
            {arg.defaultValue && <span> = {arg.defaultValue}</span>}
            {index < args.length - 1 && ','}
          </span>
        </>
      ))}
    </TypeIndentContext.Provider>
  )
}
