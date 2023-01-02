import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { RouterContext, RouterLink } from '~/ui/router'
import { bugTemplateText, docIssueTemplateText } from './templateText'
import * as styles from './styles.css'

export const DocLinks = () => {
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
            <RouterLink
              class={styles.link}
              decorated
              to={{
                name: 'docs',
                params: {
                  page: 'Contributing',
                },
              }}
            >
              Suggest edits by sending a PR
            </RouterLink>
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
