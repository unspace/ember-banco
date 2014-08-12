import Ember from 'ember';

export default Ember.ObjectController.extend({
  payees:   null,
  accounts: null,

  actions: {
    submit: function() {
      this.get('model').save();
    }
  }
});
