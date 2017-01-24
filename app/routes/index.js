import Router from 'app/_lib/router/router'

export default new Router([
  {
    path: '/',
    name: 'home',

    routes: [
      {
        path: '/docs',
        name: 'docs',

        routes: [
          {
            path: '/:docId',
            name: 'doc'
          }
        ]
      },
      {
        path: '/perf',
        name: 'perf'
      }
    ]
  }
])
