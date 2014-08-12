import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: 'ui-form',
  classNameBindings: 'isInvalid',

  model: null,

  isInvalid: Ember.computed.bool('model.errors.length'),

  submitForm: function() {
    this.sendAction();
  }.on('submit')
});
