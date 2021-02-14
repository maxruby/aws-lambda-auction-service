# Serverless Lambda Auction Service

## Description
A simple Auction service consisting of multiple serverless lambda functions, based on the [Serverless framework Bootcamp](https://www.udemy.com/course/serverless-framework/).

## Dependencies
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Support for CloudFormation Pseudo Parameters.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Webpack plugin providing zero configuration for bundling JavaScript including modern ES6/ES7 features.

## Desktop Development Setup
Created using [codingly.io](https://github.com/codingly-io/sls-base) as follows:

```shell
$ sls create --name auction-service --template-url https://github.com/codingly-io/sls-base
$ cd auction-service
$ npm install
```

## Cloud Development Setup on GitPod

Start Gitpod session
- Go to https://gitpod.io/#https://github.com/maxruby/aws-lambda-auction-service
- Install VS Code extensions: 
    - `AWS Toolkit`
    - `Git Graph`
    - `Git History`

- Install Serverless framework and AWS dependencies

```shell
$ npm install

# Install serverless framework and configure credentials
$ npm install -g serverless
$ serverless config credentials --provider aws --key [AWS Key] --secret [AWS Secret]

# Install aws-cli
$ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
$ unzip awscliv2.zip
$ ./aws/install -i ~/.local/aws-cli -b ~/.local/bin
$ alias aws=/home/gitpod/.local/bin/aws

# check installation and configure
$ aws
$ aws --version
$ aws configure
  # set aws_access_key_id [laptop]
  # Aws_secret_access_key [laptop]
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