import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'application',

  currentPath: Ember.computed.alias('controllers.application.currentPath'),

  inOverview:  Ember.computed.match('currentPath', /^index$/),
  inAccounts:  Ember.computed.match('currentPath', /^account/),
  inTransfers: Ember.computed.match('currentPath', /^transfer/)
});
