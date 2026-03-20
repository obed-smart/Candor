import AppError from '../../shared/utils/apiError';
import logger from '../../shared/utils/logger';
import { JoinWaitlistDto } from './waitlist.dto';
import { WaitlistEntry } from './waitlist.entity';
import WaitlistRepository from './waitlist.repository';
import { sendEmail } from '../mail/email.services';
import { waitlistTemplate } from '../mail/templates/waitlist.template';

export default class WaitlistService {
  constructor(private readonly waitlistRepo: WaitlistRepository) {}

  async addToWaitlist(data: JoinWaitlistDto): Promise<void> {
    const existing = await this.waitlistRepo.findByEmail(data.email);
    if (!existing) {
      const user = await this.waitlistRepo.create(data);

      const { subject, html } = waitlistTemplate(user.email);

      sendEmail({
        to: user.email,
        subject,
        html,
      }).catch((err) => {
        logger.error('Email failed', err);
      });
    }

    return;
  }

  async getWaitlist(): Promise<WaitlistEntry[]> {
    return this.waitlistRepo.findAll();
  }

  async getCount(): Promise<number> {
    return this.waitlistRepo.count();
  }
}
