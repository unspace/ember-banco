import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BancoENV.locationType
});

Router.map(function() {
  this.resource('accounts');

  this.resource('account', { path: '/accounts/:account_id' }, function() {
    this.route('transactions', { path: '/' }, function() {
      this.route('image', { path: '/transactions/:transaction_id/image' });
    });
  });

  this.resource('transfers', function() {
    this.route('new');
  });
});

export default Router;
