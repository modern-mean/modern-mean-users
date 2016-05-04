(function() {
  'use strict';

  //TODO this should be Users service
  angular
    .module('users.admin')
    .factory('UserAdmin', UserAdmin);

  UserAdmin.$inject = ['$resource', 'MODULES'];

  function UserAdmin($resource, MODULES) {
    return $resource(MODULES.admin.api.endpoint + '/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
