import React from 'react'
import classnames from 'classnames'
import { trackAction } from 'app/acts/tracking_acts'
import shuffle from 'lodash/collection/shuffle'
import config from 'app/config'

const kind = Math.random() > 0.5 ? 'remote' : 'salary'

export default class NewBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    window
      .fetch(`${config.jobs}/api/jobs`)
      .then((resp) => resp.json())
      .then(({ jobs, tags }) => {
        this.setState({
          jobs: shuffle(jobs),
          tags,
          jobIndex: 0
        })
      })
  }

  render() {
    const { jobs, tags, jobIndex } = this.state

    if (!jobs) return null
    const job = jobs[jobIndex]

    return (
      <div className="new_banner">
        <a
          className="new_banner-job"
          href={`${config.jobs}/jobs/${job.ref.id}?utm_source=date-fns&utm_medium=banner&utm_campaign=date-fns-docs`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="new_banner-header">
            <img
              className="new_banner-logo"
              src={job.data.companyLogo}
              key={job.data.companyLogo}
            />

            <div>
              <div className="new_banner-company">{job.data.companyName}</div>
              <div className="new_banner-location">{job.data.location}</div>
            </div>

            <div className="new_banner-position">{job.data.position}</div>
          </div>

          <div className="new_banner-tags_n_next">
            <div className="new_banner-tags">
              {job.data.tags.slice(0, 3).map((tag) => (
                <div className="new_banner-tag" key={tag}>
                  {tags[tag]}
                </div>
              ))}
            </div>

            <button
              className="new_banner-next_button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                let newIndex = jobIndex + 1
                if (newIndex > jobs.length - 1) newIndex = 0
                this.setState({ jobIndex: newIndex })
              }}
            >
              <span>Next job</span>
              <NextIcon />
            </button>
          </div>
        </a>

        <a
          className="new_banner-link"
          href={`${config.jobs}/?utm_source=date-fns&utm_medium=banner&utm_campaign=date-fns-docs`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the hottest JavaScript Jobs right into your inbox
        </a>
      </div>
    )
  }
}

function NextIcon() {
  return (
    <svg
      className="new_banner-next_icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M244.5 230.9L52.5 71.4A32 32 0 000 96v320a32 32 0 0052.5 24.6l192-160.5a32.1 32.1 0 000-49.2zM224 255.4L32 416V96l192 159.4zm276.5-24.5l-192-159.4A32 32 0 00256 96v320a32 32 0 0052.5 24.6l192-160.5a32.1 32.1 0 000-49.2zM480 255.4L288 416V96l192 159.4z"
      />
    </svg>
  )
}

// export default function NewBanner() {
//   // const [job, setJob] = React.useState()
//   const [jobs, setJobs] = React.useState()
//   const [jobIndex, setJobIndex] = React.useState()

//   useEffect(() => {
//     window
//       .fetch('https://jobs.date-fns.org/api/jobs')
//       .then((resp) => resp.json())
//       .then((jobs) => {
//         setJobs(shuffle(jobs))
//         setJobIndex(0)
//       })
//   }, [])

//   if (!jobs) return null
//   const job = jobs[index]

//   return (
//     <div className="new_banner">
//       <a
//         className="new_banner-job"
//         href={
//           kind === 'remote'
//             ? 'https://bit.ly/2YEiBqG'
//             : 'https://bit.ly/3lmKQ71'
//         }
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <div className="new_banner-header">
//           <img
//             className="new_banner-logo"
//             src="https://firebasestorage.googleapis.com/v0/b/jsjobs-307ba.appspot.com/o/uploads%2Fmanual%2Fupserve.png?alt=media&token=bae7992a-2074-4141-b7b2-2676eaaa8d28"
//           />

//           <div>
//           {job.data.}
//             <div className="new_banner-company">Upserve</div>
//             <div className="new_banner-location">Remote</div>
//           </div>

//           <div className="new_banner-position">
//             Senior Frontend Engineer (
//             {kind === 'remote' ? 'remote' : '$150K/year'})
//           </div>
//         </div>

//         <div className="new_banner-tags">
//           <div className="new_banner-tag">TypeScript</div>
//           <div className="new_banner-tag">React</div>
//           <div className="new_banner-tag">GraphQL</div>
//         </div>
//       </a>

//       <a
//         className="new_banner-link"
//         href="https://bit.ly/2EzczjN"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Get the hottest JavaScript Jobs right into your inbox
//       </a>
//     </div>
//   )
// }
