# fintech-coding-challenge

## Technologies

* bash, sh
* docker, docker-compose
* node, express
* firestore
* typescript, babel
* jest, eslint

## Usage

### Build Application

```bash
docker-compose build
```

### Run Application

```bash
docker-compose up
```

### Run Test Suite

```bash
# Assumes that the application is currently running
cd test-files
./test.sh

# Compare test output
diff output.txt expected_output.txt
```

## What I did well

I challenged myself with this coding challenge in a few different ways:

### Typescript

I took this coding challenge as an opportunity to learn and use Typescript, coming from a background of Javascript (ES6).

### Firestore

I also took this challenge as an opportunity to learn more about Firestore and take advantage of a Docker image I created a while back for the Google Cloud Firestore emulator.

### Active Record Lite

For the past two years I have had the pleasure of working with both Node Express in my off hours and Ruby on Rails professionally. One part of Rails which I really enjoy is Active Record models and their accompany convenience methods such as `.save`. 

Since I haven't come across a Firestore ORM that I was happy with, I decided to take this as an opportunity to build out my own very light version of what I would like to see in a Firestore ORM (Focusing on the `.save` convenience method to start with).

While this is what I would definitely consider a barebones implementation, I greatly enjoyed thinking about what I would like to see in a domain driven system and implementing the base classes for use in the API.

## Future Improvements

1. Router and Controller Tests using supertest
2. Tests for the Transaction Repository
3. Defined Firebase rules and tests for those defined rules
4. CI/CD Using GitHub actions
5. Use of dirty flag in models, complete with watchEffects which will update the flag when specific attributes are modified.
6. Document structure cleanup
