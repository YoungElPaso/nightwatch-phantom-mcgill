# nightwatch-phantom-mcgill
A package to run some automated tests for McGill.ca front end assets and sites.

This package uses a nightwatchjs for the end-to-end style tests and phantomjs/selenium to emulate a browser and run commands against a given site.  

The above tasks are automated using Grunt and a couple utility packages help with some custom front end validation (contrasting colors in the example test).

### To install:

```
$ npm install
```

And if you haven't already, do:

```
$ npm i grunt-cli -g
```
to install grunt globally.

And, finally run the selenium-standalone install once (so its installed, duh!):

```
$ ./node_modules/selenium-standalone/bin/selenium-standalone install
```

### To run the example test:

```
$ npm test
```

NB: the test as originally committed fails for now pending a code change to the McGill.ca website.  Its just included as an example, but it should pass within a week of this commit.
