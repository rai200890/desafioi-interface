
# sac-interface

[![Build Status](https://travis-ci.org/rai200890/sac-interface.svg)](https://travis-ci.org/rai200890/sac-interface)
[![Code Climate](https://codeclimate.com/github/rai200890/sac-interface/badges/gpa.svg)](https://codeclimate.com/github/rai200890/sac-interface)

Single Page Application using AngularJS to add and list issues

Workflow generated with the [angular-webpack-workflow](https://github.com/preboot/angular-webpack)

## Install

###OS dependencies

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs #install NodeJS
sudo apt-get install -y build-essential #install this package to compile and install native addons from npm
sudo npm install npm -g #update NPM installed with NodeJS
```

###Project's dependencies

```bash
 npm install #install NodeJS deps
```

## Run

```bash
 npm start #start server at localhost:8080
```
### Routes

**/issues**

List issues [http://localhost:8080/issues](http://localhost:8080/issues)

**/issues/new**

Add new issue [http://localhost:8080/issues/new](http://localhost:8080/issues/new)

**/issues/{id}**

Show issue details Eg. [http://localhost:8080/issues/1](http://localhost:8080/issues/1)

**/customers/new**

Add new customer [http://localhost:8080/customers/new](http://localhost:8080/customers/new)

## Test

```bash
 npm test #run project's tests
 npm run test-watch #run tests in watch mode
```
