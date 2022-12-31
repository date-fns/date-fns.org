import { h, FunctionComponent } from 'preact'
import { Code } from '~/ui/components/Code'
import { Markdown } from '~/ui/components/Markdown'

interface Props {
  code: string
  text?: string
}

export const Content: FunctionComponent<Props> = ({ code, text }) => (
  <div>
    <div>
      <Code value={code} />
    </div>
    {text && (
      <div>
        <Markdown value={text} />
      </div>
    )}
  </div>
)
