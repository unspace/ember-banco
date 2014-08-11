import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      account:      this.store.find('account', params.account_id),
      transactions: this.store.find('transaction', { account_id: params.account_id })
    });
  },

  setupController: function(controller, data) {
    controller.set('model', data.transactions);
    controller.set('account', data.account);
  }
});
