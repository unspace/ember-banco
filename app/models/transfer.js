import DS from 'ember-data';

var STATES = {
  complete: 'Complete',
  pending: 'Pending',
  failed: 'Failed'
};

export default DS.Model.extend({
  createdAt:     DS.attr('moment'),
  amountInCents: DS.attr('number'),
  state:         DS.attr('string'),
  detail:        DS.attr('string'),

  payee:   DS.belongsTo('payee'),
  account: DS.belongsTo('account'),

  stateName: function() {
    var state = this.get('state');

    return STATES[state] || 'Unknown';
  }.property('state')
});
