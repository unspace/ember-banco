import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: 'ui-dollar-input',
  cents: null,

  value: function(key, value) {
    var cents;
    var dollars;

    if (arguments.length === 1) {
      cents = this.get('cents');

      if (cents) {
        return (cents / 100).toFixed(2);
      } else {
        return '0.00';
      }
    } else {
      dollars = parseFloat(value, 10);

      if (isNaN(dollars) || Ember.isNone(dollars)) {
        cents = 0;
        dollars = 0;
      } else {
        cents = (dollars * 100).toFixed(0);
      }

      this.set('cents', cents);

      return dollars.toFixed(2);
    }
  }.property('cents')
});
