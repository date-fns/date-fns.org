import { Fragment, FunctionComponent, h } from 'preact'

interface MissingProps {
  data?: unknown
  message?: string
}

export const Missing: FunctionComponent<MissingProps> = ({ message, data }) => (
  <div
    onClick={(e) => {
      if (e.shiftKey) console.log(data)
    }}
  >
    <div>
      {message ? message + ' ' : ''}If you see this,{' '}
      <a href="https://twitter.com/kossnocorp">ping me</a>.
    </div>
  </div>
)
