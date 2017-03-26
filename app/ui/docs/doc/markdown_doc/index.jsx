import React from 'react'
import Markdown from 'app/ui/_lib/markdown'

export default function MarkdownDoc ({content}) {
  return <Markdown value={content} />
}

MarkdownDoc.propTypes = {
  content: React.PropTypes.string
}
