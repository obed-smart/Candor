import WaitlistRepository from './waitlist.repository';
import WaitlistService from './waitlist.services';
import { WaitlistController } from './waitlist.controllers';

const waitlistRepository = new WaitlistRepository();
const waitlistService = new WaitlistService(waitlistRepository);
const waitlistController = new WaitlistController(waitlistService);

export { waitlistController };
