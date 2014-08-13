module.exports = function(app) {
  var router = require('express').Router();

  var ACCOUNTS = [
    {
      id:                '15a78099-1388-48be-be90-7f2ba183e42d',
      updated_at:        '2014-05-12T10:11:40.500Z',
      type:              'tfsa',
      label:             'Long Term Savings',
      number:            '333-59543',
      plan_type:         'tfsa.essential',
      plan_fee_in_cents: 0,
      interest_rate:     0.15,
      balance_in_cents:  124200,
      balance_currency:  'cad'
    },
    {
      id:                '232edf05-8d90-4a06-95b0-867312558de4',
      updated_at:        '2014-07-22T20:11:01.181Z',
      type:              'isa',
      label:             'Rainy Day Savings',
      number:            '333-62441',
      plan_type:         'isa.essential',
      plan_fee_in_cents: 0,
      interest_rate:     0.0001,
      balance_in_cents:  62100,
      balance_currency:  'cad'
    },
    {
      id:                '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      updated_at:        '2014-08-08T15:02:45.528Z',
      type:              'transactional',
      label:             'Carsten’s Chequing',
      number:            '122-00594',
      plan_type:         'transactional.unlimited',
      plan_fee_in_cents: 999,
      interest_rate:     0,
      balance_in_cents:  -825,
      balance_currency:  'cad'
    },
    {
      id:                '4d6bbd86-09cd-46b8-b81b-086b6b06eb68',
      updated_at:        '2014-08-01T06:33:17.442Z',
      type:              'transactional',
      label:             'Business Revenue',
      number:            '521-99283',
      plan_type:         'transactional.us_business_standard',
      plan_fee_in_cents: 2995,
      interest_rate:     0,
      balance_in_cents:  5433,
      balance_currency:  'usd'
    }
  ];

  app.ACCOUNTS = ACCOUNTS;

  app.findAccount = function(id) {
    return app.findOne('account', id);
  };

  router.get('/accounts', function(req, res) {
    setTimeout(function() {
      res.send({ accounts: ACCOUNTS });
    }, 750);
  });

  router.get('/accounts/:id', function(req, res) {
    app.renderOne(res, 'account', app.findAccount(req.param('id')));
  });

  app.use('/api', router);
};
