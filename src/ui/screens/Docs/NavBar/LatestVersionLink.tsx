import { h, FunctionComponent } from 'preact'
import { RouterLink } from 'ui/router'
import { LatestLink } from './style.css'

interface Props {
  latestVersion: string
  selectedDoc: string
}

export const LatestVersionLink: FunctionComponent<Props> = ({ latestVersion, selectedDoc }) => (
  <LatestLink
    tag={RouterLink}
    to={{ name: 'versionDocs', params: { version: latestVersion, doc: selectedDoc } }}
  >
    Switch to latest
  </LatestLink>
)

