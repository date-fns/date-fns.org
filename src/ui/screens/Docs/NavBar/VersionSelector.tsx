import { h, FunctionComponent } from 'preact'
import { VersionPreview } from 'db'
import { Selector, Label, Select } from './style.css'
import { VersionOption } from './VersionOption'
import { useContext } from 'preact/hooks'
import { RouterContext } from 'ui/router'
import { LatestVersionLink } from './LatestVersionLink'

interface Props {
  selectedVersion: string
  latestVersion: string
  selectedDoc: string
  versions: VersionPreview[]
}

type FIXME = any

export const VersionSelector: FunctionComponent<Props> = ({ selectedVersion, latestVersion, selectedDoc, versions }) => {
  const { navigate } = useContext(RouterContext)

  return (
    <Selector tag="label" className="docs_nav_bar-selector">
      <Label tag="span">Version:</Label>
  
      <Select
        tag="select"
        value={selectedVersion}
        className="docs_nav_bar-select"
        onChange={(e: FIXME) => navigate({ name: 'versionDocs', params: { version: e.target.value, doc: selectedDoc } })}
      >
        {versions.map(version => <VersionOption version={version.version} key={version.version} />)}
      </Select>

      {selectedVersion !== latestVersion && <LatestVersionLink
        latestVersion={latestVersion}
        selectedDoc={selectedDoc}
      />}
    </Selector>
  )
}
