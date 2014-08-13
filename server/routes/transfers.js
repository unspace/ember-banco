module.exports = function(app) {
  var router = require('express').Router();
  var uuid   = require('node-uuid');

  var TRANSFERS = [
    {
      id:              '1f309941-b443-41eb-c6ad-46b7283f9fe7',
      payee_id:        '2cc4537e-f16e-4e81-953d-1f4cb9858993',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2013-08-08T15:02:45.528Z',
      state:           'complete',
      message:         'Thanks for spotting me for lunch!',
      amount_in_cents: 1400
    },
    {
      id:              '1f309941-b443-41eb-c6ad-aaaaaaaaaaaa',
      payee_id:        '1cc4537e-f16e-4e81-953d-1f4cb9858993',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2013-08-01T13:02:45.528Z',
      state:           'complete',
      detail:          'Memo: Thanks for the coffee',
      amount_in_cents: 400
    }
  ];

  app.TRANSFERS = TRANSFERS;

  app.findTransfer = function(id) {
    return app.findOne('transfer', id);
  };

  app.createTransfer = function(params) {
    var transfer = {
      id:              uuid.v1(),
      created_at:      new Date().toISOString(),
      state:           'unconfirmed',
      payee_id:        params.payee_id,
      account_id:      params.account_id,
      amount_in_cents: params.amount_in_cents
    };

    var amount = parseInt(transfer.amount_in_cents, 10);

    if ((transfer.payee_id || '').trim() === '') {
      return { errors: { payee: 'must be provided' } };
    }

    if ((transfer.account_id || '').trim() === '') {
      return { errors: { account: 'must be provided' } };
    }

    if (isNaN(amount) || amount < 5) {
      return { errors: { amount_in_cents: 'must be at least 5 cents' } };
    }

    return transfer;
  };

  router.post('/transfers', function(req, res) {
    var transfer = app.createTransfer(req.body.transfer);

    if (transfer.errors) {
      res.status(422).send(transfer);
    } else {
      res.status(201)
        .set('Content-Type', 'application/vnd.banco.v1+json')
        .location('/api/transfers/' + transfer.id)
        .send({ transfer: transfer });
    }
  });

  router.put('/transfers/:id', function(req, res) {
    var transfer = app.findTransfer(req.param('id'));
    var params   = req.body.transfer;

    if (!transfer) {
      req.status(404).send({ error: { code: 'not_found' } });
      return;
    }

    if (params.verify_amount_in_cents !== transfer.amount_in_cents) {
      req.status(422).send({
        errors: {
          verify_amount_in_cents: ['must match the transfer amount']
        }
      });
      return;
    }

    transfer.state = 'pending';

    req.send({ transfer: transfer });
  });

  router.get('/transfers', function(req, res) {
    res.send({ transfers: TRANSFERS });
  });

  router.get('/transfers/:id', function(req, res) {
    app.renderOne(res, 'transfer', app.findTransfer(req.param('id')));
  });

  app.use('/api', router);
};
