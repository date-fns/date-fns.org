#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const packageJSON = require('../../package.json')

const newPackageJSON = {
  main: 'index.js',
  dependencies: packageJSON.dependencies,
}

const filePath = path.resolve(process.cwd(), 'build/functions/package.json')
const fileContent = JSON.stringify(newPackageJSON, null, '  ')
fs.writeFile(filePath, fileContent, (err) => {
  if (err) {
    throw err
  }

  console.log('Done!')
})
