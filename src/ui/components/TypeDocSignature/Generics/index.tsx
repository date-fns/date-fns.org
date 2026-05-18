import { Fragment, FunctionComponent, h } from "preact";
import { useContext } from "preact/hooks";
import type { TypeParameterReflection } from "typedoc";
import { IgnoreParentTypesSourceContext } from "~/ui/contexts/IgnoreParentTypesSource";
import { InlineTypeContext } from "~/ui/contexts/InlineTypeContext";
import { typeHash } from "~/utils/docs";
import { IdHighlight } from "../../IdHighlight";
import { TypeDocType } from "../../TypeDocType";

interface TypeDocSignatureGenericsProps {
  params: TypeParameterReflection[];
}

export const TypeDocSignatureGenerics: FunctionComponent<
  TypeDocSignatureGenericsProps
> = ({ params }) => {
  const inline = useContext(InlineTypeContext);
  const ignoreSource = useContext(IgnoreParentTypesSourceContext);

  return (
    <>
      {"<"}
      {params.map((param, index) => {
        const id = inline.buildId?.(param);
        return (
          <>
            {inline && ignoreSource && inline.parentTypesMap?.[param.id] ? (
              <a href={inline.parentTypesMap[param.id]}>{param.name}</a>
            ) : inline && !ignoreSource ? (
              <span id={id}>
                <IdHighlight id={id} match={inline.idHighlightMatch}>
                  {param.name}
                </IdHighlight>
              </span>
            ) : (
              <a href={typeHash(param.name, param.id)}>{param.name}</a>
            )}

            {param.type && (
              <>
                {" "}
                extends <TypeDocType type={param.type} />
              </>
            )}
            {param.default && (
              <>
                {" "}
                = <TypeDocType type={param.default} />
              </>
            )}
            {index < params.length - 1 && ", "}
          </>
        );
      })}
      {">"}
    </>
  );
};
