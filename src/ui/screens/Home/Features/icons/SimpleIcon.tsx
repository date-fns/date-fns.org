import { h } from 'preact'

export default function SimpleIcon() {
  return (
    <svg viewBox="0 0 32 26" style={{ height: '50%', marginTop: '-3px' }}>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <polygon
          stroke="var(--icon-color)"
          points="16 1 31 25.1463415 1 25.1463415 "
        ></polygon>
      </g>
    </svg>
  )
}
