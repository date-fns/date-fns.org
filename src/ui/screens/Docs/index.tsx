import { h, FunctionComponent } from 'preact'
import { NavBar } from './NavBar'
import { Finder } from './Finder'
import { Doc } from './Doc'
import { Container, Content, Loading } from './style.css'
import { Submodule } from '~/types/submodule'
import { useState } from 'preact/hooks'
import { useQuery } from '@typesaurus/preact'
import { where } from 'typesaurus'
import { db, PACKAGE_NAME } from '@date-fns/date-fns-db'
import {
  filterPreReleaseVersions,
  getLatestVersion,
  sortVersions,
} from '~/utils/versions'

interface Props {
  // TODO: rename to currentVersion
  selectedVersion?: string
  // TODO: rename to currentDoc
  selectedDoc: string
}

export const Docs: FunctionComponent<Props> = ({
  selectedVersion: urlSelectedVersion,
  selectedDoc,
}) => {
  // TODO: rename to currentSubmodule
  const [selectedSubmodule, setSelectedSubmodule] = useState(Submodule.Default)
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
          selectedDoc={selectedDoc}
          versions={sortVersions(
            filterPreReleaseVersions(dateFnsPackage.versions)
          )}
        />

        <div>
          <Finder
            selectedVersion={selectedVersion}
            selectedDoc={selectedDoc}
            selectedSubmodule={selectedSubmodule}
          />
        </div>

        <Content>
          <Doc selectedVersion={selectedVersion} selectedDoc={selectedDoc} />
        </Content>
      </Container>
    )
  } else if (loading) {
    return <Loading>Loading...</Loading>
  } else {
    return <Loading>Failed to load package list!</Loading>
  }
}
