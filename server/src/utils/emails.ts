import { sendEmail } from './sendEmail'

export async function forgotPasswordEmail(
  to: string,
  token: string
): Promise<any> {
  const html = `<!doctype html>
  <html lang="en-US">
  
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password</title>
    <meta name="description" content="Reset Password">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
            <a href="${process.env.WEB_URL}/change-password/${token}"
            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
            Password</a>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
  </body>
  
  </html>`

  const subject = 'Change Password'

  sendEmail(to, subject, html)
}
