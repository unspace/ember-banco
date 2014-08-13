module.exports = function(app) {
  var router = require('express').Router();
  var uuid   = require('node-uuid');

  var TEXT_RNG   = /^[a-z0-9 "':,!\?\-\$\.\@\(\)\[\]\\\/]+$/i;
  var ANSWER_RNG = /^[a-z0-9 ]+$/i;

  var TRANSFERS = [
    {
      id:              '1f309941-b443-41eb-c6ad-46b7283f9fe7',
      payee_id:        '2cc4537e-f16e-4e81-953d-1f4cb9858993',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2013-08-08T15:02:45.528Z',
      state:           'complete',
      iet_message:     'Thanks for spotting me for lunch!',
      amount_in_cents: 1400
    },
    {
      id:              '1f309941-b443-41eb-c6ad-aaaaaaaaaaaa',
      payee_id:        '1cc4537e-f16e-4e81-953d-1f4cb9858993',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2013-08-01T13:02:45.528Z',
      state:           'complete',
      iet_message:     'Thanks for the coffee',
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
      amount_in_cents: params.amount_in_cents,
    };

    var amount = parseInt(transfer.amount_in_cents, 10);

    if ((transfer.payee_id || '').trim() === '') {
      return { errors: { payee: ['must be provided'] } };
    }

    if ((transfer.account_id || '').trim() === '') {
      return { errors: { account: ['must be provided'] } };
    }

    if (isNaN(amount) || amount < 5) {
      return { errors: { amount_in_cents: ['must be at least 5 cents'] } };
    }

    app.TRANSFERS.unshift(transfer);

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

  router.delete('/transfers/:id', function(req, res) {
    var transfer = app.findTransfer(req.param('id'));

    if (!transfer || transfer.state !== 'unconfirmed') {
      res.status(404).send({ error: { code: 'not_found' } });
      return;
    }

    app.TRANSFERS.splice(app.TRANSFERS.indexOf(transfer), 1);

    res.status(204).send();
  });

  router.put('/transfers/:id', function(req, res) {
    var transfer = app.findTransfer(req.param('id'));
    var payee    = app.findPayee(transfer.payee_id);
    var params   = req.body.transfer;

    if ((!transfer || transfer.state !== 'unconfirmed') || !payee) {
      res.status(404).send({ error: { code: 'not_found' } });
      return;
    }

    if (params.verify_amount_in_cents !== transfer.amount_in_cents) {
      app.renderModelError(res, 'verify_amount_in_cents', 'must match the original amount');
      return;
    }

    if (payee.type === 'iet') {
      if (!params.iet_question || params.iet_question.trim() === '') {
        app.renderModelError(res, 'iet_question', 'must be provided');
        return;
      }

      if (!TEXT_RNG.test(params.iet_question)) {
        app.renderModelError(res, 'iet_question', 'can not contain special characters');
        return;
      }

      if (params.iet_question.length > 100) {
        app.renderModelError(res, 'iet_question', 'can not be longer than 100 characters');
        return;
      }

      if (!params.iet_answer || params.iet_answer.trim() === '') {
        app.renderModelError(res, 'iet_answer', 'must be provided');
        return
      }

      if (!ANSWER_RNG.test(params.iet_answer)) {
        app.renderModelError(res, 'iet_answer', 'can only contain numbers and letters');
        return;
      }

      if (params.iet_answer.length > 50) {
        app.renderModelError(res, 'iet_answer', 'can not be longer than 50 characters');
        return;
      }

      if (params.iet_message && params.iet_message.trim() !== '') {
        if (params.iet_message.length > 400) {
          app.renderModelError(res, 'iet_message', 'can not be longer than 400 characters');
          return;
        }

        if (!TEXT_RNG.test(params.iet_message)) {
          app.renderModelError(res, 'iet_message', 'can not contain special characters');
          return;
        }
      }

      transfer.iet_question = params.iet_question;
      transfer.iet_answer   = params.iet_answer;
      transfer.iet_message  = params.iet_message;
    }

    transfer.state = 'pending';

    res.send({ transfer: transfer });
  });

  router.get('/transfers', function(req, res) {
    var filtered = app.filter('transfers', {
      state: ['pending', 'failed', 'complete']
    });

    res.send({ transfers: filtered });
  });

  router.get('/transfers/:id', function(req, res) {
    app.renderOne(res, 'transfer', app.findTransfer(req.param('id')));
  });

  app.use('/api', router);
};
