import { h, FunctionComponent } from 'preact'
import { Code } from 'ui/components/Code'
import { Markdown } from 'ui/components/Markdown'

interface Props {
  code: string
  text?: string
  selectedVersion: string
}

export const Content: FunctionComponent<Props> = ({ code, text, selectedVersion }) => (
  <div>
    <div>
      <Code
        value={code}
        options={{
          readOnly: true,
          mode: 'javascript'
        }}
      />
    </div>
    {text && <div>
      <Markdown value={text} selectedVersion={selectedVersion} />
    </div>}
  </div>
)
