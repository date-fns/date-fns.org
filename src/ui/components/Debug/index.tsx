import { Fragment, FunctionComponent, h } from 'preact'
import { Code } from '../Code'
import { debugTypeDoc } from '~/utils/docs'

interface DebugProps {
  data: unknown
}

export const Debug: FunctionComponent<DebugProps> = ({ data }) => {
  if (!debugTypeDoc) return null
  return (
    <Code
      value={typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
    />
  )
}
