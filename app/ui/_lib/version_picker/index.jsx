import React from 'react'

export default function VersionPicker ({versionIndices}) {
  const loading = !versionIndices
  return <select disabled={loading} className='version_picker'>
    {loading
      ? <option>Loading</option>
      : versionIndices.keySeq().map(versionOption)}
  </select>
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
