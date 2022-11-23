## Description

[React](https://github.com/facebook/create-react-app). react starter repository.

## Installation
```bash
# install react globally and create react app
$ npm install -g create-react-app newProject
```

## Running the app

```bash
# starts react server
$ npm start
```
## Running the app with docker

```bash
# builds docker image
$ make build

# runs docker image
$ make run
```

## Test
    [When choosing testing tools, it is worth considering a few tradeoffs:
    Iteration speed vs Realistic environment
    How much to mock?]
```bash
# using cypress
$ make test_client
```


## Use

```bash
# manually:
# add text to the inputs fields then click "submit" button --> to add an item
# click "delete" button to delete the desired item

# automatically:
# use cypress
$ make test_client
# and watch the recording, found in test_client --> cypress --> recordings folder
```