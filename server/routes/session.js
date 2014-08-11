module.exports = function(app) {
  var router = require('express').Router();

  function jsonError(code, detail) {
    return { error: {
      code: code,
      detail: detail
    } };
  }

  var SESSION = {
    id:                 'current',
    name:               'Carsten Nielsen',
    email:              'carsten@unspace.ca',
    address:            '1332 Bloor St. West',
    addressCont:        'Ground Floor',
    postalCode:         'M6H1P2',
    city:               'Toronto',
    province:           'on',
    dayPhone:           '(416) 977-0269',
    eveningPhone:       null,
    wantsNewsletter:    true,
    wantsPromotions:    false,
    wantsPartnerEmails: false
  };

  app.SESSION = SESSION;

  router.get('/session', function(req, res) {
    res.send({ session: SESSION });
  });

  app.use('/api', router);
};
