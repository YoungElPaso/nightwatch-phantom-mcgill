module.exports = {
  'Search Courses and Programs Solr Block Test': function (client) {
    client.resizeWindow(960, 800);

    // Go check out a search.
    client.url(client.globals.baseUrl + 'search/mcgill/english');

    // Check the block has the right background color.
    client.expect.element('.google-appliance-onebox-module')
    .to.have.css('background-color')
    .which.contains('rgba(239, 242, 238, 1)');

    client.end();

  },
};
