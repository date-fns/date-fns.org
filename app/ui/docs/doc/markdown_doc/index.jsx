import React from 'react'
import Markdown from 'app/ui/_lib/markdown'

export default function MarkdownDoc ({ content, selectedVersionTag }) {
  return <Markdown value={content} selectedVersionTag={selectedVersionTag} />
}

MarkdownDoc.propTypes = {
  content: React.PropTypes.string,
  selectedVersionTag: React.PropTypes.any
}
