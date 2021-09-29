import { h } from 'preact'
import { Link } from '~/ui/components/Home/style.css'
import { RouterLink } from '~/ui/router'
import templateText from './templateText'

export default function Issue() {
  const url = templateText()

  return (
    <section>
      <h2 id="issue">Found an issue with this page?</h2>

      <div>
        <a href={url} target="_blank">
          Report a problem with this page here
        </a>
      </div>

      <div>
        <Link
          decorated
          tag={RouterLink}
          to={{
            name: 'docs',
            params: {
              page: 'Contributing',
            },
          }}
        >
          Want to fix the issue yourself by creating a PR? - See our
          Contribution manual.
        </Link>
      </div>
    </section>
  )
}
