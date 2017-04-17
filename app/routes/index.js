import Router from 'app/_lib/router/router'

export default new Router([
  {
    path: '/',
    name: 'home',

    routes: [
      {
        path: '/:versionTag',
        name: 'versionHome',

        routes: [
          {
            path: '/docs',
            name: 'versionDocs',

            routes: [
              {
                path: '/:docId',
                name: 'versionDoc'
              }
            ]
          }
        ]
      },
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
