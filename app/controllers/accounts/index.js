import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'accounts',

  model: Ember.computed.alias('controllers.accounts')
});
