import React from 'react'
import classnames from 'classnames'

export default function OpenCollectiveBanner({ size }) {
  return (
    <a
      className="oc_banner"
      className={classnames('oc_banner', {
        'is-small': size === 'small'
      })}
      href="https://opencollective.com/date-fns"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="oc_banner-inner">
        <div className="oc_banner-emoji_wrapper">
          <Emoji />
        </div>
        <div className="oc_banner-text">
          Please help us to make the best date library for JavaScript. We need
          your support! <Icon />
        </div>
      </div>
    </a>
  )
}

function Emoji() {
  return (
    <svg viewBox="0 0 47.5 47.5" className="oc_banner-emoji">
      <defs>
        <clipPath id="prefix__a" clipPathUnits="userSpaceOnUse">
          <path d="M0 38h38V0H0v38z" />
        </clipPath>
      </defs>
      <g clipPath="url(#prefix__a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
        <path
          d="M31 15c-3 0-7-8-7-10 0-3 2-4 2-4h11v10s-4 4-6 4M7 15c3 0 7-8 7-10 0-3-2-4-2-4H1v10s4 4 6 4"
          fill="#2a6797"
        />
        <path
          d="M26 26a2 2 0 0 1-4 0v7.277c.596.347 1 .985 1 1.723a2 2 0 0 1-4 0 2 2 0 0 1-4 0c0-.738.405-1.376 1-1.723V26a2 2 0 0 1-4 0l-1-11.526V10h5V9h6v1h5v4.474L26 26z"
          fill="#c1694f"
        />
        <path
          d="M25 21l-1 12a2 2 0 0 1-4 0V13c0-6 6-9 6-9s6 4 6 9l-7 8zM16 35a2 2 0 0 1-2-2l-1-12-7-8c0-5 6-9 6-9s6 3 6 9v20a2 2 0 0 1-2 2"
          fill="#d79e84"
        />
        <path
          d="M12 30l-6 3-1-2 6-2 1 1zM26 30l6 3 1-2-6-2-1 1zM10 26l-6 1-1-2h7v1zM28 26l6 1 1-2h-7v1z"
          fill="#fdcb58"
        />
      </g>
    </svg>
  )
}

function Icon() {
  return (
    <svg viewBox="0 0 512 512" className="oc_banner-icon">
      <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zM256 40c118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216zm86.6 224.5l-115.1 115c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L303 256l-99.5-99.5c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l115.1 115c4.6 4.8 4.6 12.4-.1 17.1z" />
    </svg>
  )
}
