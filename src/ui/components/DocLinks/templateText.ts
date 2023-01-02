const githubUrl =
  'https://github.com/date-fns/date-fns/issues/new?assignees=&labels=&template=bug_report.md'

/**
 * Returns GitHub document issue template URL with prefilled title and body
 */
export function docIssueTemplateText(url: string, fn: string): string {
  const title = encodeURIComponent(`Problem in ${fn} documentation`)
  const body = encodeURIComponent(`
   There is an issue with the [${fn} documentation](${url})

  ### The problem with ${fn} documentation

  <!-- Describe the problem in the documentation -->

  ### Suggested edits

  <!-- Suggest how the documentation can be improved -->
  `)
  return githubUrl + '&title=' + title + '&body=' + body
}

/**
 * Returns GitHub function issue template URL with prefilled title and body
 */
export function bugTemplateText(url: string, fn: string): string {
  const title = encodeURIComponent(`Problem with ${fn} function`)

  const body = encodeURIComponent(`
  There is an issue with the [${fn} function](${url})

  ## The problem

  ### 💻 Code demonstrating the problem

  <!-- Demonstrate the problem -->

  \`\`\`js
  import { fn } from 'date-fns'

  fn()
  //=> Problematic output
  \`\`\`

  ### 🙁 Actual behavior

  <!-- Describe what you received -->

  ### 🙂 Expected behavior

  <!-- Describe what you expected to get -->

  ## Debug information

  - date-fns version: <!-- Fill in the date-fns version you use -->
  - Browser/Node.js version: <!-- Fill in the envrionment version (i.e. Chrome 94.0.4606.61) -->
  - Your timezone: <!-- Fill in your timezone name (i.e. Asia/Singapore) -->
  - Your current time: <!-- Fill in the time when did you tested the probmlem (i.e. 16:20) -->

  `)
  return githubUrl + '&title=' + title + '&body=' + body
}
