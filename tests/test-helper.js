import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import server from './helpers/pretender';

setResolver(resolver);
server();

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
