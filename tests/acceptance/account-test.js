import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Account', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /account', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7');

  andThen(function() {
    equal(currentPath(), 'account.transactions.index');
  });
});

test('has a title', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7');

  andThen(function() {
    findFirstAndCheckText('main header h1', 'Personal Chequing');
  });
});

test('it lists the accounts', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7');

  andThen(function() {
    var size = find('td.transaction-info').length;
    equal(size, 2);
  });
});

test('it displays accounts properties', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7');

  andThen(function() {
    var transaction = find('td.transaction-info').first();
    findFirstAndCheckText('td.transaction-info .label', 'Cheque Deposit');
    findFirstAndCheckText('td.transaction-info .detail', 'Partner ABM - BMO Bloor & Lansdowne');
    findFirstAndCheckText('td.transaction-date', 'Aug 8th, 2014');
    findFirstAndCheckText('td.transaction-withdrawl', '');
    findFirstAndCheckText('td.transaction-deposit', '$485.00');
    var balance = find('td.transaction-withdrawl').last();
    equal(balance.text().trim(), '-$64.82');
  });
});

test('it links to transaction image', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7');

  andThen(function() {
    click(find('td.transaction-info .image').first());
  });

  andThen(function() {
    equal(currentPath(), 'account.transactions.image');
  });
});
