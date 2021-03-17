import * as path from 'path'

export function getPath(filename: string) {
  return path.resolve(process.cwd(), filename)
}

export function getMode() {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
