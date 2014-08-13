import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    submit: function() {
      var controller = this;

      this.get('model').save().then(function(transfer) {
        controller.transitionTo('transfers.show', transfer);
      }, Ember.K);
    },

    cancel: function() {

    }
  }
});
