(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersRightNavController', UsersRightNavController);

  UsersRightNavController.$inject = ['Authentication', '$state', '$mdComponentRegistry', '$mdToast', '$log'];

  function UsersRightNavController(Authentication, $state, $mdComponentRegistry, $mdToast, $log) {
    var vm = this;

    vm.authentication = Authentication;

    $mdComponentRegistry
      .when('coreRightNav')
      .then(function(nav) {
        vm.navigation = nav;
      });


    $log.info('UserRightNavController::Init', vm);
  }
})();
