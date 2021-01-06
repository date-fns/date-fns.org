// FIXME:


// import React from 'react'
// import shuffle from 'lodash/collection/shuffle'
// import nodejsCover from './covers/nodejs.jpg'
// import reactTypeScriptCover from './covers/reactTypeScript.jpg'
// import d3Cover from './covers/d3.jpg'
// import reactCover from './covers/react.jpg'
// import reactNativeCover from './covers/reactNative.jpg'
// import vueCover from './covers/vue.jpg'
// import algorithmsCover from './covers/algorithms.jpg'
// import reactFromZeroCover from './covers/reactFromZero.jpg'

// const books = [
//   {
//     title: 'Fullstack Node.js',
//     headline: 'Learn to build production Node.js apps',
//     description:
//       'The Fullstack Node.js book is the complete guide to building fast, production-ready Node.js apps',
//     cover: nodejsCover,
//     url: 'http://link.date-fns.org/33gKOVM'
//   },

//   {
//     title: 'Fullstack React with TypeScript',
//     headline: 'Learn React with TypeScript',
//     description:
//       'Learn Pro Patterns for Hooks, Testing, Redux, SSR, and GraphQL',
//     cover: reactTypeScriptCover,
//     url: 'http://link.date-fns.org/3k0zHah'
//   },

//   {
//     title: 'Fullstack D3',
//     headline: 'Build beautiful data visualizations with D3',
//     description:
//       'The Fullstack D3 book is the complete guide to D3. With dozens of code examples showing each step, you can gain new insights into your data by creating visualizations.',
//     cover: d3Cover,
//     url: 'http://link.date-fns.org/3bHdFq9'
//   },

//   {
//     title: 'Fullstack React',
//     headline: 'Learn React the right way',
//     description:
//       'The up-to-date, in-depth, complete guide to React and friends. Become a ReactJS expert today.',
//     cover: reactCover,
//     url: 'http://link.date-fns.org/3idMQMF'
//   },

//   {
//     title: 'Fullstack React Native',
//     headline: 'Learn React native',
//     description:
//       'The up-to-date, in-depth, complete guide to React Native. Create beautiful mobile apps with JavaScript and React.',
//     cover: reactNativeCover,
//     url: 'http://link.date-fns.org/2FoOzQE'
//   },

//   {
//     title: 'Fullstack Vue',
//     headline: 'Learn Vue.js',
//     description:
//       'The up-to-date, in-depth, complete guide to Vue. Create elegant apps with JavaScript and Vue.js.',
//     cover: vueCover,
//     url: 'https://link.date-fns.org/3bGwI3P'
//   },

//   {
//     title: 'JavaScript Algorithms',
//     headline: 'Pass your algorithms interview with confidence',
//     description:
//       'Pass your algorithms interview with confidence by learning data structures and algorithms in JavaScript.',
//     cover: algorithmsCover,
//     url: 'https://link.date-fns.org/35lml4g'
//   },

//   {
//     title: 'React from Zero',
//     headline: 'A gentle introduction to React',
//     description:
//       'A gentle introduction to React that builds from the ground up, using the JavaScript you already know.',
//     cover: reactFromZeroCover,
//     url: 'https://link.date-fns.org/3m2EVnP'
//   }
// ]

// export default class NewlineBanner extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }

//   componentWillMount() {
//     this.setState({
//       books: shuffle(books),
//       bookIndex: 0
//     })
//   }

//   render() {
//     const { books, bookIndex } = this.state
//     const book = books[bookIndex]

//     return (
//       <div className="newline_banner-wrapper">
//         <a
//           className="newline_banner"
//           href={book.url}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={book.cover} className="newline_banner-cover" />

//           <div className="newline_banner-text">
//             <div className="newline_banner-header">
//               <div className="newline_banner-title">{book.title}</div>
//               <div className="newline_banner-description">
//                 {book.description}
//               </div>
//             </div>

//             <button className="newline_banner-link">Get the book</button>
//           </div>
//         </a>

//         <div className="newline_banner-badge">
//           <div className="newline_banner-badge_label">
//             ☝️ Support date-fns, buy a book 🙏
//           </div>

//           <button
//             className="newline_banner-badge_next"
//             onClick={() => {
//               let newIndex = bookIndex + 1
//               if (newIndex > books.length - 1) newIndex = 0
//               this.setState({ bookIndex: newIndex })
//             }}
//           >
//             Next book
//           </button>
//         </div>
//       </div>
//     )
//   }
// }
