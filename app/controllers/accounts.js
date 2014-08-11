import Ember from 'ember';

export default Ember.ArrayController.extend({
  sorted: Ember.computed.sort('@this', function(modelA, modelB) {
    var a = modelA.get('updatedAt');
    var b = modelB.get('updatedAt');

    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  })
});
