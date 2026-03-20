import { htmlToText } from 'html-to-text';
import { transporter } from './utils/transporter';
import logger from '../../shared/utils/logger';

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async (options: SendMailOptions) => {
  const text = htmlToText(options.html);

  await transporter.sendMail({
    from: `Candor <noreply@Candor.com>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text,
  });
};
