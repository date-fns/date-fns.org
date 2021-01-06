import { h, FunctionComponent } from 'preact'
import { Markdown } from 'ui/components/Markdown'
import { Header } from './style.css'
import { DocHeaderAnchor } from 'ui/components/DocHeaderAnchor'
import { MigratedDocFunction } from 'db/migratedDoc'
import { Usage } from './Usage'
import { Syntax } from './Syntax'
import { Arguments } from './Arguments'
import { Properties } from './Properties'
import { Returns } from './Returns'
import { Exceptions } from './Exceptions'
import { Examples } from './Examples'

interface Props {
  doc: MigratedDocFunction
  selectedVersion: string
}

export const MigratedDoc: FunctionComponent<Props> = ({ doc, selectedVersion }) => (
  <div>
    <h1>
      <Header tag="span">
        {doc.title}
      </Header>
    </h1>

    <section>
      <h2 id='description'>
        Description
        <DocHeaderAnchor anchor='description' />
      </h2>

      <Markdown
        value={doc.content.description}
        selectedVersion={selectedVersion}
      />
    </section>

    {doc.usage && doc.usageTabs && <Usage
      usage={doc.usage}
      usageTabs={doc.usageTabs}
      selectedVersion={selectedVersion}
    />}
    {doc.syntax && <Syntax syntax={doc.syntax} />}
    {doc.args && doc.args.length > 0 && <Arguments args={doc.args} selectedVersion={selectedVersion} />}
    {doc.content.properties && doc.content.properties.length > 0 && <Properties
      properties={doc.content.properties}
      selectedVersion={selectedVersion}
    />}
    {doc.content.returns && <Returns
      returns={doc.content.returns}
      selectedVersion={selectedVersion}
    />}
    {doc.content.exceptions && <Exceptions
      exceptions={doc.content.exceptions}
      selectedVersion={selectedVersion}
    />}
    {doc.content.examples && <Examples
      examples={doc.content.examples}
    />}
  </div>
)
