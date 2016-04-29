(function () {
  'use strict';

  angular
    .module('users')
    .controller('UsersHeaderController', UsersHeaderController);

  UsersHeaderController.$inject = ['$mdComponentRegistry', 'Authentication', '$mdDialog', '$mdMedia', '$mdToast', '$state','$log'];

  function UsersHeaderController($mdComponentRegistry, Authentication, $mdDialog, $mdMedia, $mdToast, $state, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.isAdmin = false;
    vm.navigation = {};
    vm.signin = signin;
    vm.signup = signup;
    vm.signout = signout;
    vm.userMenu = {
      open: false
    };

    $mdComponentRegistry
      .when('coreLeftNav')
      .then(function(nav) {
        vm.navigation.left = nav;
      });

    Authentication.ready
      .then(function () {
        vm.isAdmin = (Authentication.authorization.roles && Authentication.authorization.roles.indexOf('admin') !== -1);
        $log.debug('UsersHeaderController::AuthReady', Authentication);
      });

    function signin() {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: 'SigninAuthenticationController',
        controllerAs: 'vm',
        templateUrl: 'modern-mean-users-material/views/authentication/users.client.views.authentication.signin.html',
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });
    }

    function signup() {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
      $mdDialog.show({
        controller: 'SignupAuthenticationController',
        controllerAs: 'vm',
        templateUrl: 'modern-mean-users-material/views/authentication/users.client.views.authentication.signup.html',
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      });

    }

    function signout() {
      $log.debug('UserRightNavController::signout', vm);
      Authentication.signout()
        .then(function () {
          $state.go('root.home');
          var toast = $mdToast.simple()
            .textContent('Signout Successful!')
            .position('bottom right')
            .hideDelay(6000)
            .theme('toast-success');

          $mdToast.show(toast);
          $log.debug('UserRightNavController::success', Authentication);
        });

    }

    $log.info('UsersHeaderController::Init', vm);
  }
})();
