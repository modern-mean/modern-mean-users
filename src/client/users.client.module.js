(function(app) {
  'use strict';

  app.registerModule('users', ['core', 'ngFileUpload']);
  app.registerModule('users.templates', ['core']);
  app.registerModule('users.config', ['core.config']);
  app.registerModule('users.services', ['users.config']);
  app.registerModule('users.routes', ['core.routes', 'users.config']);
  app.registerModule('users.admin', ['core']);
  app.registerModule('users.admin.routes', ['core.routes']);

})(window.modernMeanApplication);
