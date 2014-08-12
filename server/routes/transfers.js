module.exports = function(app) {
  var router = require('express').Router();

  var TRANSFERS = [
    {
      id:              '1f309941-b443-41eb-c6ad-46b7283f9fe7',
      payee_id:        '2cc4537e-f16e-4e81-953d-1f4cb9858993',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2013-08-08T15:02:45.528Z',
      state:           'complete',
      detail:          'Memo: Thanks for spotting me for lunch!',
      amount_in_cents: 1400
    }
  ];

  app.TRANSFERS = TRANSFERS;

  app.findTransfer = function(id) {
    return app.findOne('transfer', id);
  };

  app.createTransfer = function(params) {

  };

  router.post('/transfers', function(req, res) {
    var transfer = app.createPayee(req.body.transfer);

    if (transfer.errors) {
      res.status(422).send(transfer);
    } else {
      res.status(201)
        .set('Content-Type', 'application/vnd.banco.v1+json')
        .location('/api/transfers/' + transfer.id)
        .send({ transfer: transfer });
    }
  });

  router.get('/transfers', function(req, res) {
    res.send({ transfers: TRANSFERS });
  });

  router.get('/transfers/:id', function(req, res) {
    app.renderOne(res, 'transfer', app.findTransfer(req.param('id')));
  });

  app.use('/api', router);
};
