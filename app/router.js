import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BancoENV.locationType
});

Router.map(function() {
  this.resource('accounts', function() {
    this.route('show', { path: '/:account_id'});
  });
});

export default Router;
