import type { DateFnsDocs } from '@date-fns/docs/types'
import { FunctionComponent, h } from 'preact'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'
import { Arguments } from './Arguments'
import { DocExamples } from '~/ui/components/DocExamples'
import { Exceptions } from './Exceptions'
import { DocLinks } from '~/ui/components/DocLinks'
import { Properties } from './Properties'
import { Returns } from './Returns'
import { Syntax } from './Syntax'
import { DocUsage } from '~/ui/components/DocUsage'
import { DocHeader } from '~/ui/components/DocHeader'
import { DocDescription } from '~/ui/components/DocDescription'

interface Props {
  doc: DateFnsDocs.JSDocFunction
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
    {doc.content.examples && <DocExamples examples={doc.content.examples} />}

    <DocLinks />
  </div>
)
