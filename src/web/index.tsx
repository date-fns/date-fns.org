import './init'
import { h, render } from 'preact'
import { UI } from '~/ui'
import { RouterContext, useRouter } from '~/ui/router'

const ClientUI = () => {
  const router = useRouter(location.href)

  return (
    <RouterContext.Provider value={router}>
      <UI />
    </RouterContext.Provider>
  )
}

render(<ClientUI />, document.getElementById('root') ?? document.body)
