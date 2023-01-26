import { Fragment, FunctionComponent, h } from 'preact'
import { Code } from '../Code'

interface DebugProps {
  data: unknown
}

export const Debug: FunctionComponent<DebugProps> = ({ data }) => (
  <Code
    value={typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
  />
)
