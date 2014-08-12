// partially stolen from Discourse's Ember tests
// https://github.com/discourse/discourse/blob/master/test/javascripts/helpers/create-pretender.js.es6
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

export default function() {
  var server = new window.Pretender(function() {
    this.get('/api/session', function(request){
      return [200, {"Content-Type": "application/json"}, {session: SESSION}];
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
