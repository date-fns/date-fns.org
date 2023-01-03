import type { DateFnsDocs } from '@date-fns/docs/types'
import { h, FunctionComponent } from 'preact'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import * as styles from './styles.css'

interface Props {
  latestVersion: string
  selectedSubmodule: DateFnsDocs.Submodule
  selectedPage: string
}

export const LatestVersionLink: FunctionComponent<Props> = ({
  latestVersion,
  selectedSubmodule,
  selectedPage,
}) => (
  <RouterLink
    class={styles.latestLink}
    to={docLink({
      page: selectedPage,
      submodule: selectedSubmodule,
      version: latestVersion,
    })}
  >
    Switch to latest
  </RouterLink>
)
