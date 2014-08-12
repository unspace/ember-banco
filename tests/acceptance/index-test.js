import Ember from 'ember';
import startApp from '../helpers/start-app';

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

var server = new Pretender(function(){
  this.get('/api/session', function(request){
    return [200, {"Content-Type": "application/json"}, JSON.stringify({session: SESSION})]
  });
});

var App;

module('Acceptance: Index', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /', function() {
  visit('/');

  andThen(function() {
    equal(currentPath(), 'index');
  });
});
