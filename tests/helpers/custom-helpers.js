import Ember from 'ember';

var customHelpers = function() {

  Ember.Test.registerHelper('findFirstAndCheckText',
    function(app, selector, text, context) {
      var el = findWithAssert(selector, context).first();
      var content = el.text().trim();
      equal(content, text, 'found: ' + text);
    }
  );

}();

export default customHelpers;

