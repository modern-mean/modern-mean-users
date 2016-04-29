(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersProfileController', UsersProfileController);

  UsersProfileController.$inject = ['userResolve', '$log'];

  function UsersProfileController(userResolve, $log) {
    var vm = this;

    vm.user = userResolve;

    $log.info('Users::UsersProfileController::Init', vm);
  }
})();
