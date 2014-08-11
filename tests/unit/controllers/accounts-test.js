import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

moduleFor('controller:accounts', 'Accounts Controller', {
  setup: function () {
    this.subject({
      model: [
        Ember.Object.create({updatedAt: moment('2013-09-14')}),
        Ember.Object.create({updatedAt: moment('2014-09-13')}),
      ]
    });
  },
  teardown: function () {}
});

test('it exists', function(){
  ok(this.subject());
});

test('it has models', function(){
  equal(this.subject().get('model').length, 2);
});

test('it sorts in inverse order', function(){
  equal(this.subject().get('firstObject.updatedAt')._i, '2013-09-14');
  equal(this.subject().get('sorted.firstObject.updatedAt')._i, '2014-09-13');
});

