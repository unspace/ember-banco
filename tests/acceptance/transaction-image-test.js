import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Transaction Image', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /account/transaction/image', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7/transactions/9f309941-ce83-41eb-c6ad-46b7283f9fe7/image');

  andThen(function() {
    equal(currentPath(), 'account.transactions.image');
  });
});

test('it renders the transaction image', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7/transactions/9f309941-ce83-41eb-c6ad-46b7283f9fe7/image');

  andThen(function() {
    var image = find('.ui-overlay-content img')
    equal(image.attr('src'), '/assets/cheques/9f309941-ce83-41eb-c6ad-46b7283f9fe7.jpg');
  });
});
