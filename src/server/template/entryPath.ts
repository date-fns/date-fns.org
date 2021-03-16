import fs from 'fs'
import path from 'path'

let assetsMap: any

if (process.env.NODE_ENV === 'production') {
  try {
    assetsMap = JSON.parse(
      fs.readFileSync(
        path.resolve(process.cwd(), 'webpack-assets.json'),
        'utf8'
      )
    )
  } catch (err) {}
}

export function entryPath(entryName: string, type = 'js') {
  return assetsMap ? assetsMap[entryName][type] : `/static/${entryName}.${type}`
}
