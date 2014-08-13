import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Accounts', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /accounts', function() {
  visit('/accounts');

  andThen(function() {
    equal(currentPath(), 'accounts');
  });
});

test('has a title', function() {
  visit('/accounts');

  andThen(function() {
    findFirstAndCheckText('main header h1', 'Banking Accounts');
  });
});

test('it lists the accounts', function() {
  visit('/accounts');

  andThen(function() {
    var size = find('td.account-info').length;
    equal(size, 2);
  });
});

test('it displays accounts properties', function() {
  visit('/accounts');

  andThen(function() {
    findFirstAndCheckText('td.account-info .label', 'Personal Chequing');
    findFirstAndCheckText('td.account-info .type', 'Chequing');
    findFirstAndCheckText('td.account-info .currency', 'CAD');
    findFirstAndCheckText('td.account-balance', '$200.00');
  });
});

test('it links to the transaction list', function() {
  visit('/accounts');

  andThen(function() {
    click(find('td.account-info').first());
  });

  andThen(function() {
    equal(currentPath(), 'account.transactions.index');
  });
});
