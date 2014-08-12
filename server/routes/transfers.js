module.exports = function(app) {
  var router = require('express').Router();

  var TRANSFERS = [
    {
      id:              '9f309941-ce83-41eb-c6ad-46b7283f9fe7',
      account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
      created_at:      '2014-08-08T15:02:45.528Z',
      type:            'cr',
      summary:         'Cheque Deposit',
      detail:          'Partner ABM - BMO Bloor & Lansdowne',
      image_url:       '/assets/cheques/9f309941-ce83-41eb-c6ad-46b7283f9fe7.jpg',
      amount_in_cents: 48500
    }
  ];

  app.TRANSFERS = TRANSFERS;

  app.findTransfer = function(id) {
    return app.findOne('transfer', id);
  };

  router.get('/transfers', function(req, res) {
    res.send({ transfers: TRANSFERS });
  });

  router.get('/transfers/:id', function(req, res) {
    app.renderOne(res, 'transfer', app.findTransfer(req.param('id')));
  });

  app.use('/api', router);
};
