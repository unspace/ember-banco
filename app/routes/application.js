import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      session: this.store.find('session', 'current')
    });
  },

  setupController: function(_, data) {
    this.controllerFor('session').set('model', data.session);
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
      var $body = Ember.$('body');

      this.router.one('didTransition', function() {
        $body.addClass('reveal');

        $body.one('transitionend', function() {
          $body.removeClass('loading', 'reveal');
        });
      });

      return true;
    },

    closeOverlay: function() {
      var route = this;
      var $body = Ember.$('body');

      $('body').addClass('dismiss-overlay');

      $('body').on('transitionend', function() {
        $body.removeClass('dismiss-overlay', 'has-overlay');

        route.disconnectOutlet({
          outlet: 'overlay',
          parentView: 'application'
        });
      });
    }
  }
});
