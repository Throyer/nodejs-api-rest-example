import handlebars from 'handlebars';
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USERNAME,
} from '@config/env';
import { readTemplate } from '@utils/templates/read-template';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Mail from 'nodemailer/lib/mailer';
import { Email } from './Email';

export class MailService {
  private remetente: Mail;

  constructor() {
    this.remetente = nodemailer.createTransport(
      smtpTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_USERNAME,
          pass: SMTP_PASSWORD,
        },
      }),
    );
  }

  public async send({
    destination,
    subject,
    template: templateName,
    replacements,
  }: Email): Promise<void> {
    const file = readTemplate(templateName);
    const template = handlebars.compile(file);
    const html = template(replacements);

    const mail: Mail.Options = {
      to: destination,
      subject,
      from: SMTP_USERNAME,
      html,
    };

    await this.remetente.sendMail(mail);
  }
}
