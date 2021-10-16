const githubUrl =
  'https://github.com/date-fns/date-fns/issues/new?assignees=&labels=&template=bug_report.md'

/**
 * Returns GitHub document issue template URL with prefilled title and body
 */
export function docIssueTemplateText(url: string, fn: string): string {
  const title = encodeURIComponent(`Problem in ${fn} documentation`)
  const body = encodeURIComponent(`
   There is an issue with the [${fn} documentation](${url})

  ### The problem with isDate documentation

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
  ### Describe the bug

 
  #### 💻 Code if available


  #### 🙁  Actual behavior


  #### 🙂  Expected behavior


  #### 🎮  Playground link if available


  #### Software used:
  - Browser [e.g. chrome, safari]
  
  - date-fns version [e.g. 2.24]
  
  #### Additional info
  <!--Add any other info about the problem here. -->

  `)
  return githubUrl + '&title=' + title + '&body=' + body
}
