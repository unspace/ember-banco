import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'accounts',

  model: Ember.computed.sort('controllers.accounts', function(a, b) {
    var aTime = a.valueOf();
    var bTime = b.valueOf();

    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  })
});
