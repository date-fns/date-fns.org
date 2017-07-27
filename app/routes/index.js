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
              { path: '/:docId', name: 'versionDoc' },

              {
                path: '/fp',
                name: 'versionDocsFP',

                routes: [{ path: '/:docId', name: 'versionDocFP' }]
              }
            ]
          }
        ]
      },
      {
        path: '/docs',
        name: 'docs',

        routes: [
          { path: '/:docId', name: 'doc' },

          {
            path: '/fp',
            name: 'docsFP',

            routes: [{ path: '/:docId', name: 'docFP' }]
          }
        ]
      },

      { path: '/perf', name: 'perf' }
    ]
  }
])
