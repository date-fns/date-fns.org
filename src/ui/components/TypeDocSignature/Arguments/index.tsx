import { Fragment, FunctionComponent, h } from 'preact'
import type { ParameterReflection } from 'typedoc'
import { ParentTypesMap } from '~/utils/docs'
import { TypeDocType } from '../../TypeDocType'

interface TypeDocSignatureArgumentsProps {
  args: ParameterReflection[]
}

export const TypeDocSignatureArguments: FunctionComponent<TypeDocSignatureArgumentsProps> = ({
  args,
}) => {
  return (
    <>
      {args.map((arg, index) => (
        <>
          <br />
          <span>
            {'  '}
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
    </>
  )
}
