import { describe, it } from "mocha";
import assert from "power-assert";
import type { DeclarationReflection } from "typedoc";
import { DateFnsDocs } from "@date-fns/docs/types";
import { extractTypes } from "./utils";

describe("extractTypes", () => {
  for (const field of ["typeParameter", "typeParameters"]) {
    it(`includes function generics serialized as ${field}`, () => {
      const param = {
        id: 1921,
        name: "ContextDate",
        kind: DateFnsDocs.ReflectionKind.TypeParameter,
        type: { type: "reference", name: "Date" },
      };
      const doc = ({
        children: [
          {
            kind: DateFnsDocs.ReflectionKind.Function,
            signatures: [{ [field]: [param] }],
          },
        ],
      } as unknown) as DeclarationReflection;

      assert.deepEqual(extractTypes(doc), [param]);
    });
  }

  it("keeps aliases and interfaces while ignoring external types and properties", () => {
    const alias = {
      id: 1,
      kind: DateFnsDocs.ReflectionKind.TypeAlias,
      flags: {},
    };
    const iface = {
      id: 2,
      kind: DateFnsDocs.ReflectionKind.Interface,
      flags: {},
    };
    const doc = ({
      children: [
        alias,
        iface,
        {
          kind: DateFnsDocs.ReflectionKind.Interface,
          flags: { isExternal: true },
        },
        { kind: DateFnsDocs.ReflectionKind.Property },
        { kind: DateFnsDocs.ReflectionKind.Function },
      ],
    } as unknown) as DeclarationReflection;

    assert.deepEqual(extractTypes(doc), [alias, iface]);
  });
});
