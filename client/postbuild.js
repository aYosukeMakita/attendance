const fs = require('fs')
const rmdir2 = require('rmdir2')
const destination = '../ad_server/public/users'

rmdir2(destination, err => {
  if (err) {
    return
  }
  fs.rename('dist', destination, () => {})
})
