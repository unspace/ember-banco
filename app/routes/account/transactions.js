import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var id = this.modelFor('account').get('id');
    return this.store.find('transaction', { account_id: id });
  }
});
