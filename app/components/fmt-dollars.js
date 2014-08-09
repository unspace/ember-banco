import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'fmt-dollars',
  classNameBindings: 'isNegative:neg:pos',
  sign: false,
  symbol: '$',
  cents: null,

  dollars: function() {
    var cents = this.get('cents');

    if (Ember.isNone(cents)) {
      return 0.0;
    }

    return cents / 100.0;
  }.property('cents'),

  isNegative: function() {
    return this.get('dollars') < 0;
  }.property('dollars'),

  fmtValue: function() {
    return Math.abs(this.get('dollars')).toFixed(2);
  }.property('dollars')
});
