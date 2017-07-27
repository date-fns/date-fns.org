import fetch from 'node-fetch'
import { writeFileSync } from 'fs'
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const client = new Lokka({
  transport: new Transport('https://graphql.buildkite.com/v1', {
    headers: {
      Authorization: `Bearer ${process.env.BUILDKITE_GRAPHQL_TOKEN}`
    }
  })
})

client
  .query(
    `
  query PerformanceStats {
    pipeline(slug: "date-fns/date-fns-benchmark") {
      builds(state: PASSED) {
        edges {
          node {
            number
            commit
            scheduledAt
            jobs {
              edges {
                node {

                  ... on JobTypeCommand {
                    url,
                    uuid,
                    artifacts {
                      edges {
                        node {
                          uuid
                          path
                          mimeType
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
  )
  .then(resp => {
    const artifacts = []
    resp.pipeline.builds.edges.forEach(buildEdge => {
      const { number: buildNumber, commit, scheduledAt } = buildEdge.node
      buildEdge.node.jobs.edges.forEach(jobEdge => {
        const { uuid: jobId, url: jobUrl } = jobEdge.node
        jobEdge.node.artifacts.edges.forEach(artifactEdge => {
          const { uuid: artifactId, path, mimeType } = artifactEdge.node
          artifacts.push({
            buildNumber,
            commit,
            scheduledAt,
            jobUrl,
            artifactId,
            path,
            mimeType,
            apiUrl: `https://api.buildkite.com/v2/organizations/date-fns/pipelines/date-fns-benchmark/builds/${buildNumber}/jobs/${jobId}/artifacts/${artifactId}/download/`
          })
        })
      })
    })
    return artifacts
  })
  .then(artifacts => {
    return Promise.all(
      artifacts.map(artifact => {
        return fetch(
          `${artifact.apiUrl}?access_token=${process.env.BUILDKITE_TOKEN}`
        )
          .then(resp => resp.json())
          .then(stats => Object.assign({}, artifact, { stats }))
      })
    ).then(stats => {
      writeFileSync('performance-stats.json', JSON.stringify(stats))
      console.log('performance-stats.json written')
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
