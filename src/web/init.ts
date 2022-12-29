import { initializeApp } from 'firebase/app'
import { CONFIG, SENTRY_URL } from '~/constants'
import { initSentry } from '~/utils/sentry'

initializeApp(CONFIG.firebaseApp)
initSentry(SENTRY_URL)
