import { h, FunctionComponent } from 'preact'

interface Props {
  version: string
}

export const VersionOption: FunctionComponent<Props> = ({ version }) => (
  <option value={version}>
    {version}
  </option>
)