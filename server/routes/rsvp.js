import express from 'express';

import {
  createRsvp, getRsvp,
} from '../controllers/rsvp';

const router = express.Router();

router.get('/:meetup_id/rsvps', getRsvp);

router.post('/:meetup_id/rsvps', createRsvp);

export default router;
