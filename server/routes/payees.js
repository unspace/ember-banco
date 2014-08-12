module.exports = function(app) {
  var router = require('express').Router();
  var uuid   = require('node-uuid');

  var TYPES = [
    'iet',
    'wire',
    'cc',
    'bill'
  ];

  var EMAIL_RE = /^[^@]+@[^@]+$/;

  var PAYEES = [
    {
      id:         '2cc4537e-f16e-4e81-953d-1f4cb9858993',
      created_at: '2011-06-08T11:02:22.112Z',
      type:       'iet',
      label:      'Mattia Gheda',
      route:      'mattia@unspace.ca'
    },
    {
      id:         '1dc4537e-f16e-4e81-953d-1f4cb9858993',
      created_at: '2009-09-21T18:32:44.922Z',
      type:       'bill',
      label:      'Enbridge',
      route:      '20034-A-44424931'
    },
    {
      id:         '1db4537e-f16e-4e81-953d-1f4cb9858993',
      created_at: '2009-01-04T01:22:17.201Z',
      type:       'cc',
      label:      'PC Mastercard',
      route:      '5104 4444 4444 4444'
    },
    {
      id:         '1cc4537e-f16e-4e81-953d-1f4cb9858993',
      created_at: '2003-02-26T00:00:00.000Z',
      type:       'iet',
      label:      'Mom',
      route:      'mom@example.com'
    }
  ];

  app.PAYEES = PAYEES;

  app.createPayee = function(params) {
    var payee = {
      id: uuid.v1(),
      created_at: new Date().toISOString()
    };

    payee.type  = params.type;
    payee.label = params.label;
    payee.route = params.route;

    if (TYPES.indexOf(payee.type) < 0) {
      return { errors: { type: ['is not allowed'] } };
    }

    if ((payee.label || '').trim() === '') {
      return { errors: { label: ['must be provided'] } };
    }

    if (payee.type === 'iet' && !EMAIL_RNG.test(payee.route)) {
      return { errors: { route: ['is not a valid email address'] } };
    }

    if ((payee.route || '').trim() === '') {
      return { errors: { route: ['must be provided'] } };
    }

    app.PAYEES.unshift(payee);

    return payee;
  };

  app.findPayee = function(id) {
    return app.findOne('payee', id);
  };

  router.post('/payees', function(req, res) {
    var payee = app.createPayee(req.body.payee);

    if (payee.errors) {
      res.status(422).send(payee);
    } else {
      res.status(201)
        .set('Content-Type', 'application/vnd.banco.v1+json')
        .location('/api/payees/' + payee.id)
        .send({ payee: payee });
    }
  });

  router.get('/payees', function(req, res) {
    res.send({ payees: PAYEES });
  });

  router.get('/payees/:id', function(req, res) {
    app.renderOne(res, 'payee', app.findPayee(req.param('id')));
  });

  app.use('/api', router);
};
