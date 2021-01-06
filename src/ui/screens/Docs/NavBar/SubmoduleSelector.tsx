// function SubmoduleSelector({
//   docId,
//   docs,
//   selectedSubmodule,
//   selectedVersion,
//   selectedVersionTag,
//   routeData
// }) {
//   const relatedDocs = docs
//     .chain(docs =>
//       Either.fromNullable(docs.pages.find(page => page.urlId === docId))
//     )
//     .chain(page => Either.fromNullable(page.relatedDocs))

//   return selectedVersion
//     .chain(version =>
//       areSubmodulesAvailable(version) ? Either.Right() : Either.Left()
//     )
//     .fold(
//       () => null,
//       () => (
//         <label className="docs_nav_bar-selector">
//           <span className="docs_nav_bar-label">Submodule:</span>

//           <select
//             value={selectedSubmodule}
//             className="docs_nav_bar-select"
//             onChange={onSubmoduleChange.bind(
//               null,
//               selectedVersionTag,
//               relatedDocs,
//               routeData
//             )}
//           >
//             <option value={''}>Default</option>
//             <option value={'fp'}>FP</option>
//           </select>
//         </label>
//       )
//     )
// }
