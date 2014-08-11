import DS from 'ember-data';

export default DS.Model.extend({
  createdAt:     DS.attr('moment'),
  type:          DS.attr('string'),
  summary:       DS.attr('string'),
  detail:        DS.attr('string'),
  imageUrl:      DS.attr('string'),
  amountInCents: DS.attr('number'),

  account: DS.belongsTo('account')
});
