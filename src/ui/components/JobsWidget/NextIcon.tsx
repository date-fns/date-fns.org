import { FunctionComponent, h } from 'preact'
import * as styles from './styles.css'

export const NextIcon: FunctionComponent = () => {
  return (
    <svg
      class={styles.nextIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M244.5 230.9L52.5 71.4A32 32 0 000 96v320a32 32 0 0052.5 24.6l192-160.5a32.1 32.1 0 000-49.2zM224 255.4L32 416V96l192 159.4zm276.5-24.5l-192-159.4A32 32 0 00256 96v320a32 32 0 0052.5 24.6l192-160.5a32.1 32.1 0 000-49.2zM480 255.4L288 416V96l192 159.4z"
      />
    </svg>
  )
}
