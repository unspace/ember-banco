import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'time',
  moment:  null,
  fmt:     'YYYY-MM-DD',
  layout: Ember.Handlebars.compile('{{formatted}}'),

  attributeBindings: 'isoDate:datetime',

  formatted: function() {
    return moment(this.get('moment')).format(this.get('fmt'))
  }.property('moment', 'fmt'),

  isoDate: function() {
    return moment(this.get('moment')).format('YYYY-MM-DD')
  }.property('moment')
});
