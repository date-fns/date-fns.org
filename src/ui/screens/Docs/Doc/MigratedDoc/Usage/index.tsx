import { h, FunctionComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { MigratedDocUsage } from 'db/migratedDoc'
import { Options, Option, OptionLink } from './style.css'
import { Content } from './Content'

const LOCALSTORAGE_KEY = 'usageSource'
const DEFAULT_SOURCE = 'commonjs'

interface Props {
  usage: MigratedDocUsage,
  usageTabs: string[]
  selectedVersion: string
}

type FIXME = any

export const Usage: FunctionComponent<Props> = ({ usageTabs, usage, selectedVersion }) => {
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
      <h2 id='usage'>
        Usage
        <a href='#usage' className='doc-header_link'>
          #
        </a>
      </h2>

      <Options tag="ul">
        {usageTabs.map((usageTab) => {
          const usageItem = usage[usageTab]

          if (!usageItem) {
            return null
          }

          return (
            <Option tag="li" key={usageTab}>
              <OptionLink
                isCurrent={selectedTab === usageTab}
                tag="a"
                href='#'
                onClick={(e: FIXME) => {
                  // FIXME:
                  // trackAction('Changed Usage Source', { source })
                  e.preventDefault()
                  setSource(usageTab)
                  window.localStorage.setItem('usageSource', source)
                }}
              >
                {usageItem.title}
              </OptionLink>
            </Option>
          )
        })}
      </Options>

      <Content
        code={selectedUsage.code}
        text={selectedUsage.text}
        selectedVersion={selectedVersion}
      />
    </section>
  )
}
