import ApplicationAdapter from 'banco/adapters/application';

export default ApplicationAdapter.extend({
  buildURL: function() {
    return '/api/session';
  }
});
