import { h, Fragment, FunctionComponent } from 'preact'
import { Code } from '~/ui/components/Code'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import isArray from 'lodash/isArray'
import { Markdown } from '~/ui/components/Markdown'
import * as styles from './styles.css'

interface Props {
  examples: string[] | string
  header?: 'h2' | 'h3'
}

export const DocExamples: FunctionComponent<Props> = ({ examples, header }) => {
  const headerContent = (
    <>
      Examples
      <DocHeaderAnchor anchor="examples" />
    </>
  )

  return (
    <section>
      {header === 'h2' ? (
        <h2 id="examples">{headerContent}</h2>
      ) : (
        <h3 id="description">{headerContent}</h3>
      )}

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
}
