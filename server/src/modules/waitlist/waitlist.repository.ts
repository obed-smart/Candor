import { AppDataSource } from '../../config/data.source';
import { JoinWaitlistDto } from './waitlist.dto';
import { WaitlistEntry } from './waitlist.entity';

export default class WaitlistRepository {
  private repo = AppDataSource.getRepository(WaitlistEntry);

  async create(data: JoinWaitlistDto): Promise<WaitlistEntry> {
    const waitlist = this.repo.create(data);
    return this.repo.save(waitlist);
  }

  async findByEmail(email: string): Promise<WaitlistEntry | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findAll(): Promise<WaitlistEntry[]> {
    return this.repo.find();
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
