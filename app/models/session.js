import DS from 'ember-data';

export default DS.Model.extend({
  name:               DS.attr('string'),
  email:              DS.attr('string'),
  address:            DS.attr('string'),
  addressCont:        DS.attr('string'),
  postalCode:         DS.attr('string'),
  city:               DS.attr('string'),
  province:           DS.attr('string'),
  dayPhone:           DS.attr('string'),
  eveningPhone:       DS.attr('string'),
  wantsNewsletter:    DS.attr('boolean'),
  wantsPromotions:    DS.attr('boolean'),
  wantsPartnerEmails: DS.attr('boolean')
});
