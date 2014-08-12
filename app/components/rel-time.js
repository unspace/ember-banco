import Ember from 'ember';

var INTERVAL = 60000; // Every minute

export default Ember.Component.extend({
  tagName: 'time',
  time: null,
  layout: Ember.Handlebars.compile('{{caption}}'),
  attributeBindings: 'isoTime:datetime',

  caption: function() {
    var time = this.get('time');

    if (!time) {
      return null;
    }

    return moment(time).fromNow();
  }.property('time'),

  isoTime: function() {
    var time = this.get('time');

    return time ? moment(time).toISOString() : null;
  }.property('time'),

  tick: function() {
    var tick = Ember.run.later(this, function() {
      this.notifyPropertyChange('caption');
      this.tick();
    }, INTERVAL);

    this.nextTick = tick;
  },

  stop: function() {
    Ember.run.cancel(this.nextTick);
  },

  startTicking: function() {
    if (window.BancoENV.environment === "test") {
      return;
    }
    this.tick();
  }.on('didInsertElement'),

  stopTicking: function() {
    this.stop();
  }.on('willDestroyElement')
});
