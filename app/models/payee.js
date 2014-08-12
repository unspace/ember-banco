import DS from 'ember-data';

var Payee = DS.Model.extend({
  type:      DS.attr('string'),
  route:     DS.attr('string'),
  label:     DS.attr('string'),
  createdAt: DS.attr('moment')
});

Payee.TYPES = [
  { id: 'iet',  label: 'Interac e-Transfer' },
  { id: 'wire', label: 'Bank Account' },
  { id: 'cc',   label: 'Credit Card' },
  { id: 'bill', label: 'Bill Payment'}
];

export default Payee;
