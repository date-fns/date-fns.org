import { h, FunctionComponent } from 'preact'
import { Code } from 'ui/components/Code'
import { DocHeaderAnchor } from 'ui/components/DocHeaderAnchor'

interface Props {
  syntax: string
}

export const Syntax: FunctionComponent<Props> = ({ syntax }) => (
  <section>
    <h2 id='syntax'>
      Syntax
      <DocHeaderAnchor anchor="syntax" />
    </h2>

    <Code
      value={syntax}
      options={{
        readOnly: true,
        mode: 'javascript'
      }}
    />
  </section>
)
