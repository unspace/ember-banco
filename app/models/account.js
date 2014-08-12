import Ember from 'ember';
import DS from 'ember-data';

function cpLookup(key, dictObj) {
  return Ember.computed(function() {
    var id = this.get(key);
    return id ? dictObj[id] : null;
  }).property(key);
}

var TYPES = {
  isa:           'Savings',
  tfsa:          'Tax Free Savings',
  transactional: 'Chequing'
};

var CURRENCIES = {
  cad: 'CAD',
  usd: 'USD'
};

var PLANS = {
  'isa.essential':                      'Savings Essential',
  'tfsa.essential':                     'Tax-Free Savings Essential',
  'transactional.us_business_standard': 'US Business Chequing Standard',
  'transactional.unlimited':            'Chequing Unlimited'
};

export default DS.Model.extend({
  label:           DS.attr('string'),
  type:            DS.attr('string'),
  updatedAt:       DS.attr('moment'),
  balanceInCents:  DS.attr('number'),
  balanceCurrency: DS.attr('string'),
  currencyType:    DS.attr('string'),
  planType:        DS.attr('string'),
  planFeeInCents:  DS.attr('number'),
  interestRate:    DS.attr('number'),

  plan:        cpLookup('planType', PLANS),
  currency:    cpLookup('balanceCurrency', CURRENCIES),
  description: cpLookup('type', TYPES)
});
