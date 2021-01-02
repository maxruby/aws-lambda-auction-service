# Serverless Lambda Auction Service

## Description
A simple Auction service consisting of multiple serverless lambda functions, based on the [Serverless framework Bootcamp](https://www.udemy.com/course/serverless-framework/).

## Dependencies
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Support for CloudFormation Pseudo Parameters.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Webpack plugin providing zero configuration for bundling JavaScript including modern ES6/ES7 features.

## Setup
Created using [codingly.io](https://github.com/codingly-io/sls-base) as follows:

```shell
$ sls create --name auction-service --template-url https://github.com/codingly-io/sls-base
$ cd auction-service
$ npm install
```

## Development
```shell
$ npm start
```

## Deployment
```shell
$ sls deploy -v
```

## Authentication
- User authentication is based on [Auth0](https://auth0.com/docs).

## Encoding
- [Uuid generation](https://www.uuidgenerator.net/version4) 
- [Base64 encoding](https://codingly-io.github.io/base64-encoder)