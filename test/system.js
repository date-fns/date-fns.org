/* global casper */

casper.test.begin('Getting Started', function (test) {
  casper
    .start('http://localhost:5001')
    .then(clear)
    .then(function () {
      test.assertVisible('#qa-npm')
      test.assertSelectorHasText('.CodeMirror-lines', 'npm install date-fns --save')
    })
    .then(function () {
      this.clickLabel('Bower')
      test.assertVisible('#qa-bower')
      test.assertSelectorHasText('.CodeMirror-lines', 'bower install date-fns')
    })
    .then(function () {
      this.clickLabel('CDN & Download')
      test.assertVisible('#qa-cdn')
      // test.assertSelectorHasText('.CodeMirror-lines', 'CDN')
    })
    .run(function () {
      test.done()
    })
})

casper.test.begin('Docs', function (test) {
  casper
    .start('http://localhost:5001')
    .then(clear)
    .then(function () {
      this.click('.docs-category:nth-child(2) .docs-item:nth-child(1)')
      test.assertUrlMatch(/^http:\/\/localhost:5001\/docs\//)
      test.assertExists('.ui.is-collapsed')
    })
    .then(function () {
      test.assertVisible('a.jsdoc_usage-option_link.is-current')
      test.assertSelectorHasText('a.jsdoc_usage-option_link.is-current', 'CommonJS')
    })
    .then(function () {
      this.clickLabel('UMD')
      test.assertSelectorHasText('a.jsdoc_usage-option_link.is-current', 'UMD')
    })
    .then(function () {
      this.clickLabel('ES 2015')
      test.assertSelectorHasText('a.jsdoc_usage-option_link.is-current', 'ES 2015')
    })
    .then(function () {
      this.click('.docs-category:nth-child(2) .docs-item:nth-child(2)')
      test.assertSelectorHasText('a.jsdoc_usage-option_link.is-current', 'ES 2015')
    })
    .then(function () {
      this.click('img.docs-logo_image')
      test.assertUrlMatch(/^http:\/\/localhost:5001\/$/)
      test.assertDoesntExist('.ui.is-collapsed')
    })
    .run(function () {
      test.done()
    })
})

casper.test.begin('Search', function (test) {
  casper
    .start('http://localhost:5001')
    .then(clear)
    .then(function () {
      this.fillSelectors('div.docs-search', {'input[class="docs-search_field"]': 'isAfter'})
      test.assertElementCount('li.docs-item', 1)
    })
    .then(function () {
      test.assertVisible('div.docs-search_cancel')
      this.click('div.docs-search_cancel')
      test.assertNotVisible('div.docs-search_cancel')
      test.assertElementCount('li.docs-item', 151)
    })
    .then(function () {
      this.fillSelectors('div.docs-search', {'input[class="docs-search_field"]': 'bla-bla'})
      test.assertElementCount('li.docs-item', 0)
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
