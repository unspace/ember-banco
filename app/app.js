import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'banco', // TODO: loaded via config
  Resolver: Resolver
});

Ember.$.ajaxSetup({
  dataType: 'json',
  headers: {
    'Accept': 'application/vnd.banco.v1+json'
  }
});

loadInitializers(App, 'banco');

export default App;
