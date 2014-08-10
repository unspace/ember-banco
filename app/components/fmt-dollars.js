import Ember from 'ember';

var EVERY_THREE_RE = /\B(?=(\d{3})+(?!\d))/g;

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
    var base = Math.abs(this.get('dollars')).toFixed(2);
    var html = base.replace(EVERY_THREE_RE, '<span class="sep">,</span>');
    return new Ember.Handlebars.SafeString(html);
  }.property('dollars')
});
