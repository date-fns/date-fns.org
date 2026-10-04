import { DateFnsDocs } from "@date-fns/docs/types";
import type { DeclarationReflection } from "typedoc";

export function extractTypes(
  dec: DeclarationReflection,
  acc?: DeclarationReflection[]
): DeclarationReflection[] {
  const types = acc || [];

  dec.children?.forEach((child) => {
    switch (child.kind) {
      case DateFnsDocs.ReflectionKind.Function:
        child.signatures?.forEach((signature) => {
          // Serialized TypeDoc signatures used typeParameter before 0.26.
          const serialized = (signature as unknown) as {
            typeParameter?: DeclarationReflection[];
            typeParameters?: DeclarationReflection[];
          };
          const params = serialized.typeParameters || serialized.typeParameter;
          params?.forEach((param) => types.push(param));
        });
        return;

      // Add these types, but not process their children
      case DateFnsDocs.ReflectionKind.Interface:
      case DateFnsDocs.ReflectionKind.TypeAlias:
      // @ts-expect-error - Something's off but I don't want to deal with it right now
      // [TODO] Figure out what replace ObjectLiteral with
      case DateFnsDocs.ReflectionKind.ObjectLiteral:
        // Ignore external, i.e. Record
        if (child.flags.isExternal) return;
        types.push(child);
        return;

      // Ignore the properties (i.e. weekStartsOn from Locale)
      case DateFnsDocs.ReflectionKind.Property:
        return;

      default:
        console.log("~~~ UNHANDLED TYPE", child.kind, child);
    }

    if (child.children) extractTypes(child, types);
  });

  return types;
}
