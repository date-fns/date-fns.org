// FIXME:
// /* eslint-env mocha */

// import assert from 'power-assert'
// import Remarkable from 'remarkable'
// import remarkableTree from '.'
// import { text, tag, softbreak, code } from './utils'
// import { getJSON } from 'app/_lib/request'
// import { firebaseURL } from 'app/_lib/firebase'
// import { sortVersions } from 'app/acts/versions'

// describe('remarkableTree', () => {
//   function parse (str) {
//     return new Remarkable().parse(str, {})
//   }

//   let pages
//   before(function () {
//     this.timeout(10000)

//     return getJSON(firebaseURL('versions'))
//       .then(data => sortVersions(Object.values(data))[0])
//       .then(({ docsKey }) => getJSON(firebaseURL(`docs/${docsKey}`)))
//       .then(({ pages: docPages }) => (pages = docPages))
//   })

//   it('converts a pair of open/close tokens', () => {
//     assert.deepEqual(remarkableTree(parse('Hello!')), [
//       tag('p', {}, [text('Hello!')])
//     ])
//   })

//   it('handles sequential paragraphs', () => {
//     assert.deepEqual(remarkableTree(parse('Hello,\n\nworld!')), [
//       tag('p', {}, [text('Hello,')]),
//       tag('p', {}, [text('world!')])
//     ])
//   })

//   it('throws an error if a closing tag of the same level as opening one is not found', () => {
//     assert.throws(() => {
//       const tokens = parse('Hello!')
//       remarkableTree(tokens.slice(0, tokens.length - 1))
//     }, /Failed to convert Remarkable tokens stream to a tree: can't find the closing token for "paragraph_open"/)
//   })

//   it('converts nested pair of open/close tokens', () => {
//     assert.deepEqual(remarkableTree(parse('Hey, **there**!')), [
//       tag('p', {}, [
//         text('Hey, '),
//         tag('strong', {}, [text('there')]),
//         text('!')
//       ])
//     ])
//   })

//   it('throws an error on unknown token types', () => {
//     assert.throws(() => {
//       const tokens = parse('Hello!')
//       tokens[0].type = 'whoops'
//       remarkableTree(tokens)
//     }, /Failed to convert Remarkable tokens stream to a tree: an unknown token type "whoops"/)
//   })

//   it('handles softbreaks', () => {
//     assert.deepEqual(remarkableTree(parse('Hey,\n there!')), [
//       tag('p', {}, [text('Hey,'), softbreak(), text('there!')])
//     ])
//   })

//   it('handles code tokens', () => {
//     assert.deepEqual(remarkableTree(parse('`123`')), [
//       tag('p', {}, [tag('code', {}, [text('123')])])
//     ])
//   })

//   it('handles fence tokens', () => {
//     assert.deepEqual(
//       remarkableTree(parse("```javascript\nconsole.log('Hello, world!')\n```")),
//       [code("console.log('Hello, world!')\n", 'javascript')]
//     )
//   })

//   it('handles links', () => {
//     assert.deepEqual(
//       remarkableTree(parse('[date-fns](https://date-fns.org)')),
//       [
//         tag('p', {}, [
//           tag('a', { href: 'https://date-fns.org', title: '' }, [
//             text('date-fns')
//           ])
//         ])
//       ]
//     )
//   })

//   it('capable to handle markdown documents from date-fns', () => {
//     const mdDocs = pages.filter(({ type }) => type === 'markdown')
//     mdDocs.forEach(doc => remarkableTree(parse(doc.content)))
//   })

//   it('capable to handle markdown content of JSDoc documents from date-fns', () => {
//     const jsDocs = pages.filter(({ type }) => type === 'jsdoc')
//     jsDocs.forEach(doc => {
//       remarkableTree(parse(doc.content.description))
//     })
//   })

//   it('handles images', () => {
//     assert.deepEqual(
//       remarkableTree(
//         parse(
//           '![logo](http://i.ncrp.co/3H1w312O373M/date-fns-github.svg "Logotype")'
//         )
//       ),
//       [
//         tag('p', {}, [
//           tag(
//             'img',
//             {
//               alt: 'logo',
//               src: 'http://i.ncrp.co/3H1w312O373M/date-fns-github.svg',
//               title: 'Logotype'
//             },
//             []
//           )
//         ])
//       ]
//     )
//   })
// })
