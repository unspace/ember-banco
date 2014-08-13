import Ember from 'ember';

export default Ember.ObjectController.extend({
  newAccountBalanceInCents: function() {
    return this.get('account.balanceInCents') - this.get('amountInCents');
  }.property('amountInCents', 'account.balanceInCents')
});
