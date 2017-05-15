import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Link from 'app/ui/_lib/link'
import router from 'app/routes'
import {VersionPropType} from 'app/types/version'
import {changeSubmodule} from 'app/acts/submodule'
import logoPath from './img/logo.svg'

DocsNavBar.propTypes = {
  versions: ImmutablePropTypes.orderedMapOf(VersionPropType).isRequired,
  selectedVersionTag: React.PropTypes.any,
  selectedSubmodule: React.PropTypes.string.isRequired,
  routeData: React.PropTypes.object.isRequired
}

export default function DocsNavBar (
  {versions, selectedVersionTag, selectedSubmodule, routeData}
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

            {true && // TODO: Check if it's availiable
              <Link className='docs_nav_bar-latest_link'>
                Switch to latest
              </Link>}
          </label>

          <label className="docs_nav_bar-selector">
            <span className="docs_nav_bar-label">
              Submodule:
            </span>

            <select
              value={selectedSubmodule}
              className="docs_nav_bar-select"
              onChange={onSubmoduleChange}
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
  let name = routeData.getIn(['route', 'name'])

  if (name === 'home') {
    name = 'versionHome'
  } else if (name === 'doc') {
    name = 'versionDoc'
  } else if (name === 'docFP') {
    name = 'versionDocFP'
  } else if (name === 'docs') {
    name = 'versionDocs'
  } else if (name === 'docsFP') {
    name = 'versionDocsFP'
  }

  const params = routeData.get('params').toJS()
  params.versionTag = tag

  router.navigateToRoute(name, params)
}

function onSubmoduleChange ({target: {value}}) {
  changeSubmodule(value)
}

function versionOption (tag) {
  return <option value={tag} key={tag}>{tag}</option>
}
