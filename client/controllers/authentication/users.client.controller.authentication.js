(function() {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$state', '$log'];

  function AuthenticationController($state, $log) {
    var vm = this;

    vm.selected = (($state.params.type === 'signin') ? 0 : 1);

    $log.info('AuthenticationController::Init', $state.params);
  }
})();
