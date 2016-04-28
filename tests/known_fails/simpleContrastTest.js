// Loads the contrast package.
var contrast = require('get-contrast');

// Loads the rgb package.
var rgb = require('rgb');

// A simple test for contrasting colors from two elements in the DOM.
module.exports = {

  // TODO: this setup / teardown should be in a global...
  // A message for start up.
  before: function(client) {
    console.log('Revving the engines and lighting the torch etc...');
  },

  // Shut down the muther after ending! Shouldn't include in steps cause if they
  // fail, or there's an error and client bails, end() may never be called and
  // phantomjs or other browser may still be running, eating all your RAM.
  after: function(client) {
    console.log('Turning off the lights when I leave.');
    client.end();
  },

  'Simple Contrast Test': function(client) {

    // For this test, we need to go to mobile resolution on the client.
    client.resizeWindow(400, 800);

    // Go to a WMS page and wait 300 ms.
    client.url('https://www.mcgill.ca/wms').pause(300);

    // Get the colors we want to check (the menu and its parent).
    var colorA;
    var colorB;
    client.getCssProperty('div.sf-accordion-toggle a#superfish-1-toggle',
    'color', function(result) {
      colorA = result.value;
    });
    client.getCssProperty('.block-superfish', 'background-color',
    function(result) {
      colorB = result.value;

      //TODO: figure out to handle errors from the get-contrast library and exit graecefully.
      // handling own errors, but how to wrap and handle get-contrast error?
    });

    // TODO this should be extended into a step or assertion for nightwatch.
    client.perform(function(client, done) {

      // Do some simple checks on the colors, i.e. validate they are strings.
      client.assert.equal(typeof colorA, 'string');
      client.assert.equal(typeof colorB, 'string');

      // Double check we are not contrasting transparent colors and handle
      // it if we are.
      colorA = isNotTransparent(colorA, function(err, contents) {
        if (err) {
          // Capturing errorts, but not stopping, will allow nightatch to handle
          // failed assertion instead.
          // client.pause(1000);
          // client.end();
          console.error('get-contrast error!', err);
          // throw err;
        } else {
          return contents;
        }
      });
      colorB = isNotTransparent(colorB, function(err, contents) {
        if (err) {
          // client.pause(1000);
          // client.end();
          console.error('get-contrast error!', err);
          // throw err;
        } else {
          return contents;
        }
      });

      // Do the contrast test and handle the errors it might generate.
      // Need to wrap this because get-contrast functions don't have callbacks.
      function wrapContrastTest(contrast, handleResult) {
        var test;
        try {
          // This is what we want to try.
          test = contrast.isAccessible(colorA, colorB);
          // Send the result to handleResult;
          handleResult(null, test);
        } catch (e) {
          // Send the error to handleResult.
          handleResult(e, null);
        }
      }
      // Our own callback to handle the errors from get-contrast, if any.
      var handleResult = function(err, content) {
        if (err) {
          console.log('get-contrast error!', err);
        } else {
          return content;
        }
      };
      // This is a better node type function, with argument and callback.
      var test = wrapContrastTest(contrast, handleResult);

      // Assert the value of the contrast test.
      client.assert.equal(test, true);

      // Tell the client to end.
      done();
    });
  }
};

// NB: there's a pull request to add this directly to get-contrast soon.
function isNotTransparent(color, callBack) {
  // Convert to RGB.
  // TODO ideally, should be handling possible errors from this package but not.
  color = rgb(color);

  // Check if the rgb returned color is rgba and if the 'a' value is 0.
  var cArray = color.match(/\((.*)\)/)[1].split(',');
  if (cArray.length == 4 && cArray[3] == '0') {
    return callBack(new
      TypeError('get-contrast cannot contrast transparent colors'), null);
  } else {
    return callBack(null, color);
  }
}
