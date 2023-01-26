import { h, Fragment, FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { Content } from './Content'
import { DocHeaderAnchor } from '~/ui/components/DocHeaderAnchor'
import * as styles from './styles.css'
import classNames from 'classnames'
import { SectionHeader } from '../SectionHeader'

const LOCALSTORAGE_KEY = 'usageSource'
const DEFAULT_SOURCE = 'commonjs'

interface Props {
  usage: DateFnsDocs.FnUsage
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

  return (
    <section>
      <SectionHeader header="Usage" scope={scope} tag={header} />

      <ul class={styles.options}>
        {usageTabs.map((usageTab) => {
          const usageItem = usage[usageTab]

          if (!usageItem) {
            return null
          }

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
              </a>
            </li>
          )
        })}
      </ul>

      <Content code={selectedUsage.code} text={selectedUsage.text} />
    </section>
  )
}
