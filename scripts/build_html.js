import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import appConfig from '../config/app'
import crypto from 'crypto'

Promise.all([getStaticResults(), getEntriesResults(), getTemplate()])
  .then(([staticMap, entriesMap, template]) => {
    const html = template({
      env: process.env.NODE_ENV || 'development',

      staticPath(staticName) {
        const pth = staticMap[path.join(appConfig.staticPath, staticName)]
        if (!pth) {
          throw new Error(`Static file "${staticName}" is not found`)
        }

        return pth
      },

      entryPath(entryName, type = 'js') {
        const entry = entriesMap[entryName]
        if (!entry) {
          throw new Error(`Entry "${entry}" is not found`)
        }

        const pth = entry[type]
        if (!pth) {
          throw new Error(
            `Asset of type "${type}" is not found in entry "${entryName}"`
          )
        }

        return pth
      }
    })

    const htmlFingerprint = getFingerprint(html)
    const htmlFileName = `index-${htmlFingerprint}.html`
    const templateFilePath = path.join(appConfig.distPath, htmlFileName)

    writeFirebaseConfig(htmlFileName)

    fs.writeFile(templateFilePath, html, err => {
      if (err) {
        console.log(err)
        process.exit(1)
      }

      console.log(`Template written to ${templateFilePath}`)
    })
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

function getTemplate() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(process.cwd(), 'app', 'env', 'dev', 'template.ejs'),
      (err, contentStream) => {
        if (err) reject(err)
        const template = ejs.compile(contentStream.toString())
        resolve(template)
      }
    )
  })
}

function getStaticResults() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(appConfig.distPath, 'static.json'),
      (err, contentStream) => {
        if (err) reject(err)
        const staticMap = JSON.parse(contentStream.toString())
        resolve(staticMap)
      }
    )
  })
}

function getEntriesResults() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(appConfig.distPath, 'webpack-assets.json'),
      (err, contentStream) => {
        if (err) {
          reject(err)
        } else {
          const entriesMap = JSON.parse(contentStream.toString())
          resolve(entriesMap)
        }
      }
    )
  })
}

function writeFirebaseConfig(htmlFileName) {
  const content = JSON.stringify(getFirebaseConfig(htmlFileName))
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(appConfig.distPath, 'firebase.json'),
      content,
      err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

function getFirebaseConfig(htmlFileName) {
  return {
    hosting: {
      public: './',
      ignore: ['static.json', 'webpack-assets.json'],
      headers: [
        {
          source: '**/*',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=3122064000' }
          ]
        }
      ],
      rewrites: [
        {
          source: '**',
          destination: `/${htmlFileName}`
        }
      ]
    }
  }
}

function getFingerprint(str) {
  const hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}
