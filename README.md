[![Build Status](https://travis-ci.org/danwebguy/andela-qc.svg?branch=master)](https://travis-ci.org/danwebguy/andela-qc) [![Coverage Status](https://coveralls.io/repos/github/danwebguy/andela-qc/badge.svg?branch=master)](https://coveralls.io/github/danwebguy/andela-qc?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/175125aed77cf978273e/maintainability)](https://codeclimate.com/github/danwebguy/andela-qc/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/175125aed77cf978273e/test_coverage)](https://codeclimate.com/github/danwebguy/andela-qc/test_coverage)

# andela-qc
Andela Questioner Challenge

## Questioner
Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize
questions to be answered. Other users can vote on asked questions and they bubble to the top
or bottom of the log.

### GitHub Pages
follow this link https://danwebguy.github.io/andela-qc/UI/ to go to the App on GitHub pages

### Heroku App
follow this link https://fathomless-sierra-95793.herokuapp.com/api/v1/meetups/ to access the endpoints on Heroku

### Endpoints
Create a meetup record: https://fathomless-sierra-95793.herokuapp.com/api/v1/meetups/ <br>
Create a question record: https://fathomless-sierra-95793.herokuapp.com/api/v1/questions/
Get a specific meetup record: https://fathomless-sierra-95793.herokuapp.com/api/v1/meetups/1/
Get all meetup records: https://fathomless-sierra-95793.herokuapp.com/api/v1/meetups/
Upvote a question: https://fathomless-sierra-95793.herokuapp.com/api/v1/questions/1/upvote/
Downvote a question: https://fathomless-sierra-95793.herokuapp.com/api/v1/questions/1/downvote/
Rsvp for a meetup: https://fathomless-sierra-95793.herokuapp.com/api/v1/meetups/1/rsvps/
Get all Upcoming meetup records: https://fathomless-sierra-95793.herokuapp.com/api/v1/meetups/upcoming/

![Endpoints](https://raw.githubusercontent.com/danwebguy/andela-qc/master/UI/img/endpoint.gif)
