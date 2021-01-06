import { h, FunctionComponent } from 'preact'
import { Code } from 'ui/components/Code'
import { DocHeaderAnchor } from 'ui/components/DocHeaderAnchor'
import { CodeContainer } from './style.css'

interface Props {
  examples: string[]
}

export const Examples: FunctionComponent<Props> = ({ examples }) => (
  <section>
    <h2 id='examples'>
      Examples
      <DocHeaderAnchor anchor="examples" />
    </h2>

    {examples.map((example, index) => {
      return (
        <CodeContainer key={index}>
          <Code
            value={example}
            options={{
              readOnly: true,
              mode: 'javascript'
            }}
          />
        </CodeContainer>
      )
    })}
  </section>
)
