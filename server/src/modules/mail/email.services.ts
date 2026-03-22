import { htmlToText } from 'html-to-text';
import { transporter } from './utils/transporter';
import logger from '../../shared/logger/logger';
import {
  adminWaitlistNotificationTemplate,
  waitlistTemplate,
} from './templates/waitlist.template';
import { env } from '../../config/env';

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

export const sendWaitlistEmails = (email: string) => {
  const { subject: userSubject, html: userHtml } = waitlistTemplate(email);

  const { subject: adminSubject, html: adminHtml } =
    adminWaitlistNotificationTemplate(email);

  Promise.allSettled([
    sendEmail({
      to: email,
      subject: userSubject,
      html: userHtml,
    }),

    sendEmail({
      to: env.ADMIN_EMAIL,
      subject: adminSubject,
      html: adminHtml,
    }),
  ]).then((results) => {
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        logger.error(
          {
            error: result.reason,
            emailType: index === 0 ? 'user' : 'admin',
          },
          'Email failed',
        );
      }
    });
  });
};
