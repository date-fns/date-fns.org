import { h, FunctionComponent } from 'preact'
import { NavBar } from './NavBar'
import { Finder } from './Finder'
import { Doc } from './Doc'
import {
  Screen,
  Content,
  Loading,
  DocContainer,
  FinderContainer,
  NavBarContainer,
} from './style.css'
import {
  filterPreReleaseVersions,
  getLatestVersion,
  sortVersions,
} from '~/utils/versions'
import hamburgerPath from './img/hamburger.svg'
import { useContext, useEffect, useState } from 'preact/hooks'
import { RouterContext } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import { DEFAULT_PAGE } from '~/constants'
import { useRead } from '@typesaurus/preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { db } from '@date-fns/docs/db'
import { packageName } from '@date-fns/docs/consts'

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
      <Screen>
        <NavBarContainer>
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
        </NavBarContainer>

        <Content>
          <FinderContainer menuOpen={menuOpen}>
            <Finder
              selectedVersion={selectedVersion}
              selectedPage={selectedPage}
              selectedSubmodule={selectedSubmodule}
              onNavigate={() => setMenuOpen(false)}
            />
          </FinderContainer>

          <DocContainer
            menuOpen={menuOpen}
            onClick={menuOpen ? () => setMenuOpen(false) : undefined}
          >
            <Doc
              selectedVersion={selectedVersion}
              selectedPage={selectedPage}
              selectedSubmodule={selectedSubmodule}
            />
          </DocContainer>
        </Content>
      </Screen>
    )
  } else if (loading) {
    return <Loading>Loading...</Loading>
  } else {
    return <Loading>Failed to load package list!</Loading>
  }
}
