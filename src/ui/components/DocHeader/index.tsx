import { ComponentChildren, FunctionComponent, h } from 'preact'
import { SourceLink } from '../SourceLink'
import * as styles from './styles.css'

interface DocHeaderProps {
  children: ComponentChildren
  source?: string
}

export const DocHeader: FunctionComponent<DocHeaderProps> = ({
  children,
  source,
}) => (
  <h1 class={styles.header}>
    <span>{children}</span>
    <SourceLink source={source} />
  </h1>
)
