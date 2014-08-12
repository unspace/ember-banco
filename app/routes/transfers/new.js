import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('transfer');
  },

  afterModel: function() {
    var controller = this.controllerFor('transfers/new');
    var promise;

    promise = Ember.RSVP.hash({
      payees:   this.store.find('payee'),
      accounts: this.store.find('account')
    });

    promise.then(function(data) {
      controller.setProperties(data);
    });

    return promise;
  },

  actions: {
    willTransition: function(transition) {
      var model = this.modelFor('transfers/new');

      if (model.get('isLoading')) {
        transition.abort();
        return;
      }

      if (model.get('isDirty')) {
        model.deleteRecord();
      }
    }
  }
});
