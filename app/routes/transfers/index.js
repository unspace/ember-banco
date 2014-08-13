import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.store.find('transfer');
  },

  model: function() {
    return this.store.filter('transfer', function(transfer) {
      return !transfer.get('isNew');
    });
  }
});
