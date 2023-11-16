import { entryPath } from './entryPath'

interface Params {
  body?: string
}

export const template = ({ body }: Params = {}) =>
  `
<!DOCTYPE html>
<html>
  <head>
    <!-- Site info -->

    <meta charset='utf-8'>
    <title>date-fns - modern JavaScript date utility library</title>
    <meta name='description' content='date-fns provides the most comprehensive yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.'>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicons -->

    <link rel='apple-touch-icon' sizes='57x57' href='/static/apple-icon-57x57.png'>
    <link rel='apple-touch-icon' sizes='60x60' href='/static/apple-icon-60x60.png'>
    <link rel='apple-touch-icon' sizes='72x72' href='/static/apple-icon-72x72.png'>
    <link rel='apple-touch-icon' sizes='76x76' href='/static/apple-icon-76x76.png'>
    <link rel='apple-touch-icon' sizes='114x114' href='/static/apple-icon-114x114.png'>
    <link rel='apple-touch-icon' sizes='120x120' href='/static/apple-icon-120x120.png'>
    <link rel='apple-touch-icon' sizes='144x144' href='/static/apple-icon-144x144.png'>
    <link rel='apple-touch-icon' sizes='152x152' href='/static/apple-icon-152x152.png'>
    <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-icon-180x180.png'>
    <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png'>
    <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png'>
    <link rel='icon' type='image/png' sizes='96x96' href='/static/favicon-96x96.png'>
    <link rel='icon' type='image/png' sizes='192x192' href='/static/android-icon-192x192.png'>
    <link rel='manifest' href='/static/manifest.json'>
    <meta name='msapplication-TileColor' content='#ffffff'>
    <meta name='msapplication-TileImage' content='/static/ms-icon-144x144.png'>
    <meta name='theme-color' content='#ffffff'>

    <!-- Social meta tags -->

    <!-- Twitter -->
    <meta name='twitter:card' content='summary_large_image'>
    <meta name="twitter:site" content='@date_fns'>
    <meta name='twitter:creator' content='@kossnocorp'>
    <meta name='twitter:title' content='Modern JavaScript Date Utility Library'>
    <meta name='twitter:description' content='date-fns provides the most comprehensive yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.'>
    <meta name='twitter:image' content='http://cdn.date-fns.org/card.png'>

    <!-- Facebook -->
    <meta property='og:type' content='website'>
    <meta property='og:title' content='Modern JavaScript Date Utility Library'>
    <meta property='og:description' content='date-fns provides the most comprehensive yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js.'>
    <meta property='og:image' content='http://cdn.date-fns.org/card.png'>
    <meta property='og:image:width' content='600'>
    <meta property='og:image:height' content='330'>

    <link href="${entryPath('main', 'css')}" rel="stylesheet">
  </head>
  <body>
    <div id="root">${body ?? ''}</div>
    <div id="portals"></div>

    <script src="${entryPath('main', 'js')}"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-71951329-1', 'auto');
      ga('send', 'pageview');
    </script>

    <script>
      const HEADER_STYLE = 'color: #770c56; font-size: 24px; font-family: sans-serif;'
      const MESSAGE_STYLE = 'color: #7B6D77; font-size: 16px; font-family: sans-serif;'
      const CODE_STYLE = 'font-size: 14px; font-family: monospace;'

      async function init(dirtyVersion) {
        const version = dirtyVersion && dirtyVersion.replace(/^v/, '') || '2.29.3'
        const url = 'https://unpkg.com/date-fns' + (version ? '@' + version : '') + '/esm/index.js'
        try {
          const dateFns = await import(url)
          window._ = dateFns
          window.dateFns = dateFns

          console.log(
            '%cUse %c_%c global variable to access date-fns functions.\\n' +
              'For example: %c_.addDays(new Date(), 5)',
            MESSAGE_STYLE, CODE_STYLE, MESSAGE_STYLE, CODE_STYLE,
          )
        } catch (e) {
          console.error(e)
          console.log('Something went wrong! Please try again')
        }
      }

      console.log(
        '%c( ⩗) date-fns console\\n' +
          '%cRun %cinit()%c or %cinit("v2.16.1" /* version */)\\n' +
          '%cto make date-fns functions available in console.',
        HEADER_STYLE, MESSAGE_STYLE, CODE_STYLE, MESSAGE_STYLE, CODE_STYLE, MESSAGE_STYLE,
      )
      window.init = init
    </script>
  </body>
</html>
`.trim()
