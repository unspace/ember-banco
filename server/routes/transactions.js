module.exports = function(app) {
  var router = require('express').Router();

  var TRANSACTIONS = [
    {
      id:              '9f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-08T15:02:45.528Z',
      type:            'cr',
      summary:         'Cheque Deposit',
      detail:          'Partner ABM - BMO Bloor & Lansdowne',
      image_url:       '/assets/cheques/3f309941-ce83-41eb-c6ad-46b7283f9fe7.jpg',
      amount_in_cents: 48500
    },
    {
      id:              '8f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-07T15:02:45.528Z',
      type:            'dr',
      summary:         'IDP #2723347',
      detail:          'Indian Kiss Toronto',
      amount_in_cents: 6482
    },
    {
      id:              '7f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-06T15:02:45.528Z',
      type:            'dr',
      summary:         'IDP #9928384',
      detail:          'La Bicicletta Toronto',
      amount_in_cents: 8459
    },
    {
      id:              '6f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-07-05T15:02:45.528Z',
      type:            'cr',
      summary:         'Interac e-Transfer: mattia@unspace.ca',
      detail:          'Message: Reimbursement for dog food.',
      amount_in_cents: 2844
    },
    {
      id:              '5f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-04T15:02:45.528Z',
      type:            'dr',
      summary:         'IDP #8928282',
      detail:          'Petsmart Etobicoke',
      amount_in_cents: 2844
    },
    {
      id:              '4f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-03T15:02:45.528Z',
      type:            'dr',
      summary:         'IDP #7283843',
      detail:          'Propeller Coffee Toronto',
      amount_in_cents: 520
    },
    {
      id:              '3f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-02T15:02:45.528Z',
      type:            'cr',
      summary:         'Cheque Deposit',
      detail:          'Partner ABM - BMO Bloor & Lansdowne',
      image_url:       '/assets/cheques/3f309941-ce83-41eb-c6ad-46b7283f9fe7.jpg',
      amount_in_cents: 35192
    },
    {
      id:              '2f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-01T15:02:45.528Z',
      type:            'dr',
      summary:         'Account fee',
      detail:          'Monthly fee for your Banco Unlimited Chequing plan',
      amount_in_cents: 1013,
      amount_currency: 'cad'
    },
    {
      id:              '1f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-07-30T15:02:45.528Z',
      type:            'dr',
      summary:         'TekSavvy',
      detail:          'Monthly invoice for Internet Express 10',
      amount_in_cents: 4237
    },
    {
      id:              '0f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-07-29T15:02:45.528Z',
      type:            'dr',
      summary:         'IDP #6069584',
      detail:          'Caplansky\'s Deli Toronto',
      amount_in_cents: 3829
    }
  ];

  app.TRANSACTIONS = TRANSACTIONS;

  app.findTransaction = function(id) {
    var i;
    var t;

    for (i = 0; i < TRANSACTIONS.length; i++) {
      t = TRANSACTIONS[i];

      if (t.id === id) {
        return t;
      }
    }

    return null;
  }

  router.get('/transactions', function(req, res) {
    var transactions = [];
    var accountId = req.query.account_id;
    var account = app.findAccount(accountId);
    var i;
    var t;

    if (!account) {
      res.status(404).send({
        error: {
          code: 'not_found',
          detail: 'Unable to find Account for account_id'
        }
      });

      return;
    }

    for (i = 0; i < TRANSACTIONS.length; i++) {
      t = TRANSACTIONS[i];

      if (t.account_id !== accountId) {
        continue;
      } else {
        transactions.push(t);
      }
    }

    res.send({
      transactions: transactions,
      account: account
    });
  });

  router.get('/transactions/:id', function(req, res) {
    var found = app.findTransaction(req.param('id'));

    if (found) {
      res.send({ transaction: found });
    } else {
      res.status(404).send({
        error: {
          code: 'not_found',
          detail: 'Transaction not found'
        }
      });
    }
  });

  app.use('/api', router);
};
