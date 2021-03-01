export const DEFAULT_PAGE = 'Getting-Started'

export const OPEN_COLLECTIVE_API_KEY =
  'a4ec7982f7d8a118863c6107d8d554a444cb0d4c'

export const SENTRY_URL =
  'https://d4e775c8bbec48749f45293b22414b77@o506823.ingest.sentry.io/5597042'

interface Config {
  jobsURL: string
  firebaseApp: Object
  apiURL: string
}
const config: { [k: string]: Config } = {
  production: {
    jobsURL: 'https://jobs.date-fns.org',
    firebaseApp: {
      apiKey: 'AIzaSyBoDBiIbKeiu4-Uz4JzqH3X7pwbop2PfpU',
      projectId: 'date-fns-org',
    },
    apiURL: 'https://date-fns.org/api',
  },

  staging: {
    jobsURL: 'https://staging.jobs.date-fns.org',
    firebaseApp: {
      apiKey: 'AIzaSyArPabWWebnLWhEgITZbLjTA6I_BaDmF0E',
      projectId: 'date-fns-org-staging',
    },
    apiURL: 'https://staging.date-fns.org/api',
  },

  development: {
    jobsURL: 'https://staging.jobs.date-fns.org',
    firebaseApp: {
      apiKey: 'AIzaSyBQhFyhhZ496Btpt4CFRC2aheSlL71ombc-Uz4JzqH3X7pwbop2PfpU',
      projectId: 'november-experiment',
    },
    apiURL: 'https://november-experiment.web.app/api',
  },
}

const mode = process.env.NODE_ENV ?? 'development'
export const CONFIG = config[mode] ?? config.development
