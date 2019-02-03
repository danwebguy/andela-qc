[![Build Status](https://travis-ci.org/danwebguy/andela-qc.svg?branch=develop)](https://travis-ci.org/danwebguy/andela-qc) [![Coverage Status](https://coveralls.io/repos/github/danwebguy/andela-qc/badge.svg?branch=master)](https://coveralls.io/github/danwebguy/andela-qc?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/175125aed77cf978273e/maintainability)](https://codeclimate.com/github/danwebguy/andela-qc/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/175125aed77cf978273e/test_coverage)](https://codeclimate.com/github/danwebguy/andela-qc/test_coverage)

# Questioner

Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize
questions to be answered. Other users can vote on asked questions and they bubble to the top
or bottom of the log.

## Installation

- nodejs
- postgresql


```bash
npm install
npm start
```
## GitHub Pages

Visit: https://danwebguy.github.io/andela-qc/UI/ 

## Heroku Link

Visit: https://young-brushlands-72186.herokuapp.com/

## API Endpoints
- Create a meetup record: /api/v1/meetups/ 
- Create a question record: /api/v1/questions/ 
- Get a specific meetup record: /api/v1/meetups/1/ 
- Get all meetup records: /api/v1/meetups/ 
- Upvote a question: /api/v1/questions/1/upvote/ 
- Downvote a question: /api/v1/questions/1/downvote/ 
- Rsvp for a meetup: /api/v1/meetups/1/rsvps/ 
- Get all Upcoming meetup records: /api/v1/meetups/upcoming/ 

## Swagger Documentation

## Contributing
Daniel Ufeli
