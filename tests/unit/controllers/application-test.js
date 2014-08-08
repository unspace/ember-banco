import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:application', 'ApplicationController', {
  setup: function () {},
  teardown: function () {}
});

test('it provides the current year', function(){
  equal(this.subject().get('year'), new Date().getFullYear());
});
