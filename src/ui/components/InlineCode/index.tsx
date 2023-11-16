import { ComponentChildren, Fragment, FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

interface InlineCodeProps {
  children: ComponentChildren
}

export const InlineCode: FunctionComponent<InlineCodeProps> = ({
  children,
}) => <span class={styles.code}>{children}</span>
