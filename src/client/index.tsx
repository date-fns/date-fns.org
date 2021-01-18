import { h, render } from 'preact'
import { UI } from '~/ui'
import { RouterContext, useRouter } from '~/ui/router'
import firebase from 'firebase/app'
import { FIREBASE_APP, SENTRY_URL } from '~/constants'
import { initSentry } from '~/utils/sentry'

firebase.initializeApp(FIREBASE_APP)
initSentry(SENTRY_URL)

const ClientUI = () => {
  const router = useRouter(location.href)

  return (
    <RouterContext.Provider value={router}>
      <UI />
    </RouterContext.Provider>
  )
}

render(<ClientUI />, document.body)
