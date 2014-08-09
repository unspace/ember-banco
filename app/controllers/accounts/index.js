import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: 'accounts',

  model: Ember.computed.sort('controllers.accounts', function(aTime, bTime) {
    var a = aTime.valueOf();
    var b = bTime.valueOf();

    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  })
});
