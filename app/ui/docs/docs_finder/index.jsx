import React from 'react'
import classnames from 'classnames'
import debounce from 'lodash/function/debounce'
import Link from 'app/ui/_lib/link'
import { trackAction } from 'app/acts/tracking_acts'
import { DocsPropType } from 'app/types/docs'
import { EitherPropType } from 'app/types/either'
import OpenCollectiveBanner from 'app/ui/_lib/open_collective_banner'

export default class DocsFinder extends React.Component {
  static propTypes = {
    docId: React.PropTypes.string,
    docs: EitherPropType(React.PropTypes.object, DocsPropType.isRequired)
      .isRequired,
    selectedVersionTag: EitherPropType(
      React.PropTypes.object,
      React.PropTypes.string
    ).isRequired,
    selectedSubmodule: React.PropTypes.string.isRequired
  }

  state = {
    query: ''
  }

  constructor() {
    super()
    this._trackSearch = debounce(this._trackSearch, 500)
  }

  render() {
    return (
      <div className="docs_finder">
        <header className="docs_finder-search">
          <input
            className="docs_finder-search_field"
            autoFocus
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.query}
            onChange={this._performSearch.bind(this)}
          />

          {this.state.query ? this._renderCancelButton() : null}
        </header>

        {this._renderCategories()}

        <OpenCollectiveBanner size="small" sticky />
      </div>
    )
  }

  _renderCancelButton() {
    return (
      <div
        className="docs_finder-search_cancel"
        onClick={this._clearQuery.bind(this)}
      />
    )
  }

  _renderCategories() {
    const { docs, selectedSubmodule } = this.props

    return docs.fold(
      ({ message }) => {
        return (
          <div className="docs_finder-no_results">
            <p className="docs_finder-no_results_text">{message}</p>
          </div>
        )
      },
      ({ categories, pages }) => {
        const filteredPages = this._filterPages(
          pages,
          this.state.query,
          selectedSubmodule
        )

        if (filteredPages.size === 0) {
          return (
            <div className="docs_finder-no_results">
              <p className="docs_finder-no_results_text">
                Your search didn't match any results.
              </p>
            </div>
          )
        }

        return (
          <ul className="docs_finder-categories">
            {categories.map(category => {
              const categoryPages = filteredPages.filter(
                page => page.category === category
              )

              if (categoryPages.size === 0) {
                return null
              }

              return (
                <li className="docs_finder-category" key={category}>
                  <h3 className="docs_finder-category_header">{category}</h3>

                  <div className="docs_finder-list">
                    {this._renderDocs(categoryPages)}
                  </div>
                </li>
              )
            })}
          </ul>
        )
      }
    )
  }

  _renderDocs(docs) {
    return docs.map(doc => {
      const urlId = doc.get('urlId')

      return (
        <Link
          name="doc"
          params={{ docId: urlId, versionTag: this.props.selectedVersionTag }}
          className={classnames('docs_finder-item', `is-${doc.get('type')}`, {
            'is-current': urlId === this.props.docId
          })}
          key={urlId}
        >
          <div className="docs_finder-item_content">
            <h4 className="docs_finder-item_header">{doc.get('title')}</h4>
            <p className="docs_finder-item_text">{doc.get('description')}</p>
          </div>

          <div className="docs_finder-item_icon" />
        </Link>
      )
    })
  }

  _filterPages(pages, dirtyQuery, selectedSubmodule) {
    if (dirtyQuery) {
      const query = dirtyQuery.toLowerCase()

      pages = pages.filter(
        page =>
          page.category.toLowerCase().includes(query) ||
          page.title.toLowerCase().includes(query) ||
          page.description.toLowerCase().includes(query)
      )
    }

    return pages.filter(page => {
      const { category, isFPFn } = page

      if (category === 'General' || category === 'Types') {
        return true
      } else {
        return (selectedSubmodule === 'fp') === isFPFn
      }
    })
  }

  _clearQuery() {
    trackAction('Search Cleared')
    this.setState({ query: '' })
  }

  _performSearch(e) {
    const query = e.currentTarget.value
    this._trackSearch(query)
    this.setState({ query })
  }

  _trackSearch(query) {
    trackAction('Search', { query })
  }
}
