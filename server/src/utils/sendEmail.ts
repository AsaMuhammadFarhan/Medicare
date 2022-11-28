import nodemailer from 'nodemailer'
// Coding dibawah khusus buat email buatan (nanti link hasil kirim emailnya muncul di terminal console)
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
): Promise<any> {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const testAccount = await nodemailer.createTestAccount()
  // console.log('testAccount', testAccount)

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMPT_HOST,
    port: 587,
    secure: process.env.EMAIL_SMPT_PORT === '465' ? true : false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'frost.75.asafarhan@gmail.com', // sender address
    to: to, // list of receivers
    subject, // Subject line
    html, // html body
  })

  console.log('Message sent: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}