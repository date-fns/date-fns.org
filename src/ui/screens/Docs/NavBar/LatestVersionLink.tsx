import { Submodule } from '@date-fns/date-fns-db'
import { h, FunctionComponent } from 'preact'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import { LatestLink } from './style.css'

interface Props {
  latestVersion: string
  selectedSubmodule: Submodule
  selectedPage: string
}

export const LatestVersionLink: FunctionComponent<Props> = ({
  latestVersion,
  selectedSubmodule,
  selectedPage,
}) => (
  <LatestLink
    tag={RouterLink}
    to={docLink({
      page: selectedPage,
      submodule: selectedSubmodule,
      version: latestVersion,
    })}
  >
    Switch to latest
  </LatestLink>
)
