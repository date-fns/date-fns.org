import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Link from 'app/ui/_lib/link'
import { VersionPropType } from 'app/types/version'
import { DocsPropType } from 'app/types/docs'
import { Either, EitherPropType } from 'app/types/either'
import { changeVersion, changeSubmodule } from 'app/acts/routes'
import { areSubmodulesAvailable } from 'app/acts/versions'
import logoPath from './img/logo.svg'

DocsNavBar.propTypes = {
  docId: React.PropTypes.string,
  docs: EitherPropType(React.PropTypes.object, DocsPropType.isRequired)
    .isRequired,
  versions: EitherPropType(
    React.PropTypes.object,
    ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired
  ).isRequired,
  selectedVersionTag: EitherPropType(
    React.PropTypes.object,
    React.PropTypes.string
  ).isRequired,
  selectedSubmodule: React.PropTypes.string.isRequired,
  selectedVersion: EitherPropType(
    React.PropTypes.object,
    VersionPropType.isRequired
  ).isRequired,
  routeData: React.PropTypes.object.isRequired,
  latestStableVersionTag: EitherPropType(
    React.PropTypes.object,
    React.PropTypes.string
  ).isRequired
}

export default function DocsNavBar ({
  docId,
  docs,
  versions,
  selectedVersionTag,
  selectedSubmodule,
  selectedVersion,
  routeData,
  latestStableVersionTag
}) {
  return (
    <div className='docs_nav_bar'>
      <div className='docs_nav_bar-inner'>
        <div className='docs_nav_bar-links'>
          <Link name='home' className='docs_nav_bar-logotype'>
            <img src={logoPath} className='docs_nav_bar-logotype_image' />
            date-fns
          </Link>

          <a
            href='https://github.com/date-fns/date-fns'
            className='docs_nav_bar-link'
          >
            GitHub
          </a>

          <a href='https://twitter.com/date_fns' className='docs_nav_bar-link'>
            Twitter
          </a>

          <a
            href='https://gitter.im/date-fns/support'
            className='docs_nav_bar-link'
          >
            Support
          </a>
        </div>

        <div className='docs_nav_bar-version_selector'>
          <VersionSelector
            docId={docId}
            versions={versions}
            selectedVersionTag={selectedVersionTag}
            latestStableVersionTag={latestStableVersionTag}
            routeData={routeData}
          />

          <SubmoduleSelector
            docId={docId}
            docs={docs}
            selectedSubmodule={selectedSubmodule}
            selectedVersion={selectedVersion}
            selectedVersionTag={selectedVersionTag}
            routeData={routeData}
          />
        </div>
      </div>
    </div>
  )
}

function VersionSelector ({
  docId,
  versions,
  selectedVersionTag,
  latestStableVersionTag,
  routeData
}) {
  return (
    <label className='docs_nav_bar-selector'>
      <span className='docs_nav_bar-label'>Version:</span>

      <select
        disabled={versions.isLeft}
        value={selectedVersionTag.getOrElse('')}
        className='docs_nav_bar-select'
        onChange={onVersionChange.bind(null, routeData)}
      >
        {versions.fold(
          ({ message }) => message,
          versions =>
            versions
              .filter(version => version.features.docs)
              .keySeq()
              .map(versionOption)
        )}
      </select>

      <LatestVersionLink
        docId={docId}
        selectedVersionTag={selectedVersionTag}
        latestStableVersionTag={latestStableVersionTag}
        routeData={routeData}
      />
    </label>
  )
}

function LatestVersionLink ({
  docId,
  selectedVersionTag,
  latestStableVersionTag,
  routeData
}) {
  return Either.of(x => y => x === y)
    .ap(selectedVersionTag)
    .ap(latestStableVersionTag)
    .chain(
      isSelectedLatestVersion =>
        isSelectedLatestVersion ? Either.Left() : Either.Right()
    )
    .fold(
      () => null,
      () =>
        <Link
          className='docs_nav_bar-latest_link'
          name='doc'
          params={{ docId, versionTag: latestStableVersionTag }}
        >
          Switch to latest
        </Link>
    )
}

function SubmoduleSelector ({
  docId,
  docs,
  selectedSubmodule,
  selectedVersion,
  selectedVersionTag,
  routeData
}) {
  const relatedDocs = docs
    .chain(docs =>
      Either.fromNullable(docs.pages.find(page => page.urlId === docId))
    )
    .chain(page => Either.fromNullable(page.relatedDocs))

  return selectedVersion
    .chain(
      version =>
        areSubmodulesAvailable(version) ? Either.Right() : Either.Left()
    )
    .fold(
      () => null,
      () =>
        <label className='docs_nav_bar-selector'>
          <span className='docs_nav_bar-label'>Submodule:</span>

          <select
            value={selectedSubmodule}
            className='docs_nav_bar-select'
            onChange={onSubmoduleChange.bind(
              null,
              selectedVersionTag,
              relatedDocs,
              routeData
            )}
          >
            <option value={''}>Default</option>
            <option value={'fp'}>FP</option>
          </select>
        </label>
    )
}

function onVersionChange (routeData, { target: { value: tag } }) {
  changeVersion(routeData, tag)
}

function onSubmoduleChange (
  selectedVersionTag,
  relatedDocs,
  routeData,
  { target: { value } }
) {
  changeSubmodule(selectedVersionTag, relatedDocs, routeData, value)
}

function versionOption (tag) {
  return (
    <option value={tag} key={tag}>
      {tag}
    </option>
  )
}
