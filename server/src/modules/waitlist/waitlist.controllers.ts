import { Request, Response } from 'express';
import WaitlistService from './waitlist.services';
import catchAsync from '../../shared/utils/catchAsync';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { WaitlistEntry } from './waitlist.entity';
import logger from '../../shared/logger/logger';

export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  addToWaitlist = catchAsync(async (req: Request, res: Response) => {
    logger.info('Join waitlist endpoint Hit');
    await this.waitlistService.addToWaitlist(req.body);

    logger.info('Joined successfully');

    res
      .status(201)
      .json(ApiResponse.success(null, 'Joined waitlist successfully'));
  });

  getWaitlist = catchAsync(async (req, res) => {
    const waitlist = await this.waitlistService.getWaitlist();
    res
      .status(200)
      .json(ApiResponse.success<WaitlistEntry[]>(waitlist, 'Waitlist fetched'));
  });

  getCount = catchAsync(async (req, res) => {
    const count = await this.waitlistService.getCount();

    res
      .status(200)
      .json(
        ApiResponse.success<number>(
          count,
          'waitlist count return successfully',
        ),
      );
  });
}
