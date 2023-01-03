import { packageName } from '@date-fns/docs/consts'
import { db } from '@date-fns/docs/db'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { useRead } from '@typesaurus/preact'
import classNames from 'classnames'
import { FunctionComponent, h } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import { DEFAULT_PAGE } from '~/constants'
import { RouterContext } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import {
  filterPreReleaseVersions,
  getLatestVersion,
  sortVersions,
} from '~/utils/versions'
import { Doc } from './Doc'
import { Finder } from './Finder'
import hamburgerPath from './img/hamburger.svg'
import { NavBar } from './NavBar'
import * as styles from './styles.css'

interface Props {
  selectedSubmodule: DateFnsDocs.Submodule
  selectedVersion?: string
  selectedPage: string
}

export const Docs: FunctionComponent<Props> = ({
  selectedSubmodule,
  selectedVersion: urlSelectedVersion,
  selectedPage,
}) => {
  const { navigate } = useContext(RouterContext)

  useEffect(() => {
    if (!selectedPage) {
      navigate(
        docLink({
          page: DEFAULT_PAGE,
          submodule: selectedSubmodule,
          version: urlSelectedVersion,
        })
      )
    }
  })

  const [dateFnsPackage, { loading }] = useRead(
    db.packages.get(db.packages.id(packageName))
  )

  const [menuOpen, setMenuOpen] = useState(false)

  if (dateFnsPackage) {
    const latestVersion = getLatestVersion(dateFnsPackage.data.versions).version
    const selectedVersion = urlSelectedVersion ?? latestVersion

    return (
      <div class={styles.screen}>
        <div class={styles.navBarContainer}>
          <NavBar
            selectedVersion={selectedVersion}
            latestVersion={latestVersion}
            selectedPage={selectedPage}
            versions={sortVersions(
              filterPreReleaseVersions(
                dateFnsPackage.data.versions,
                selectedVersion
              )
            )}
            selectedSubmodule={selectedSubmodule}
            menuIcon={
              <img src={hamburgerPath} onClick={() => setMenuOpen(!menuOpen)} />
            }
          />
        </div>

        <div class={styles.content}>
          <div
            class={classNames(
              styles.finderContainer,
              menuOpen && styles.finderContainerMenuOpen
            )}
          >
            <Finder
              selectedVersion={selectedVersion}
              selectedPage={selectedPage}
              selectedSubmodule={selectedSubmodule}
              onNavigate={() => setMenuOpen(false)}
            />
          </div>

          <div
            class={classNames(
              styles.docContainer,
              menuOpen && styles.docContainerMenuOpen
            )}
            onClick={menuOpen ? () => setMenuOpen(false) : undefined}
          >
            <Doc
              selectedVersion={selectedVersion}
              selectedPage={selectedPage}
              selectedSubmodule={selectedSubmodule}
            />
          </div>
        </div>
      </div>
    )
  } else if (loading) {
    return <div class={styles.loading}>Loading...</div>
  } else {
    return <div class={styles.loading}>Failed to load package list!</div>
  }
}
