import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: 'ui-form',
  classNameBindings: 'hasErrors',

  hasErrors: Ember.computed.bool('model.errors.length'),

  submit: function(event) {
    event.preventDefault();
    this.sendAction();
  }
});
