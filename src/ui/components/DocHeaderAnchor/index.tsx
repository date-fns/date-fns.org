import { h, FunctionComponent } from 'preact'
import { DocHeaderLink } from './style.css'

interface Props {
  anchor: string
}

export const DocHeaderAnchor: FunctionComponent<Props> = ({ anchor }) => (
  <DocHeaderLink tag="a" href={`#${anchor}`}>
    #
  </DocHeaderLink>
)


