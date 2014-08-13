import Ember from 'ember';

export default function(key, dict, opts) {
  var dictObj = {};
  var idProp;
  var labelProp;

  if (!opts) {
    opts = {};
  }

  idProp    = opts.idProperty    || 'id';
  labelProp = opts.labelProperty || 'label';

  if (dict instanceof Array) {
    dict.forEach(function(obj) {
      dictObj[obj[idProp]] = obj[labelProp];
    });
  } else {
    dictObj = dict;
  }

  return Ember.computed(function() {
    var id = this.get(key);

    return id ? dictObj[id] : null;
  }).property(key);
}
