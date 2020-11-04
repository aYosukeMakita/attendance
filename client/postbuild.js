/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs')
const jsDest = '../ad_server/public/js'
const cssDest = '../ad_server/public/css'

fs.rmdirSync(jsDest, { recursive: true })
fs.rmdirSync(cssDest, { recursive: true })
fs.rename('dist/js', jsDest, () => ({}))
fs.rename('dist/css', cssDest, () => ({}))
