/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs')
const jsDest = '../server/public/js'
const cssDest = '../server/public/css'

fs.rmdirSync(jsDest, { recursive: true })
fs.rmdirSync(cssDest, { recursive: true })
fs.rename('dist/js', jsDest, () => ({}))
fs.rename('dist/css', cssDest, () => ({}))
