import React from 'react'
import classnames from 'classnames'
import routes from 'app/routes'
import docs from 'app/_lib/docs'
import debounce from 'lodash/function/debounce'
import {trackAction} from 'app/acts/tracking_acts'

const logoPath = require('./img/logo.svg')

export default class Docs extends React.Component {
  static propTypes = {
    showLogo: React.PropTypes.bool,
    currentId: React.PropTypes.string
  }

  state = {
    query: null
  }

  constructor() {
    super()
    this._trackSearch = debounce(this._trackSearch, 500)
  }

  render() {
    return <div className='docs'>
      <header className='docs-header'>
        <div className='docs-header_title_wrapper'>
          {this.props.showLogo ? this._renderLogo() : null}

          <h2 className='docs-header_title'>
            Docs
          </h2>
        </div>

        <div className='docs-search'>
          <input
            className='docs-search_field'
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

  _renderLogo() {
    return <img
      src={logoPath}
      className='docs-logo_image'
      onClick={this._openHome.bind(this)}
    />
  }

  _renderCancelButton() {
    return <div
      className='docs-search_cancel'
      onClick={this._clearQuery.bind(this)}
    />
  }

  _renderCategories() {
    const filteredDocs = this._filteredDocs()
    const categoryNames = Object.keys(filteredDocs)

    if (categoryNames.length === 0) {
      return <div className='docs-no_results'>
        <p className='docs-no_results_text'>
          Your search didn't match any results.
        </p>
      </div>
    } else {
      return <ul className='docs-categories'>
        {categoryNames.map((categoryName) => {
          const docs = filteredDocs[categoryName]

          return <li className='docs-category' key={categoryName}>
            <h3 className='docs-category_header'>
              {categoryName}
            </h3>

            <ul className='docs-list'>
              {this._renderDocs(docs)}
            </ul>
          </li>
        })}
      </ul>
    }
  }

  _renderDocs(docs) {
    return docs.map((doc) => {
      return <li
        className={classnames(
          'docs-item',
          `is-${doc.type}`, {
            'is-current': doc.urlId == this.props.currentId,
          }
        )}
        onClick={this._openDoc.bind(this, doc.urlId)}
        key={doc.id}
      >
        <div className='docs-item_content'>
          <h4 className='docs-item_header'>
            {doc.title}
          </h4>
          <p className='docs-item_text'>
            {doc.description}
          </p>
        </div>

        <div className='docs-item_icon'/ >
      </li>
    })
  }

  _filteredDocs() {
    const query = (this.state.query || '').toLowerCase()
    if (query) {
      return Object.keys(docs).reduce((acc, categoryName) => {
        const categoryDocs = docs[categoryName]
        const filteredDocs = categoryDocs.filter((doc) => {
          return categoryName.toLowerCase().indexOf(query) != -1 ||
            doc.title.toLowerCase().indexOf(query) != -1 ||
            doc.description.toLowerCase().indexOf(query) != -1
        })
        if (filteredDocs.length > 0) {
          acc[categoryName] = filteredDocs
        }
        return acc
      }, {})
    } else {
      return docs
    }
  }

  _clearQuery() {
    trackAction('Search Cleared')
    this.setState({query: null})
  }

  _performSearch(e) {
    const query = e.currentTarget.value
    this._trackSearch(query)
    this.setState({query})
  }

  _trackSearch(query) {
    trackAction('Search', {query})
  }

  _openHome() {
    routes.navigateToRoute('home')
  }

  _openDoc(fnName) {
    routes.navigateToRoute('doc', {docId: fnName})
  }
}
