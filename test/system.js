/* global casper */

casper.options.waitTimeout = 20000

casper.test.begin('Docs', function (test) {
  casper
    .start('http://localhost:8999')
    .then(clear)
    .then(function () {
      test.assertVisible('a.promo-getting_started_link')
      this.click('a.promo-getting_started_link')
    })
    .waitForText('Getting Started')
    .then(function () {
      this.click('.docs_finder-category:nth-child(2) .docs_finder-item:nth-child(1)')
      test.assertUrlMatch(/docs\/closestIndexTo/)
    })
    .then(function () {
      test.assertVisible('a.jsdoc_usage-option_link.is-current')
      test.assertSelectorHasText(
        'a.jsdoc_usage-option_link.is-current',
        'CommonJS'
      )
    })
    .then(function () {
      this.clickLabel('ES 2015')
      test.assertSelectorHasText('a.jsdoc_usage-option_link.is-current', 'ES 2015')
    })
    .then(function () {
      this.click('.docs_finder-category:nth-child(2) .docs_finder-item:nth-child(2)')
      test.assertSelectorHasText(
        'a.jsdoc_usage-option_link.is-current',
        'ES 2015'
      )
    })
    .then(function () {
      this.click('a.docs_nav_bar-logotype')
      test.assertUrlMatch(/^http:\/\/localhost:8999\/$/)
      test.assertTextDoesntExist('closestIndexTo')
    })
    .run(function () {
      test.done()
    })
})

casper.test.begin('Search', function (test) {
  casper
    .start('http://localhost:8999')
    .then(clear)
    .then(function () {
      test.assertVisible('a.promo-getting_started_link')
      this.click('a.promo-getting_started_link')
    })
    .waitForText('Getting Started')
    .then(function () {
      this.fillSelectors('header.docs_finder-search', {
        'input[class="docs_finder-search_field"]': 'isAfter'
      })
      test.assertElementCount('a.docs_finder-item', 1)
      test.assertTextDoesntExist('isBefore')
    })
    .then(function () {
      test.assertVisible('div.docs_finder-search_cancel')
      this.click('div.docs_finder-search_cancel')
      test.assertNotVisible('div.docs_finder-search_cancel')
      test.assertTextExists('isBefore')
    })
    .then(function () {
      this.fillSelectors('header.docs_finder-search', {
        'input[class="docs_finder-search_field"]': 'bla-bla'
      })
      test.assertElementCount('a.docs_finder-item', 0)
      test.assertTextExists("Your search didn't match any results.")
    })
    .run(function () {
      test.done()
    })
})

function clear () {
  casper.evaluate(function () {
    window.localStorage.clear()
  }, {})
}
