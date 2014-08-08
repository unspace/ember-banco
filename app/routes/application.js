import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
    if (tokens.length) {
      return tokens.join(' / ') + ' - Banco';
    } else {
      return 'Banco';
    }
  }
});
