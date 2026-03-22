import { Router } from 'express';
import waitlistRoutes from '../modules/waitlist/waitlist.router';
 
const router = Router();

 
router.use('/waitlist', waitlistRoutes);
 
export default router;
