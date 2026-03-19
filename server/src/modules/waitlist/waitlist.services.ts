import AppError from '../../shared/utils/apiError';
import logger from '../../shared/utils/logger';
import { JoinWaitlistDto } from './waitlist.dto';
import { WaitlistEntry } from './waitlist.entity';
import WaitlistRepository from './waitlist.repository';

export default class WaitlistService {
  constructor(private readonly waitlistRepo: WaitlistRepository) {}

  async addToWaitlist(data: JoinWaitlistDto): Promise<void> {
    const existing = await this.waitlistRepo.findByEmail(data.email);
    if (!existing) {
      await this.waitlistRepo.create(data);


      // send email
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
