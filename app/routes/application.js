import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      session:  this.store.find('session', 'current'),
      accounts: this.store.find('account')
    });
  },

  setupController: function(_, data) {
    this.controllerFor('session').set('model', data.session);
    this.controllerFor('accounts').set('model', data.accounts);
  },

  title: function(tokens) {
    if (tokens.length) {
      return tokens.join(' / ') + ' - Banco';
    } else {
      return 'BFG - Banco Financial Group';
    }
  },

  actions: {
    loading: function() {
      return true;
    }
  }
});
