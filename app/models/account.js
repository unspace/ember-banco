import DS from 'ember-data';

export default DS.Model.extend({
  label:          DS.attr('string'),
  notes:          DS.attr('string'),
  balanceInCents: DS.attr('number'),
  currencyType:   DS.attr('string'),
  updatedAt:      DS.attr('moment')
});
