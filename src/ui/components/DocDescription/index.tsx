import { Fragment, FunctionComponent, h } from 'preact'
import { Markdown } from '~/ui/components/Markdown'
import { SectionHeader } from '../SectionHeader'

interface DocDescriptionProps {
  description: string
  scope?: string
  header?: 'h2' | 'h3'
}

export const DocDescription: FunctionComponent<DocDescriptionProps> = ({
  description,
  header,
  scope,
}) => (
  <section>
    <SectionHeader header="Description" scope={scope} tag={header} />
    <Markdown value={description} />
  </section>
)
