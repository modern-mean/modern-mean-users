(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('Authorization', Authorization);

  Authorization.$inject = ['$resource'];

  function Authorization($resource) {

    return $resource('/api/me/authorization');

  }
})();
