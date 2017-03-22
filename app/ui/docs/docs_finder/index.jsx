import React from 'react'
import classnames from 'classnames'
import routes from 'app/routes'
import docs from 'app/_lib/docs'
import debounce from 'lodash/function/debounce'
import Link from 'app/ui/_lib/link'
import {trackAction} from 'app/acts/tracking_acts'
import I from 'immutable'

const logoPath = require('./img/logo.svg')

export default class DocsFinder extends React.Component {
  static propTypes = {
    currentId: React.PropTypes.string
  }

  state = {
    query: ''
  }

  constructor () {
    super()
    this._trackSearch = debounce(this._trackSearch, 500)
  }

  render () {
    return <div className='docs_finder'>
      <header className='docs_finder-header'>
        <div className='docs_finder-header_title_wrapper'>
          {this._renderLogo()}

          <h2 className='docs_finder-header_title'>
            Docs
          </h2>
        </div>

        <div className='docs_finder-search'>
          <input
            className='docs_finder-search_field'
            placeholder='Search'
            value={this.state.query}
            onChange={this._performSearch.bind(this)}
          />

          {this.state.query ? this._renderCancelButton() : null}
        </div>
      </header>

      {this._renderCategories()}
    </div>
  }

  _renderLogo () {
    return <Link name='home'>
      <img
        src={logoPath}
        className='docs_finder-logo_image'
      />
    </Link>
  }

  _renderCancelButton () {
    return <div
      className='docs_finder-search_cancel'
      onClick={this._clearQuery.bind(this)}
    />
  }

  _renderCategories () {
    //const filteredDocs = this._filteredDocs()
    //const categoryNames = Object.keys(filteredDocs)
    const docs = this.props.docs

    if (docs.size === 0) {
      return <div className='docs_finder-no_results'>
        <p className='docs_finder-no_results_text'>
          Loading...
        </p>
      </div>
    }

    const categories = docs.get('categories', I.List())
    const pages = this._filterPages(docs.get('pages', I.List()), this.state.query)

    if (pages.size === 0) {
      return <div className='docs_finder-no_results'>
        <p className='docs_finder-no_results_text'>
          Your search didn't match any results.
        </p>
      </div>
    }

    return <ul className = 'docs_finder-categories'>
      {categories.map((category) => {
        const categoryPages = pages.filter((page) => page.get('category') === category)

        if (categoryPages.size === 0) {
          return null
        }

        return <li className='docs_finder-category' key={category}>
          <ul className='docs_finder-list'>
            <h3 className='docs_finder-category_header'>
              {category}
            </h3>

            {this._renderDocs(categoryPages)}
          </ul>
        </li>
      })}
    </ul>
    // if (categoryNames.length === 0) {
    //   return <div className='docs_finder-no_results'>
    //     <p className='docs_finder-no_results_text'>
    //       Your search didn't match any results.
    //     </p>
    //   </div>
    // } else {
    //   return <ul className='docs_finder-categories'>
    //     {categoryNames.map((categoryName) => {
    //       const docs = filteredDocs[categoryName]
    //
    //       return <li className='docs_finder-category' key={categoryName}>
    //         <h3 className='docs_finder-category_header'>
    //           {categoryName}
    //         </h3>
    //
    //         <ul className='docs_finder-list'>
    //           {this._renderDocs(docs)}
    //         </ul>
    //       </li>
    //     })}
    //   </ul>
    // }
  }

  _renderDocs (docs) {
    return docs.map((doc) => {
      const urlId = doc.get('urlId')

      return <Link
        name='doc'
        params={{docId: urlId}}
        className={classnames(
          'docs_finder-item',
          `is-${doc.get('type')}`, {
            'is-current': urlId === this.props.currentId
          }
        )}
        key={urlId}
      >
        <div className='docs_finder-item_content'>
          <h4 className='docs_finder-item_header'>
            {doc.get('title')}
          </h4>
          <p className='docs_finder-item_text'>
            {doc.get('description')}
          </p>
        </div>

        <div className='docs_finder-item_icon' />
      </Link>
    })
  }

  _filterPages (pages, dirtyQuery) {
    if (dirtyQuery) {
      const query = dirtyQuery.toLowerCase()

      return pages.filter((page) =>
        page.get('category').toLowerCase().includes(query) ||
          page.get('title').toLowerCase().includes(query) ||
          page.get('description').toLowerCase().includes(query)
      )
    } else {
      return pages
    }
  }

  _clearQuery () {
    trackAction('Search Cleared')
    this.setState({query: ''})
  }

  _performSearch (e) {
    const query = e.currentTarget.value
    this._trackSearch(query)
    this.setState({query})
  }

  _trackSearch (query) {
    trackAction('Search', {query})
  }

  _openDoc (fnName) {
    routes.navigateToRoute('doc', )
  }
}
