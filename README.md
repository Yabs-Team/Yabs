# Welcome to Yabs

[![DeepScan grade](https://deepscan.io/api/teams/12020/projects/14980/branches/290973/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12020&pid=14980&bid=290973)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d8dce4a40b65883e996b/test_coverage)](https://codeclimate.com/github/itggot-TE4/Yabs/test_coverage)
[![Actions Status](https://github.com/itggot-TE4/Yabs/workflows/Integration/badge.svg)](https://github.com/itggot-TE4/Yabs/actions)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/itggot-TE4/Yabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/itggot-TE4/Yabs/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/itggot-TE4/Yabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/itggot-TE4/Yabs/context:javascript)

## What's Yabs?
Yabs or yet another booking system is a collection of tools for creating card id generation and loans of literature.

## License

Yabs is released under the [MIT License](https://opensource.org/licenses/MIT).

## Installation
Install dependencies:
```
sudo gem install docker-sync
```
Install Yabs with:
```
docker-sync start
docker-compose run backend bundle install
docker-compose run frontend yarn install
docker-compose build
docker-compose run backend rails db:schema:load
docker-compose run backend rails db:seed
```

Put secrets.yml containing google_client_secrets in backend/config/secrets.yml

## Running unit tests
Rails fixtures are stored as snapshots. They only need to be updated if changes are done to seed.rb file:
```
docker-compose run backend rails db:seed fixture=all
```
To run the unit tests:
```
docker-compose run backend rake
docker-compose run frontend yarn test:unit
```

## Running
If you haven't started docker-sync yet, do that first:
```
docker-sync clean
docker-sync start
```
Finally:
```
docker-compose up
```

## Tap into backend container for rails CLI
```
docker-compose exec backend bash
```

## Reseeding database
To reseed the database run these commands in running docker backend:
```
rails db:setup
rails db:fixtures:load
```