import { h, FunctionComponent } from 'preact'
import type { DateFnsDocs } from '@date-fns/docs/types'
import { docLink } from '~/ui/router/docLink'
import { useContext } from 'preact/hooks'
import { RouterContext } from '~/ui/router'
import * as styles from './styles.css'
import { parseMajorVersion } from '~/utils/docs'

const SUBMODULE_LABELS: Record<DateFnsDocs.Submodule, string> = {
  default: 'Default',
  fp: 'FP',
}

interface Props {
  selectedSubmodule: DateFnsDocs.Submodule
  selectedPage: string
  selectedVersion: string
  submodules: DateFnsDocs.Submodule[]
}

type FIXME = any

export const SubmoduleSelector: FunctionComponent<Props> = ({
  selectedSubmodule,
  selectedPage,
  selectedVersion,
  submodules,
}) => {
  const { navigate } = useContext(RouterContext)

  if (submodules.length === 1 && submodules.includes(selectedSubmodule)) {
    return null
  }

  // For v3 don't show submodule selector and render FP section instead
  const version = parseMajorVersion(selectedVersion)
  if (version >= 3) return null

  return (
    <label class={styles.selector}>
      <span class={styles.label}>Submodule:</span>

      <select
        class={styles.select}
        value={selectedSubmodule}
        onChange={(e: FIXME) =>
          navigate(
            docLink({
              page: selectedPage,
              submodule: e.target.value,
              version: selectedVersion,
            })
          )
        }
      >
        <option key="title" disabled>
          Submodule
        </option>

        {submodules.map((submodule) => (
          <option key={submodule} value={submodule}>
            {SUBMODULE_LABELS[submodule]}
          </option>
        ))}
      </select>
    </label>
  )
}
