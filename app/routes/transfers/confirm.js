import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('transfer', params.transfer_id);
  },

  afterModel: function(model) {
    if (model.get('isConfirmed')) {
      this.transitionTo('transfers.show', model);
    }
  }
});
