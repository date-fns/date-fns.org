import { h, FunctionComponent } from 'preact'
import { Submodule, VersionPreview } from '@date-fns/date-fns-db'
import { Selector, Label, Select } from './style.css'
import { useContext } from 'preact/hooks'
import { RouterContext } from '~/ui/router'
import { LatestVersionLink } from './LatestVersionLink'
import { docLink } from '~/ui/router/docLink'

interface Props {
  selectedVersion: string
  latestVersion: string
  selectedPage: string
  selectedSubmodule: Submodule
  versions: VersionPreview[]
}

type FIXME = any

export const VersionSelector: FunctionComponent<Props> = ({
  selectedVersion,
  latestVersion,
  selectedPage,
  selectedSubmodule,
  versions,
}) => {
  const { navigate } = useContext(RouterContext)

  return (
    <Selector tag="label">
      <Label tag="span">Version:</Label>

      <Select
        tag="select"
        value={selectedVersion}
        onChange={(e: FIXME) =>
          navigate(
            docLink({
              page: selectedPage,
              submodule: selectedSubmodule,
              version: e.target.value,
            })
          )
        }
      >
        {versions.map(({ version }) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </Select>

      {selectedVersion !== latestVersion && (
        <LatestVersionLink
          latestVersion={latestVersion}
          selectedSubmodule={selectedSubmodule}
          selectedPage={selectedPage}
        />
      )}
    </Selector>
  )
}
