# Welcome to Yabs

[![Maintainability](https://api.codeclimate.com/v1/badges/d8dce4a40b65883e996b/maintainability)](https://codeclimate.com/github/itggot-TE4/Yabs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d8dce4a40b65883e996b/test_coverage)](https://codeclimate.com/github/itggot-TE4/Yabs/test_coverage)
[![Actions Status](https://github.com/itggot-TE4/Yabs/workflows/Integration/badge.svg)](https://github.com/itggot-TE4/Yabs/actions)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/itggot-TE4/Yabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/itggot-TE4/Yabs/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/itggot-TE4/Yabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/itggot-TE4/Yabs/context:javascript)

## Project setup
```
yarn install
bundle
```

### Compiles and hot-reloads for development
```
rails s
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Project management setup
- Use projects tab for adding kanban boards for issue tracking and bug triage board.
- Use issues and labels for assigning points to tasks and categorizing tasks.

## Code review
Code review is the process that happens after a new pull request is created and before the changes are merged to develop. It's a powerful tool for knowledge transfer. Use the following guidelines as a reference: https://github.com/thoughtbot/guides/tree/master/code-review

## What's Yabs?
Yabs or yet another booking system is a collection of tools for creating card id generation and loans of literature.

## Testing
Our tests are written in the component and views folders. Each tests that we have made is coded to test a specific function of a component, or test what displays on the site. Some tests have been written, however most of them are not so specific as we had hoped.

## High Level

### Frontend

The front end is built up with the Vue framework. To run it, type `yarn serve` into the console and wait for the files to load. As is common form Vue, the app is built by using components and putting them into views that the user renders when it reaches a certain route. The view may be rendered differently depending on the status of the user.

This Vue app is used with vue-bootstrap but we're working on switching that to Vuetify. If the site goes down, that's the reason.

### Backend

The backend is run by using `rails s` in the console. As the command implies, it's run by using rails as a scalable and adaptable base for our booking system. This backend has four test systems that controls if the backend functions as needed. An example of these is the book_test.rb's `create new book` test which sees if they can add a new book. 

To generate a database to use as the backend input `rake db:migrate` in the console, if you managed to do something wrong you can either type it again or type `rake db:rollback` to correct your mistake.

Detailed information can be seen in the low level documentation.


## License

Yabs is released under the [MIT License](https://opensource.org/licenses/MIT).
