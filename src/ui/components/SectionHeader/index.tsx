import kebabCase from 'lodash/kebabCase'
import { Fragment, FunctionComponent, h } from 'preact'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'

interface SectionHeaderProps {
  header: string
  scope?: string
  tag?: 'h2' | 'h3'
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  header,
  scope,
  tag,
}) => {
  const anchor = (scope ? `${scope}/` : '') + kebabCase(header)
  const headerContent = (
    <>
      {header}
      <DocHeaderAnchor anchor={anchor} />
    </>
  )

  return tag === 'h3' ? (
    <h3 id={anchor}>{headerContent}</h3>
  ) : (
    <h2 id={anchor}>{headerContent}</h2>
  )
}
