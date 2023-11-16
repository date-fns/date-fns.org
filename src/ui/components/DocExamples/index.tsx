import { Fragment, FunctionComponent, h } from 'preact'
import { useMemo } from 'preact/hooks'
import { Code } from '~/ui/components/Code'
import { Markdown } from '~/ui/components/Markdown'
import { SectionHeader } from '../SectionHeader'
import * as styles from './styles.css'

interface Props {
  examples: string[]
  scope?: string
  header?: 'h2' | 'h3'
}

export const DocExamples: FunctionComponent<Props> = ({
  examples,
  scope,
  header,
}) => {
  const richExamples = useMemo(() => enrichExamples(examples), [examples])

  return (
    <section>
      <SectionHeader header="Examples" scope={scope} tag={header} />

      {richExamples.map((example, index) => (
        <div class={styles.codeContainer} key={index}>
          {example.description && (
            <div class={styles.description}>
              <Markdown value={example.description} />
            </div>
          )}

          <Code value={example.code} />
        </div>
      ))}
    </section>
  )
}

interface Example {
  description?: string
  code: string
}

function enrichExamples(examples: string[]): Example[] {
  return examples.map((example) => {
    const captures = example.match(/^((?:\/\/.+\n)*)((?:.*\n?)*)/)
    if (!captures) return { code: example }

    return {
      description: captures[1]
        .split(/\n/)
        .map((str) => str.replace(/^\/\/\s?/, '').trim())
        .join(' '),
      code: captures[2],
    }
  })
}
