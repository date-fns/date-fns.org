import React from 'react'
import classnames from 'classnames'
import { trackAction } from 'app/acts/tracking_acts'

const kind = Math.random() > 0.5 ? 'remote' : 'salary'

export default function NewBanner() {
  return (
    <div className="new_banner">
      <a
        className="new_banner-job"
        href={
          kind === 'remote'
            ? 'https://bit.ly/2YEiBqG'
            : 'https://bit.ly/3lmKQ71'
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="new_banner-header">
          <img
            className="new_banner-logo"
            src="https://firebasestorage.googleapis.com/v0/b/jsjobs-307ba.appspot.com/o/uploads%2Fmanual%2Fupserve.png?alt=media&token=bae7992a-2074-4141-b7b2-2676eaaa8d28"
          />

          <div>
            <div className="new_banner-company">Upserve</div>
            <div className="new_banner-location">Remote</div>
          </div>

          <div className="new_banner-position">
            Senior Frontend Engineer (
            {kind === 'remote' ? 'remote' : '$150K/year'})
          </div>
        </div>

        <div className="new_banner-tags">
          <div className="new_banner-tag">TypeScript</div>
          <div className="new_banner-tag">React</div>
          <div className="new_banner-tag">GraphQL</div>
        </div>
      </a>

      <a
        className="new_banner-link"
        href="https://bit.ly/2EzczjN"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get the hottest JavaScript Jobs right into your inbox
      </a>
    </div>
  )
}
