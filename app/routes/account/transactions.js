import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var id = this.modelFor('account').get('id');
    return this.store.find('transaction', { account_id: id });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('account', this.modelFor('account'));
  }
});
