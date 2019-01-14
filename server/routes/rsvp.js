import express from 'express';

import rsvpController from '../controllers/rsvp';

const router = express.Router();

router.get('/:meetup_id/rsvps', rsvpController.getRsvp);

router.post('/:meetup_id/rsvps', rsvpController.createRsvp);

export default router;
