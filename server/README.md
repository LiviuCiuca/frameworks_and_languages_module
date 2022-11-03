## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
#
$ npm install

#
$ npm i -g @nestjs/cli

#
npm i --save class-validator class-transformer
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app with docker

```bash
# builds docker image
$ make build

# runs docker image
$ make run
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Test against test_server

```bash
# prerequisite --> run server, $cd to test_server, install requirements

# tests server with the assignment tests
$ pytest
```

## Use

```bash
# Posts item to server
$ curl -X POST http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234", "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nails set. In canterbury", "lat": 51.2798438, "lon": 1.0830275}'

# Gets all items form server
$ curl http://localhost:8000/items

# Gets item number 1
$ curl http://localhost:8000/item/1

# Filters and returns item by username
$ curl http://localhost:8000/items?user_id=user1234

# Deletes item number 1
$ curl -X DELETE http://localhost:8000/item/1
```
