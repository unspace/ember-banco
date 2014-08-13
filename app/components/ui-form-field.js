import Ember from 'ember';
import capitalize from 'banco/utils/capitalize';

var TYPES = {
  select:   'select',
  textarea: 'textarea',
  dollars:  'dollars'
};

export default Ember.Component.extend({
  tagName:           'div',
  classNames:        'ui-form-field',
  classNameBindings: ['isInvalid', 'isOptional'],

  form:  Ember.computed.alias('parentView'),
  model: Ember.computed.alias('form.model'),

  isInvalid:  Ember.computed.bool('errors.length'),
  isOptional: Ember.computed.bool('optional'),

  valuePath: 'id',
  labelPath: 'label',

  controlPartialPath: function() {
    var type = TYPES[this.get('type')] || 'input';
    return 'components/ui-form-field/' + type;
  }.property('type'),

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
    return capitalize(this.get('for'));
  }.property('for'),

  clearErrors: function() {
    this.get('model.errors').remove(this.get('for'));
  }.on('focusIn')
});
