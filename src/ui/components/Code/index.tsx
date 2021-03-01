import { h, FunctionComponent, Fragment } from 'preact'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css?global'
import './global.css?global'
import { Pre, Code as StyledCode } from './style.css'

interface CodeProps {
  value: string
  language?: string
}
export const Code: FunctionComponent<CodeProps> = ({
  value,
  language: dirtyLanguage,
}) => {
  const language = getLanguage(dirtyLanguage)
  const html = Prism.highlight(value, Prism.languages[language], language)
  return (
    <>
      <Pre tag="pre">
        <StyledCode tag="code" dangerouslySetInnerHTML={{ __html: html }} />
      </Pre>
    </>
  )
}

function getLanguage(dirtyLanguage: string | undefined) {
  if (
    dirtyLanguage === 'typescript' ||
    dirtyLanguage === 'js' ||
    dirtyLanguage === 'bash' ||
    dirtyLanguage === ''
  ) {
    return 'javascript'
  }

  return dirtyLanguage ?? 'javascript'
}
