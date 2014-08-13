import Ember from 'ember';
import DS from 'ember-data';

var Payee = DS.Model.extend({
  type:      DS.attr('string'),
  route:     DS.attr('string'),
  label:     DS.attr('string'),
  createdAt: DS.attr('moment'),

  isIET: Ember.computed.equal('type', 'iet'),

  detail: function() {
    return this.get('label') + ': ' + this.get('route');
  }.property('label', 'route')
});

Payee.TYPES = [
  { id: 'iet',  label: 'Interac e-Transfer' },
  { id: 'wire', label: 'Bank Account' },
  { id: 'cc',   label: 'Credit Card' },
  { id: 'bill', label: 'Bill Payment'}
];

export default Payee;
