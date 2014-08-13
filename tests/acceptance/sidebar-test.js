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

test('it links to the homepage', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[0]);
  });

  andThen(function() {
    equal(currentPath(), 'index');
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

test('it links to transfers', function() {
  visit('/');

  andThen(function() {
    click(find('nav.sidebar li a')[2]);
  });

  andThen(function() {
    equal(currentPath(), 'transfers.index');
  });
});
