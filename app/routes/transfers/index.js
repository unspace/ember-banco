import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    this.store.find('transfer');

    return this.store.filter('transfer', function(transfer) {
      return !transfer.get('isNew');
    });
  }
});
