/* eslint @typescript-eslint/no-var-requires: 0 */
const fs = require('fs')
const destination = '../ad_server/public/users'

fs.rmdirSync(destination, { recursive: true })
fs.rename('dist', destination, () => ({}))
