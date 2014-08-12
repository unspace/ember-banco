import DS from 'ember-data';

export default DS.Model.extend({
  createdAt:     DS.attr('moment'),
  amountInCents: DS.attr('number'),
  state:         DS.attr('string'),

  payee:   DS.belongsTo('payee'),
  account: DS.belongsTo('account')
});
