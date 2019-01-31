
import bodyParser from 'body-parser';
import cors from 'cors';
import users from './users';
import questions from './questions';
import rsvp from './rsvp';
import meetups from './meetups';
import comments from './comments';

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api/v1/users', users);
  app.use('/api/v1/auth', users);
  app.use('/api/v1/meetups', meetups);
  app.use('/api/v1/questions', questions);
  app.use('/api/v1/meetups', rsvp);
  app.use('/api/v1/comments', comments);
};
