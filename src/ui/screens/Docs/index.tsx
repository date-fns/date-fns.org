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
import { useQuery } from '~/utils/useQuery'
import { where } from 'typesaurus'
import { db, PACKAGE_NAME, Submodule } from '@date-fns/date-fns-db'
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

interface Props {
  selectedSubmodule: Submodule
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

  const [packages, { loading }] = useQuery(db.packages, [
    where('name', '==', PACKAGE_NAME),
  ])

  const [menuOpen, setMenuOpen] = useState(false)

  if (packages && packages.length === 1) {
    const dateFnsPackage = packages[0].data
    const latestVersion = getLatestVersion(dateFnsPackage.versions).version
    const selectedVersion = urlSelectedVersion ?? latestVersion

    return (
      <Screen>
        <NavBarContainer>
          <NavBar
            selectedVersion={selectedVersion}
            latestVersion={latestVersion}
            selectedPage={selectedPage}
            versions={sortVersions(
              filterPreReleaseVersions(dateFnsPackage.versions, selectedVersion)
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
