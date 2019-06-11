# Change Log

## next

## version 1.9.0

1. Only documenting the yarn way of installing.
2. Simplified setting configuration information (see README file)
3. Switched to 12.4.0-alpine container as base - thanks to Rich.Main@sas.com for his insight into the size and security gains with this change.


## version 1.7.3

- Added .env file in packages/server for the docker run command
- Added a docker-compose template

## version 1.7.2

- Fixed case issue refereencing in require (showed up when running in Docker)
- Added Docker files in the packages.

## Version 1.7.0

- Using yarn and lerna

## Version 1.1.0

1. Build visual components using webpack - inline building of JSX seems to cause some issues in browsers - not worth chasing the issue.
