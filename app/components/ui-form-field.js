import Ember from 'ember';

export default Ember.Component.extend({
  tagName:           'div',
  classNames:        'ui-form-field',
  classNameBindings: 'isInvalid',

  form:      Ember.computed.alias('parentView'),
  model:     Ember.computed.alias('form.model'),
  isInvalid: Ember.computed.bool('errors.length'),

  installCpAliases: function() {
    var field = this.get('for');

    this.reopen({
      errors: Ember.computed.alias('model.errors.' + field),
      value:  Ember.computed.alias('model.' + field)
    });
  }.on('init'),

  fieldGuid: function() {
    var field = this.get('for');
    var guid  = Ember.guidFor(this.get('model'));

    return 'ui-form-field-' + field + '-' + guid;
  }.property('for', 'model'),

  label: function() {
    return this.get('for').dasherize().split('-').map(function(word) {
      return word.capitalize();
    }).join(' ');
  }.property('for'),

  clearErrors: function() {
    this.get('model.errors').remove(this.get('for'));
  }.on('focusIn')
});
