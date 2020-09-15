const nodemailer = require('nodemailer')
const dayjs = require('dayjs')

const options = {
  host: 'jpavissmtp.tok.access-company.com',
  port: 25,
  secure: false,
}

const sendmail = ({ user, subjectType }) => {
  const transport = nodemailer.createTransport(options)

  const body = {
    from: 'acs-works-dev1-o-gr@access-company.com',
    to: 'yosuke.makita@access-company.com',
    subject: `${dayjs().format('M/DD')} ${user.name} リモートワーク`,
    text: `リモートワークを${subjectType}します`,
  }
  return transport.sendMail(body)
}

module.exports = sendmail
