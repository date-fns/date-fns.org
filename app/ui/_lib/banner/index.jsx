import React from 'react'
import classnames from 'classnames'
import { trackAction } from 'app/acts/tracking_acts'

const kind = Math.random() > 0.5 ? 'subscribe' : 'recommend'

export default function Banner({ size }) {
  return (
    <a
      className="banner"
      className={classnames('banner', {
        'is-small': size === 'small'
      })}
      href={
        kind === 'subscribe'
          ? 'https://jobs.date-fns.org'
          : 'https://jobs.date-fns.org/#recommend'
      }
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAction('Banner click', { kind })}
    >
      <div className="banner-inner">
        <div className="banner-emoji_wrapper">
          <Emoji />
        </div>
        <div className="banner-text">
          {kind === 'subscribe'
            ? 'Get jobs worth sharing to your email! JavaScript jobs by date-fns'
            : "Know someone who's looking for JavaScript devs? Recommend us a job!"}{' '}
          <Icon />
        </div>
      </div>
    </a>
  )
}

function Emoji() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
      <defs>
        <clipPath id="a">
          <path d="M0 38h38V0H0v38z" />
        </clipPath>
      </defs>
      <g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
        <path
          d="M34.3 19.7s1.1 1.6-.5 2.7C32 23.6 31 22 31 22l-5.2-7.6-.6.9 7.2 10.6s1.2 1.6-.5 2.8c-1.6 1.1-2.8-.5-2.8-.5l-6.8-10-.8.6 8 11.6s1 1.6-.6 2.7c-1.6 1.2-2.7-.5-2.7-.5l-8-11.6-.9.5 7.5 10.9s1 1.6-.6 2.8c-1.6 1-2.7-.6-2.7-.6l-7.9-11.4-.6-1-.6-.8A10 10 0 0 0 15 7.4c-.6-.8-1.4-.2-1.4-.2C17 12.2 16 17.7 11 21l1.5 7.3s.5 1.9-1.4 2.4c-2 .6-2.5-1.3-2.5-1.3l-1.6-5c-.7-2-1.4-4-2.4-5.9A12 12 0 0 1 25.8 7.3l8.5 12.4z"
          fill="#d99e82"
        />
        <path d="M3 30H1a7 7 0 0 0 7 7v-2a5 5 0 0 1-5-5" fill="#77b255" />
        <path
          d="M5 25H3a10 10 0 0 0 10 10v-2a8 8 0 0 1-8-8M30 1v2c3 0 5 2 5 5h2c0-4-3-7-7-7"
          fill="#77b255"
        />
        <path d="M25 3v2c4 0 8 4 8 8h2c0-6-4-10-10-10" fill="#77b255" />
      </g>
    </svg>
  )
}

function Icon() {
  return (
    <svg viewBox="0 0 512 512" className="banner-icon">
      <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zM256 40c118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216zm86.6 224.5l-115.1 115c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L303 256l-99.5-99.5c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l115.1 115c4.6 4.8 4.6 12.4-.1 17.1z" />
    </svg>
  )
}
