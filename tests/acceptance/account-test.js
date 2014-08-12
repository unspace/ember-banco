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
    var title = find('header h1').text().trim();
    equal(title, 'Personal Chequing');
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
    equal(find('.label', transaction).text().trim(), 'Cheque Deposit');
    equal(find('.detail', transaction).text().trim(), 'Partner ABM - BMO Bloor & Lansdowne');
    equal(find('td.transaction-date').first().text().trim(), 'Aug 8th, 2014');
    var balance = find('td.transaction-withdrawl').first();
    equal(balance.text().trim(), '');
    balance = find('td.transaction-deposit').first();
    equal(balance.text().trim(), '$485.00');
    balance = find('td.transaction-withdrawl').last();
    equal(balance.text().trim(), '-$64.82');
  });
});

test('it links to the transaction list', function() {
  visit('/accounts/3f946b41-e8c3-4e1b-ac6d-8f3099728fe7');

  andThen(function() {
    click(find('td.account-info').first());
  });

  andThen(function() {
    equal(currentPath(), 'account.transactions.index');
  });
});

