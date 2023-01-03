import { h, FunctionComponent } from 'preact'
import { Code } from '~/ui/components/Code'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import isArray from 'lodash/isArray'
import { Markdown } from '~/ui/components/Markdown'
import * as styles from './styles.css'

interface Props {
  examples: string[] | string
}

export const DocExamples: FunctionComponent<Props> = ({ examples }) => (
  <section>
    <h2 id="examples">
      Examples
      <DocHeaderAnchor anchor="examples" />
    </h2>

    {isArray(examples) ? (
      examples.map((example, index) => (
        <div class={styles.codeContainer} key={index}>
          <Code value={example} />
        </div>
      ))
    ) : (
      <Markdown value={examples} />
    )}
  </section>
)
