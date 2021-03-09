import { h, FunctionComponent, Fragment } from 'preact'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css?global'
import './global.css?global'
import { Pre, Code as StyledCode } from './style.css'

interface CodeProps {
  value: string
}
export const Code: FunctionComponent<CodeProps> = ({ value }) => {
  const html = Prism.highlight(value, Prism.languages.javascript, 'javascript')
  return (
    <>
      <Pre tag="pre">
        <StyledCode tag="code" dangerouslySetInnerHTML={{ __html: html }} />
      </Pre>
    </>
  )
}
