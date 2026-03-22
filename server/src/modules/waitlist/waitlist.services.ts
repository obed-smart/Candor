
import { JoinWaitlistDto } from './waitlist.dto';
import { WaitlistEntry } from './waitlist.entity';
import WaitlistRepository from './waitlist.repository';
import { sendWaitlistEmails } from '../mail/email.services';

export default class WaitlistService {
  constructor(private readonly waitlistRepo: WaitlistRepository) {}

  async addToWaitlist(data: JoinWaitlistDto): Promise<void> {
    const existing = await this.waitlistRepo.findByEmail(data.email);
    
    if (!existing) {
      const user = await this.waitlistRepo.create(data);
      sendWaitlistEmails(user.email);
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
