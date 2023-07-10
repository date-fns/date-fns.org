import { Fragment, FunctionComponent, h } from 'preact'
import { RouterLink } from '~/ui/router'
import { docLink } from '~/ui/router/docLink'
import { parseMajorVersion } from '~/utils/docs'
import * as styles from './styles.css'

interface Props {
  name: string
  pure: boolean | undefined
  selectedVersion: string
  hasOptions: boolean
}

export const FP: FunctionComponent<Props> = ({
  name,
  pure,
  selectedVersion,
  hasOptions,
}) => {
  const version = selectedVersion && parseMajorVersion(selectedVersion)
  if (!version || version < 3) return null

  return pure ? (
    <div class={styles.fpNote}>
      🦄 The function is also available in the FP submodule as{' '}
      <code>{name}</code>
      {hasOptions && (
        <Fragment>
          {' '}
          and <code>{name}WithOptions</code>
        </Fragment>
      )}
      .{' '}
      <RouterLink
        decorated
        to={docLink({
          page: 'FP-Guide',
          version: selectedVersion,
        })}
      >
        Read more about it in the FP guide
      </RouterLink>
      .
    </div>
  ) : (
    <div class={styles.fpNote}>
      ⚠️ Please note that this function is not present in the FP submodule as it
      uses <code>Date.now()</code> internally hence impure and can't be safely
      curried.
    </div>
  )
}
