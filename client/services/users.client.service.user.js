(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('User', User);

  User.$inject = ['$resource', 'MODULES'];

  function User($resource, MODULES) {

    return $resource(MODULES.users.api.endpoints.me, {}, {
      addresses: {
        url: MODULES.users.api.endpoints.me + '/addresses',
        method: 'PUT'
      },
      emails: {
        url: MODULES.users.api.endpoints.me + '/emails',
        method: 'PUT'
      },
      update: {
        method: 'PUT'
      }
    });

  }
})();
