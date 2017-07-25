import path from 'path'

export default {
  distPath: path.join(process.cwd(), 'dist'),
  staticPath: path.resolve(process.cwd(), 'app/ui/static')
}
