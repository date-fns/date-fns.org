/**
 * Returns GitHub issue template URL with prefilled title and body
 */
export default function templateText(): string {
  const url =
    'https://github.com/tan75/issue-template-test/issues/new?assignees=&labels=&template=bug_report.md&'

  const title = encodeURIComponent('Bug report')

  const body = encodeURIComponent(
    '### Describe the bug\r\n#### \uD83D\uDCBB Code if available\r\n\r\n\r\n\r\n#### \uD83D\uDE41  Actual behavior\r\n\r\n\r\n\r\n#### \uD83D\uDE42  Expected behavior\r\n\r\n\r\n\r\n#### \uD83C\uDFAE  Playground link if available\r\n\r\n\r\n\r\n\r\n#### Software used:\r\n - Browser [e.g. chrome, safari]\r\n - date-fns version [e.g. 2.24]\r\n\r\n\r\n#### Additional info\r\nAdd any other info about the problem here.\r\n'
  )
  return url + 'title=' + title + '&body=' + body
}
