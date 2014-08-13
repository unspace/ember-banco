// partially stolen from Discourse's Ember tests
// https://github.com/discourse/discourse/blob/master/test/javascripts/helpers/create-pretender.js.es6
var data = {};
data.SESSION = {
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

data.ACCOUNTS = [
  {
    id:                '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
    updated_at:        '2014-08-08T15:02:45.528Z',
    type:              'transactional',
    label:             'Personal Chequing',
    plan_type:         'transactional.unlimited',
    plan_fee_in_cents: 999,
    interest_rate:     0,
    balance_in_cents:  20000,
    balance_currency:  'cad'
  },
  {
    id:                '4d6bbd86-09cd-46b8-b81b-086b6b06eb68',
    updated_at:        '2014-08-01T06:33:17.442Z',
    type:              'transactional',
    label:             'Business Revenue',
    plan_type:         'transactional.us_business_standard',
    plan_fee_in_cents: 2995,
    interest_rate:     0,
    balance_in_cents:  5433,
    balance_currency:  'usd'
  }
];

data.TRANSACTIONS = [
  {
    id:              '9f309941-ce83-41eb-c6ad-46b7283f9fe7',
    account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
    created_at:      '2014-08-08T15:02:45.528Z',
    type:            'cr',
    summary:         'Cheque Deposit',
    detail:          'Partner ABM - BMO Bloor & Lansdowne',
    image_url:       '/assets/cheques/9f309941-ce83-41eb-c6ad-46b7283f9fe7.jpg',
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
  }
];

data.TRANSFERS = [
  {
    id:              '1f309941-b443-41eb-c6ad-46b7283f9fe7',
    payee_id:        '2cc4537e-f16e-4e81-953d-1f4cb9858993',
    account_id:      '3f946b41-e8c3-4e1b-ac6d-8f3099728fe7',
    created_at:      '2013-08-08T15:02:45.528Z',
    state:           'complete',
    detail:          'Memo: Thanks for spotting me for lunch!',
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

data.PAYEES = [
  {
    id:         '2cc4537e-f16e-4e81-953d-1f4cb9858993',
    created_at: '2011-06-08T11:02:22.112Z',
    type:       'iet',
    label:      'Mattia Gheda',
    route:      'mattia@unspace.ca'
  },
  {
    id:         '1cc4537e-f16e-4e81-953d-1f4cb9858993',
    created_at: '2003-02-26T00:00:00.000Z',
    type:       'iet',
    label:      'Mom',
    route:      'mom@example.com'
  }
];

function findOne(collectionName, id) {
  var collection = collectionName.toUpperCase() + 'S';
  var all = data[collection];
  var i;
  var obj;

  for (i = 0; i < all.length; i++) {
    obj = all[i];

    if (obj.id === id) {
      return obj;
    }
  }

  return null;
}

function parsePostData(query) {
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function response(code, obj) {
  if (typeof code === "object") {
    obj = code;
    code = 200;
  }
  return [code, {"Content-Type": "application/json"}, obj];
}

function findTransaction(id) {
  var i;
  var t;

  for (i = 0; i < data.TRANSACTIONS.length; i++) {
    t = data.TRANSACTIONS[i];

    if (t.id === id) {
      return t;
    }
  }

  return null;
}

export default function() {
  var server = new window.Pretender(function() {
    this.get('/api/session', function(request){
      return [200, {"Content-Type": "application/json"}, {session: data.SESSION}];
    });

    this.get('/api/accounts', function(request){
      return [200, {"Content-Type": "application/json"}, {accounts: data.ACCOUNTS}];
    });

    this.get('/api/accounts/:id', function(request){
      var i, a;
      var account = findOne('account', request.params.id);
      return [200, {"Content-Type": "application/json"}, {account: account}];
    });

    this.get('/api/transactions', function(req) {
      var accountId = req.queryParams['account_id'];
      var i, t, found = [];

      for (i = 0; i < data.TRANSACTIONS.length; i++) {
        t = data.TRANSACTIONS[i];

        if (t.account_id !== accountId) {
          continue;
        } else {
          found.push(t);
        }
      }

      return [200, {"Content-Type": "application/json"}, {transactions: found}];
    });

    this.get('/api/transfers', function(request){
      return [200, {"Content-Type": "application/json"}, {transfers: data.TRANSFERS}];
    });

    this.get('/api/payees/:id', function(request){
      var payee = findOne('payee', request.params.id);
      return [200, {"Content-Type": "application/json"}, {payee: payee}];
    });

    this.get('/api/payees', function(request){
      return [200, {"Content-Type": "application/json"}, {payees: data.PAYEES}];
    });
  });

  server.prepareBody = function(body){
    if (body && typeof body === "object") {
      return JSON.stringify(body);
    }
    return body;
  };

  server.unhandledRequest = function(verb, path) {
    var error = 'Unhandled request in test environment: ' + path + ' (' + verb + ')';
    window.console.error(error);
    throw error;
  };

  return server;
}
