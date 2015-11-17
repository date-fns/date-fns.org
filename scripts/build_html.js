import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import appConfig from '../config/app'

Promise.all([getStaticResults(), getEntriesResults(), getTemplate()])
  .then(([staticMap, entriesMap, template]) => {
    const html = template({
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
          throw new Error(`Asset of type "${type}" is not found in entry "${entryName}"`)
        }

        return pth
      }
    })

    const templateOutput = path.join(appConfig.distPath, 'index.html')
    fs.writeFile(templateOutput, html, (err) => {
      if (err) {
        console.log(err)
        process.exit(1)
      }

      console.log(`Template written to ${templateOutput}`)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

function getTemplate() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.cwd(), 'env', 'dev', 'template.ejs'), (err, contentStream) => {
      if (err) reject(err)
      const template = ejs.compile(contentStream.toString())
      resolve(template)
    })
  })
}


function getStaticResults() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(appConfig.distPath, 'static.json'), (err, contentStream) => {
      if (err) reject(err)
      const staticMap = JSON.parse(contentStream.toString())
      resolve(staticMap)
    })
  })
}

function getEntriesResults() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(appConfig.distPath, 'webpack-assets.json'), (err, contentStream) => {
      if (err) reject(err)
      const entriesMap = JSON.parse(contentStream.toString())
      resolve(entriesMap)
    })
  })
}
