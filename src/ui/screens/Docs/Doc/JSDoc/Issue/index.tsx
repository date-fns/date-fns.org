import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { Link } from '~/ui/components/Home/style.css'
import { RouterContext, RouterLink } from '~/ui/router'
import templateText from './templateText'

export default function Issue() {
  const { location } = useContext(RouterContext)
  const pageParams = location.params || { version: '' }
  let pageUrl = ''

  if ('version' in pageParams) {
    pageUrl = `https://date-fns.org/${pageParams.version}/docs/${location.params?.page}`
  }

  const fnName = location.params?.page || ''
  const issueUrl = templateText(pageUrl, fnName)

  return (
    <section>
      <h2 id="issue">Found an issue with this page?</h2>

      <div>
        <a href={issueUrl} target="_blank">
          Report a bug in the function.
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
          Suggest edits or report a problem in the documentation.
        </Link>
      </div>
    </section>
  )
}
