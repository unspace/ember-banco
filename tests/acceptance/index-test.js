import Ember from 'ember';
import startApp from '../helpers/start-app';
var App;

module('Acceptance: Index', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /', function() {
  visit('/');

  andThen(function() {
    equal(currentPath(), 'index');
  });
});

test('Welcomes you to the app', function() {
  visit('/');

  andThen(function() {
    equal(find('#welcome').text().trim(), 'Welcome to Banco');
  });
});
