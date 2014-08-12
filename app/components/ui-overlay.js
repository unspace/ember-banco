import Ember from 'ember';

var ESC          = 27;
var ANIMATIONEND = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd';
var $document    = Ember.$(document);

export default Ember.Component.extend({
  classNames: 'ui-overlay',
  role: 'dialog',

  actions: {
    close: function() {
      var component = this;

      this.$().addClass('fade-out');

      this.$().on(ANIMATIONEND, function() {
        Ember.run(function() {
          component.sendAction('close');
        });
      });
    }
  },

  closeIfClickedOutsideOfContentArea: function(event) {
    if (event.target !== this.get('element')) {
      return;
    }

    this.send('close');
  }.on('click'),

  addFadeInClass: function() {
    this.$().addClass('fade-in');
  }.on('didInsertElement'),

  registerEscapeListener: function() {
    var component = this;

    $document.on('keyup.ui-overlay', function(event) {
      Ember.run(function() {
        if (event.which !== ESC) {
          return;
        }

        component.send('close');
      });
    });

  }.on('didInsertElement'),

  deregisterEscapeListener: function() {
    $document.off('keyup.ui-overlay');
  }.on('willDestroyElement')
});
