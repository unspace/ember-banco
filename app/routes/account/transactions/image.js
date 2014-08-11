import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var transactions = this.modelFor('account.transactions');
    return transactions.findBy('id', params.transaction_id);
  },

  renderTemplate: function() {
    this.render('account/transactions/image', {
      into: 'application',
      outlet: 'overlay'
    });
  }
});
