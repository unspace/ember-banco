import Ember from 'ember';

export default Ember.ObjectController.extend({
  hasImage: function() {
    return !Ember.isBlank(this.get('imageUrl'));
  }.property('imageUrl')
});
