import isArray from 'lodash/isArray'
import { Fragment, FunctionComponent, h } from 'preact'
import { Code } from '~/ui/components/Code'
import { Markdown } from '~/ui/components/Markdown'
import { SectionHeader } from '../SectionHeader'
import * as styles from './styles.css'

interface Props {
  examples: string[] | string
  scope?: string
  header?: 'h2' | 'h3'
}

export const DocExamples: FunctionComponent<Props> = ({
  examples,
  scope,
  header,
}) => (
  <section>
    <SectionHeader header="Examples" scope={scope} tag={header} />

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
