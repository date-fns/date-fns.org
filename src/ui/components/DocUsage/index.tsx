import type { DateFnsDocs } from '@date-fns/docs/types'
import classNames from 'classnames'
import { Fragment, FunctionComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Code } from '~/ui/components/Code'
import { Markdown } from '~/ui/components/Markdown'
import { Usage } from '~/utils/docs'
import { SectionHeader } from '../SectionHeader'
import * as styles from './styles.css'

const LOCALSTORAGE_KEY = 'usageSource'
const DEFAULT_SOURCE = 'commonjs'
const LS_SELECTED_OPTIONS_KEY = 'usageSelectedOptions'

interface Props {
  usage: Usage
  usageTabs: string[]
  scope?: string
  header?: 'h2' | 'h3'
}

export const DocUsage: FunctionComponent<Props> = ({
  usageTabs,
  usage,
  scope,
  header,
}) => {
  const [source, setSource] = useState(DEFAULT_SOURCE)
  const [selectedOptions, setSelectedOptionsState] = useState<
    Record<string, string>
  >(getSelectedOptions())

  function setSelectedOptions(newOptions: Record<string, string>) {
    setSelectedOptionsState(newOptions)
    try {
      window.localStorage.setItem(
        LS_SELECTED_OPTIONS_KEY,
        JSON.stringify(newOptions)
      )
    } catch (_e) {}
  }

  useEffect(() => {
    const localStorageSource = window.localStorage.getItem(LOCALSTORAGE_KEY)

    if (localStorageSource) {
      setSource(localStorageSource)
    } else {
      window.localStorage.setItem(LOCALSTORAGE_KEY, source)
    }
  }, [])

  const selectedTab = usageTabs.includes(source) ? source : usageTabs[0]
  const selectedUsage = usage[selectedTab]

  useEffect(() => {
    if (!('options' in selectedUsage)) return

    if (!selectedOptions[selectedTab]) {
      const firstOption = selectedUsage.options[0]
      setSelectedOptions({
        ...selectedOptions,
        [selectedTab]: firstOption,
      })
    }
  }, [selectedTab, selectedUsage])

  return (
    <section>
      <SectionHeader header="Usage" scope={scope} tag={header} />

      <ul class={styles.options}>
        {usageTabs.map((usageTab) => {
          const usageItem = usage[usageTab]
          if (!usageItem) return null

          return (
            <li class={styles.option} key={usageTab}>
              <a
                class={classNames(
                  styles.optionLink,
                  selectedTab === usageTab && styles.optionLinkIsCurrent
                )}
                href="#"
                onClick={(e) => {
                  // FIXME:
                  // trackAction('Changed Usage Source', { source })
                  e.preventDefault()
                  setSource(usageTab)
                  window.localStorage.setItem(LOCALSTORAGE_KEY, usageTab)
                }}
              >
                {usageItem.title}

                {'options' in usageItem && (
                  <select
                    class={styles.optionSelect}
                    onChange={(e) => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [usageTab]: (e.target as HTMLInputElement).value,
                      })
                    }}
                    value={
                      selectedOptions[usageTab] ||
                      Object.values(usageItem.options)[0]
                    }
                  >
                    {Object.entries(usageItem.options).map(([title, value]) => (
                      <option value={value} key={value}>
                        {title}
                      </option>
                    ))}
                  </select>
                )}
              </a>
            </li>
          )
        })}
      </ul>

      <Content
        code={
          'options' in selectedUsage
            ? selectedUsage.code(
                selectedOptions[selectedTab] ||
                  Object.values(selectedUsage.options)[0]
              )
            : selectedUsage.code
        }
        text={selectedUsage.text}
      />
    </section>
  )
}

function getSelectedOptions() {
  try {
    return JSON.parse(
      window.localStorage.getItem(LS_SELECTED_OPTIONS_KEY) || '{}'
    )
  } catch (_e) {
    return {}
  }
}

interface ContentProps {
  code: string
  text?: string
}

export const Content: FunctionComponent<ContentProps> = ({ code, text }) => (
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
