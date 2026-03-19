import { Router } from 'express';

import validator from '../../shared/middleware/validation.middleware';
import { JoinWaitlistDto } from './waitlist.dto';
import { waitlistController } from './waitlist.modules';

const router = Router();

router.post('/', validator(JoinWaitlistDto), waitlistController.addToWaitlist);

router.get('/', waitlistController.getWaitlist);

router.get('/count', waitlistController.getCount);

export default router;
