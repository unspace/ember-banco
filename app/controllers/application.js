import Ember from 'ember';

export default Ember.Controller.extend({
  year: function() {
    return new Date().getFullYear();
  }.property()
});
