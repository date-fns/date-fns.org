import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Link from 'app/ui/_lib/link'
import router from 'app/routes'
import {VersionPropType} from 'app/types/version'
import {Either, EitherPropType} from 'app/types/either'
import {changeVersion, changeSubmodule} from 'app/acts/routes'
import logoPath from './img/logo.svg'

DocsNavBar.propTypes = {
  docId: React.PropTypes.string,
  versions: EitherPropType(
    React.PropTypes.object,
    ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired
  ).isRequired,
  selectedVersionTag: EitherPropType(React.PropTypes.object, React.PropTypes.string).isRequired,
  selectedSubmodule: React.PropTypes.string.isRequired,
  routeData: React.PropTypes.object.isRequired,
  latestVersionTag: EitherPropType(React.PropTypes.object, React.PropTypes.string).isRequired,
}

export default function DocsNavBar (
  {docId, versions, selectedVersionTag, selectedSubmodule, routeData, latestVersionTag}
) {
  return (
    <div className="docs_nav_bar">
      <div className="docs_nav_bar-inner">
        <div className="docs_nav_bar-links">
          <Link name="home" className="docs_nav_bar-logotype">
            <img src={logoPath} className="docs_nav_bar-logotype_image" />
            date-fns
          </Link>

          <a
            href="https://github.com/date-fns/date-fns"
            className="docs_nav_bar-link"
          >
            GitHub
          </a>

          <a href="https://twitter.com/date_fns" className="docs_nav_bar-link">
            Twitter
          </a>

          <a
            href="https://gitter.im/date-fns/support"
            className="docs_nav_bar-link"
          >
            Support
          </a>
        </div>

        <div className="docs_nav_bar-version_selector">
          <label className="docs_nav_bar-selector">
            <span className="docs_nav_bar-label">
              Version:
            </span>

            <select
              disabled={versions.isLeft}
              value={selectedVersionTag.getOrElse('')}
              className="docs_nav_bar-select"
              onChange={onVersionChange.bind(null, routeData)}
            >
              {versions.fold(
                ({message}) => message,
                versions =>
                  versions
                    .filter(version => {
                      const hasDocs = version.features.docs
                      const isPrerelease = version.prerelease
                      return hasDocs && !isPrerelease
                    })
                    .keySeq()
                    .map(versionOption)
              )}
            </select>

            {
              Either.of(x => y => x !== y)
                .ap(selectedVersionTag)
                .ap(latestVersionTag)
                .map(notSelectedLatestVersion => {
                  if (notSelectedLatestVersion) {
                    return <Link
                      className='docs_nav_bar-latest_link'
                      name='doc'
                      params={{docId, versionTag: latestVersionTag}}
                    >
                      Switch to latest
                    </Link>
                  }

                  return null
                })
                .getOrElse(null)
            }
          </label>

          <label className="docs_nav_bar-selector">
            <span className="docs_nav_bar-label">
              Submodule:
            </span>

            <select
              value={selectedSubmodule}
              className="docs_nav_bar-select"
              onChange={onSubmoduleChange.bind(null, routeData)}
            >
              <option value={''}>Default</option>
              <option value={'fp'}>FP</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}

function onVersionChange (routeData, {target: {value: tag}}) {
  changeVersion(routeData, tag)
}

function onSubmoduleChange(routeData, {target: {value}}) {
  changeSubmodule(routeData, value)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
