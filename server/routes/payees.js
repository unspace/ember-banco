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
      id:         '7cc4537e-f16e-4e81-953d-1f4cb9858993',
      created_at: '2011-06-08T11:02:22.112Z',
      type:       'iet',
      label:      'Mattia Gheda',
      route:      'mattia@unspace.ca'
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

    if (String.prototype.trim(payee.label) === '') {
      return { errors: { label: ['must be provided'] } };
    }

    if (payee.type === 'iet' && !EMAIL_RNG.test(payee.route)) {
      return { errors: { route: ['is not a valid email address'] } };
    }

    if (String.prototype.trim(payee.route) === '') {
      return { errors: { route: ['must be provided'] } };
    }

    app.PAYEES.unshift(payee);

    return payee;
  };

  app.findPayee = function(id) {
    var i;
    var p;

    for (i = 0; i < PAYEES.length; i++) {
      p = PAYEES[i];

      if (p.id === id) {
        return p;
      }
    }

    return null;
  };

  router.post('/payees', function(req, res) {
    var payee = app.createPayee(req.body);

    if (payee.errors) {
      res.status(422).send(payee);
    } else {
      res.status(201).location('/payees/' + payee.id).send();
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
