module.exports = {
  'Search Courses and Programs Solr Block Test': function(client) {
    client.resizeWindow(960, 800);

    // Local override for baseUrl global; one of three ways to set this var.
    client.globals.baseUrl = 'https://testbed13.ccs.mcgill.ca/template/';

    // Do login procedure. Function defined in globals.
    client.globals.doLogin(client, client.globals.baseUrl);

    // Go check out a search.
    client.url(client.globals.baseUrl + 'search/mcgill/english')
    .pause(1000);

    client.expect.element('#inner-container h1').text.to
    .contain('McGill');

    // Check the one box module block is visible.
    client.expect.element('.google-appliance-onebox-module').to.be.visible;

    // Check the block has the right background color.
    client.expect.element('.google-appliance-onebox-module')
    .to.have.css('background-color')
    .which.contains('rgba(239, 242, 238, 1)');

    // Check that the title 'Related Courses' exists.
    client.expect.element('.google-appliance-onebox-module').text.to
    .contain('RELATED PROGRAMS');

    // Check that the title 'Related Programs' exists.
    client.expect.element('.google-appliance-onebox-module:nth-of-type(2)').text.to
    .contain('RELATED COURSES');

    // End the test.
    client.end();

  },
};
