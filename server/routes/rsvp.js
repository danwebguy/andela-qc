import express from 'express';

import rsvpController from '../controllers/rsvp';
import auth from '../helpers/auth';

const router = express.Router();

router.post('/:id/rsvps', auth.verifyToken, rsvpController.createRsvp);

export default router;
