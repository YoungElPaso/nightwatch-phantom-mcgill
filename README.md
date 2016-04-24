# nightwatch-phantom-mcgill [![Build Status](https://travis-ci.org/YoungElPaso/nightwatch-phantom-mcgill.svg?branch=master)](https://travis-ci.org/YoungElPaso/nightwatch-phantom-mcgill)

A package to run some automated tests for McGill.ca front end assets and sites.

This package uses a nightwatchjs for the end-to-end style tests and phantomjs/selenium to emulate a browser and run commands against a given site.  

The above tasks are automated using Grunt and a couple utility packages help with some custom front end validation (contrasting colors in the example test).



### To install:

```
$ npm install
```

### To run the example test:

```
$ npm test
```

NB: the test as originally committed fails for now pending a code change to the McGill.ca website.  Its just included as an example, but it should pass within a week of this commit.

### To run tests that require authentication:

Some tests run against sites that require authentication.  The npm test script can be passed two parameters that in turn will be passed to Grunt and then into the global variables available in the nightwatch tests, which can the be used to fill in authentication forms etc.  Any such test has the prefix 'auth-' and will be *excluded* from npm test unless the user and password parameters are passed. The two params are *pw* and *user*.
