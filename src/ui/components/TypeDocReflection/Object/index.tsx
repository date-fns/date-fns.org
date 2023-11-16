import { Fragment, FunctionComponent, h } from 'preact'
import { useContext } from 'preact/hooks'
import type { DeclarationReflection } from 'typedoc'
import { TypeIndentContext } from '~/ui/contexts/TypeIndentContext'
import { TypeDocType } from '../../TypeDocType'

interface TypeDocReflectionObjectProps {
  declaration: DeclarationReflection
}

export const TypeDocReflectionObject: FunctionComponent<TypeDocReflectionObjectProps> = ({
  declaration,
}) => {
  const indent = useContext(TypeIndentContext)
  const localIndent = indent + 2

  return (
    <TypeIndentContext.Provider value={localIndent}>
      {'{'}
      {declaration.children?.map((child) => (
        <>
          <br />
          {' '.repeat(localIndent)}
          {child.name}
          {child.flags.isOptional && '?'}: <TypeDocType type={child.type!} />
        </>
      ))}
      <br />
      {' '.repeat(indent) + '}'}
    </TypeIndentContext.Provider>
  )
}
