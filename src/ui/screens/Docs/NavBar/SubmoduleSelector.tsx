import { h, FunctionComponent } from 'preact'
import { Label, Select, Selector } from './style.css'
import { Submodule, SUBMODULES } from '@date-fns/date-fns-db'
import { docLink } from '~/ui/router/docLink'
import { useContext } from 'preact/hooks'
import { RouterContext } from '~/ui/router'

const SUBMODULE_LABELS: { [k in Submodule]: string } = {
  [Submodule.Default]: 'Default',
  [Submodule.FP]: 'FP',
}

interface Props {
  selectedSubmodule: Submodule
  selectedDoc: string
  selectedVersion: string
}

type FIXME = any

export const SubmoduleSelector: FunctionComponent<Props> = ({
  selectedSubmodule,
  selectedDoc,
  selectedVersion,
}) => {
  const { navigate } = useContext(RouterContext)

  return (
    <Selector tag="label">
      <Label tag="span">Submodule:</Label>

      <Select
        tag="select"
        value={selectedSubmodule}
        onChange={(e: FIXME) =>
          navigate(docLink(selectedDoc, e.target.value, selectedVersion))
        }
      >
        {SUBMODULES.map((submodule) => (
          <option key={submodule} value={submodule}>
            {SUBMODULE_LABELS[submodule]}
          </option>
        ))}
      </Select>
    </Selector>
  )
}

// function SubmoduleSelector({
//   docId,
//   docs,
//   selectedSubmodule,
//   selectedVersion,
//   selectedVersionTag,
//   routeData
// }) {
//   const relatedDocs = docs
//     .chain(docs =>
//       Either.fromNullable(docs.pages.find(page => page.urlId === docId))
//     )
//     .chain(page => Either.fromNullable(page.relatedDocs))

//   return selectedVersion
//     .chain(version =>
//       areSubmodulesAvailable(version) ? Either.Right() : Either.Left()
//     )
//     .fold(
//       () => null,
//       () =>
//     )
// }
