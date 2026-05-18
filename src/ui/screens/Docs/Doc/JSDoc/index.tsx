import type { DateFnsDocs } from "@date-fns/docs/types";
import { FunctionComponent, h } from "preact";
import { DocDescription } from "~/ui/components/DocDescription";
import { DocExamples } from "~/ui/components/DocExamples";
import { DocHeader } from "~/ui/components/DocHeader";
import { DocLinks } from "~/ui/components/DocLinks";
import { DocUsage } from "~/ui/components/DocUsage";
import { Arguments } from "./Arguments";
import { Exceptions } from "./Exceptions";
import { Properties } from "./Properties";
import { Returns } from "./Returns";
import { Syntax } from "./Syntax";

interface Props {
  doc: DateFnsDocs.JSDocFunction;
}

export const JSDoc: FunctionComponent<Props> = ({ doc }) => (
  <div>
    <DocHeader>{doc.title}</DocHeader>

    <DocDescription description={doc.content.description} />

    {doc.usage && doc.usageTabs && (
      <DocUsage usage={doc.usage} usageTabs={doc.usageTabs} />
    )}
    {doc.syntax && <Syntax syntax={doc.syntax} />}
    {doc.args && doc.args.length > 0 && <Arguments args={doc.args} />}
    {doc.content.properties && doc.content.properties.length > 0 && (
      <Properties properties={doc.content.properties} />
    )}
    {doc.content.returns && <Returns returns={doc.content.returns} />}
    {doc.content.exceptions && (
      <Exceptions exceptions={doc.content.exceptions} />
    )}
    {doc.content.examples && (
      // @ts-expect-error - TypeDoc is being difficult
      <DocExamples examples={doc.content.examples} />
    )}

    <DocLinks />
  </div>
);
