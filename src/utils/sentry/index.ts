import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

export function initSentry(sentryURL: string) {
  Sentry.init({
    dsn: sentryURL,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.01,
  })
}
