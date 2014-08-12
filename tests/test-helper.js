import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

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

var server = new window.Pretender(function(){
  this.get('/api/session', function(request){
    return [200, {"Content-Type": "application/json"}, JSON.stringify({session: SESSION})];
  });
});
