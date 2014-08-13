import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Transfers', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /transfers', function() {
  visit('/transfers');

  andThen(function() {
    equal(currentPath(), 'transfers.index');
  });
});

test('links to transfers new', function() {
  visit('/transfers');
  click('.new-transfer');

  andThen(function() {
    equal(currentPath(), 'transfers.new');
  });
});

test('lists all transfers', function() {
  visit('/transfers');

  andThen(function() {
    equal(find('table.transfers tbody tr').length, 2);
  });
});

test('lists all transfers', function() {
  visit('/transfers');

  andThen(function() {
    equal(find('table.transfers tbody tr').length, 2);
  });
});

test('it displays transfers properties', function() {
  visit('/transfers');

  andThen(function() {
    findFirstAndCheckText('td.transfer-to', 'Mattia Gheda');
    findFirstAndCheckText('td.transfer-account', 'Personal Chequing');
    findFirstAndCheckText('td.transfer-date', 'Aug 8th, 2013');
    findFirstAndCheckText('td.transfer-state', 'Complete');
    findFirstAndCheckText('td.transfer-amount', '$14.00');
  });
});
