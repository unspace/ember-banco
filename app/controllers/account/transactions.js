import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'account',
  account: Ember.computed.alias('controllers.account')
});
