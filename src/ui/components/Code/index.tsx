import { h, FunctionComponent } from 'preact'
import { useRef, useState, useEffect } from 'preact/hooks'
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css?global'
import './style.css?global'

interface CodeProps {
  value: string
  options?: CodeMirror.EditorConfiguration
}
export const Code: FunctionComponent<CodeProps> = ({ value, options }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [codeMirror, setCodeMirror] = useState<CodeMirror.EditorFromTextArea | null>(null)

  useEffect(() => {
    setCodeMirror(
      CodeMirror.fromTextArea(textareaRef.current, {
        theme: 'milky',
        ...options
      })
    )

    return () => {
      if (codeMirror) {
        codeMirror.toTextArea()
      }
    }
  }, [])

  useEffect(
    () => {
      if (codeMirror) {
        codeMirror.setValue(value)
      }
    },
    [value]
  )

  return <textarea value={value} ref={textareaRef} />
}
