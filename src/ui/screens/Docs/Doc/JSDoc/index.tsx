import { JSDocFunction } from '@date-fns/docs/db'
import { FunctionComponent, h } from 'preact'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'
import { Arguments } from './Arguments'
import { Examples } from './Examples'
import { Exceptions } from './Exceptions'
import Issue from './Issue'
import { Properties } from './Properties'
import { Returns } from './Returns'
import { Header } from './style.css'
import { Syntax } from './Syntax'
import { Usage } from './Usage'

interface Props {
  doc: JSDocFunction
}

export const JSDoc: FunctionComponent<Props> = ({ doc }) => (
  <div>
    <h1>
      <Header tag="span">{doc.title}</Header>
    </h1>

    <section>
      <h2 id="description">
        Description
        <DocHeaderAnchor anchor="description" />
      </h2>

      <Markdown value={doc.content.description} />
    </section>

    {doc.usage && doc.usageTabs && (
      <Usage usage={doc.usage} usageTabs={doc.usageTabs} />
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
    {doc.content.examples && <Examples examples={doc.content.examples} />}

    <Issue />
  </div>
)
