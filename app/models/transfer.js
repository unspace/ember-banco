import DS from 'ember-data';

var STATES = {
  unconfirmed: 'Unconfirmed',
  pending:     'Pending',
  complete:    'Complete',
  failed:      'Failed'
};

export default DS.Model.extend({
  createdAt:           DS.attr('moment'),
  amountInCents:       DS.attr('number'),
  verifyAmountInCents: DS.attr('number'),
  state:               DS.attr('string'),
  ietQuestion:         DS.attr('string'),
  ietAnswer:           DS.attr('string'),
  ietMessage:          DS.attr('string'),

  payee:   DS.belongsTo('payee'),
  account: DS.belongsTo('account'),

  stateName: function() {
    var state = this.get('state');

    return STATES[state] || 'Unknown';
  }.property('state')
});
