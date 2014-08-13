import Ember from 'ember';

export default function(key, dictObj) {
  return Ember.computed(function() {
    var id = this.get(key);

    return id ? dictObj[id] : null;
  }).property(key);
}
