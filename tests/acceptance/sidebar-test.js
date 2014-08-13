import Ember from 'ember';
import startApp from '../helpers/start-app';
var App;

module('Acceptance: Sidebar', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('it links to the welcome page', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[0]);
  });

  andThen(function() {
    equal(currentPath(), 'index');
  });
});

test('link to welcome is active when visiting index', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li')[0]);
  });

  andThen(function() {
    ok($('nav.sidebar li:nth-of-type(1)').hasClass('active'));
  });
});

test('it links to accounts', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[1]);
  });

  andThen(function() {
    equal(currentPath(), 'accounts');
  });
});

test('link to accounts is active when visiting accounts', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[1]);
  });

  andThen(function() {
    equal(currentPath(), 'accounts');
    ok($('nav.sidebar li:nth-of-type(2)').hasClass('active'));
  });
});

test('it links to transfers', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[2]);
  });

  andThen(function() {
    equal(currentPath(), 'transfers.index');
  });
});

test('link to transfers is active when visiting transfers', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[2]);
  });

  andThen(function() {
    ok($('nav.sidebar li:nth-of-type(3)').hasClass('active'));
  });
});
