import { h, FunctionComponent } from 'preact'
import { Label, Select, Selector } from './style.css'
import { Submodule } from '@date-fns/date-fns-db'
import { docLink } from '~/ui/router/docLink'
import { useContext } from 'preact/hooks'
import { RouterContext } from '~/ui/router'

const SUBMODULE_LABELS: { [k in Submodule]: string } = {
  [Submodule.Default]: 'Default',
  [Submodule.FP]: 'FP',
}

interface Props {
  selectedSubmodule: Submodule
  selectedPage: string
  selectedVersion: string
  submodules: Submodule[]
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

  return (
    <Selector tag="label">
      <Label tag="span">Submodule:</Label>

      <Select
        tag="select"
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
        {submodules.map((submodule) => (
          <option key={submodule} value={submodule}>
            {SUBMODULE_LABELS[submodule]}
          </option>
        ))}
      </Select>
    </Selector>
  )
}
