import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { Link } from '~/ui/components/Home/style.css'
import { RouterContext, RouterLink } from '~/ui/router'
import { bugTemplateText, docIssueTemplateText } from './templateText'

export default function Issue() {
  const { location } = useContext(RouterContext)
  const pageUrl = window.location.href
  const fnName = location.params?.page || ''
  const docIssueUrl = docIssueTemplateText(pageUrl, fnName)
  const bugIssueUrl = bugTemplateText(pageUrl, fnName)

  return (
    <section>
      <h2 id="issue">Found an issue with this page?</h2>

      <ul>
        <li>
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
              Suggest edits by sending a PR
            </Link>
          </div>
        </li>

        <li>
          <div>
            <a href={docIssueUrl} target="_blank" rel="noreferrer noopener">
              Open an issue with this documentation
            </a>
          </div>
        </li>

        <li>
          <div>
            <a href={bugIssueUrl} target="_blank" rel="noreferrer noopener">
              Report a bug in the function
            </a>
          </div>
        </li>
      </ul>
    </section>
  )
}
