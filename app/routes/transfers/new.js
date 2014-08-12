import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var promise    = this.store.find('payee');
    var controller = this.controllerFor('transfers/new');

    promise.then(function(payees) {
      controller.set('payees', payees);
    });

    return promise;
  },

  model: function() {
    return this.store.createRecord('transfer');
  }
});
