import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    submit: function() {
      var controller = this;

      this.get('model').save().then(function(transfer) {
        controller.transitionToRoute('transfers.show', transfer);
      }, Ember.K);
    },

    cancel: function() {
      var controller = this;

      this.get('model').destroyRecord().then(function() {
        controller.transitionToRoute('transfers.index');
      });
    }
  }
});
