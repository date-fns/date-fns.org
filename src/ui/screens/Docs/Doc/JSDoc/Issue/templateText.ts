/**
 * Returns GitHub issue template URL with prefilled title and body
 */
export default function templateText(url: string, fn: string): string {
  const githubUrl =
    'https://github.com/date-fns/date-fns/issues/new?assignees=&labels=&template=bug_report.md'

  const title = encodeURIComponent(`Problem in ${fn} documentation`)
  const body = encodeURIComponent(`
    ## The problem 

    <!-- Describe the problem in the documentation -->

    ## Suggested edits

    <!-- Suggest how the documentation can be improved -->
  `)
  return githubUrl + '&title=' + title + '&body=' + body
}
