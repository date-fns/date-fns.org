import { ComponentChildren, FunctionComponent, h, Fragment } from 'preact'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import { Markdown } from '~/ui/components/Markdown'

interface DocDescriptionProps {
  description: string
  header?: 'h2' | 'h3'
}

export const DocDescription: FunctionComponent<DocDescriptionProps> = ({
  description,
  header,
}) => {
  const headerContent = (
    <>
      Description
      <DocHeaderAnchor anchor="description" />
    </>
  )

  return (
    <section>
      {header === 'h2' ? (
        <h2 id="description">{headerContent}</h2>
      ) : (
        <h3 id="description">{headerContent}</h3>
      )}

      <Markdown value={description} />
    </section>
  )
}
