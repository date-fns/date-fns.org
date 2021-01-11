import { h, FunctionComponent } from 'preact'
import { NavBar } from './NavBar'
import { Finder } from './Finder'
import { Doc } from './Doc'
import { Container, Content, Loading } from './style.css'
import { useQuery } from '@typesaurus/preact'
import { where } from 'typesaurus'
import { db, PACKAGE_NAME, Submodule } from '@date-fns/date-fns-db'
import {
  filterPreReleaseVersions,
  getLatestVersion,
  sortVersions,
} from '~/utils/versions'

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
  const [packages, { loading }] = useQuery(db.packages, [
    where('name', '==', PACKAGE_NAME),
  ])

  if (packages && packages.length === 1) {
    const dateFnsPackage = packages[0].data
    const latestVersion = getLatestVersion(dateFnsPackage.versions).version
    const selectedVersion = urlSelectedVersion ?? latestVersion

    return (
      <Container>
        <NavBar
          selectedVersion={selectedVersion}
          latestVersion={latestVersion}
          selectedPage={selectedPage}
          versions={sortVersions(
            filterPreReleaseVersions(dateFnsPackage.versions)
          )}
          selectedSubmodule={selectedSubmodule}
        />

        <div>
          <Finder
            selectedVersion={selectedVersion}
            selectedPage={selectedPage}
            selectedSubmodule={selectedSubmodule}
          />
        </div>

        <Content>
          <Doc
            selectedVersion={selectedVersion}
            selectedPage={selectedPage}
            selectedSubmodule={selectedSubmodule}
          />
        </Content>
      </Container>
    )
  } else if (loading) {
    return <Loading>Loading...</Loading>
  } else {
    return <Loading>Failed to load package list!</Loading>
  }
}
