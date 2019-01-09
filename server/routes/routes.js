
import users from './users';
import questions from './questions';
import rsvp from './rsvp';
import meetups from './meetups';

export default (app) => {
  app.use('/api/v1/users', users);
  app.use('/api/v1/meetups', meetups);
  app.use('/api/v1/questions', questions);
  app.use('/api/v1/meetups', rsvp);
};
