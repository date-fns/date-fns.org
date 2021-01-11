import { Submodule } from '@date-fns/date-fns-db'
import { h, FunctionComponent } from 'preact'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import { LatestLink } from './style.css'

interface Props {
  latestVersion: string
  selectedSubmodule: Submodule
  selectedDoc: string
}

export const LatestVersionLink: FunctionComponent<Props> = ({
  latestVersion,
  selectedSubmodule,
  selectedDoc,
}) => (
  <LatestLink
    tag={RouterLink}
    to={docLink(selectedDoc, selectedSubmodule, latestVersion)}
  >
    Switch to latest
  </LatestLink>
)
