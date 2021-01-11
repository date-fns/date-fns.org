import { Submodule } from '@date-fns/date-fns-db'
import { h, FunctionComponent } from 'preact'
import { Code } from '~/ui/components/Code'
import { Markdown } from '~/ui/components/Markdown'

interface Props {
  code: string
  text?: string
  selectedSubmodule: Submodule
  selectedVersion: string
}

export const Content: FunctionComponent<Props> = ({
  code,
  text,
  selectedSubmodule,
  selectedVersion,
}) => (
  <div>
    <div>
      <Code
        value={code}
        options={{
          readOnly: true,
          mode: 'javascript',
        }}
      />
    </div>
    {text && (
      <div>
        <Markdown
          value={text}
          selectedSubmodule={selectedSubmodule}
          selectedVersion={selectedVersion}
        />
      </div>
    )}
  </div>
)
