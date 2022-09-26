import { createTransport } from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export class EmailSender {
  async sendEmail(mails: string[], message: string) {
    const transporter = createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: false,
      auth: {
        user: 'testservex@yandex.ru',
        pass: '666777Asv',
      },
    });
    await transporter.sendMail({
      from: 'testservex@yandex.ru', // sender address
      to: `${mails.join(', ')}`, // list of receivers
      subject: 'Деньги на подарок', // Subject line
      text: `${message}`, // plain text body
      html: `<div>
      <h3>Люди которые готовы скинутся на подарок</h3>
      <p> ${mails.join(', <br>')}</p>
      </div>`, // html body
    });
  }
}
