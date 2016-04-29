(function() {
  'use strict';

  angular
    .module('users')
    .controller('SignupAuthenticationController', SignupAuthenticationController);

  SignupAuthenticationController.$inject = ['Authentication', 'PasswordValidator', '$state', '$location', '$mdToast', '$mdDialog', '$log'];

  function SignupAuthenticationController(Authentication, PasswordValidator, $state, $location, $mdToast, $mdDialog, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.cancel = cancel;
    vm.clearForm = clearForm;
    vm.error = undefined;
    vm.forms = {};
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.signup = signup;
    vm.user = {};

    function cancel() {
      $mdDialog.cancel();
    }

    function signup () {
      $log.debug('SignupAuthenticationController::signup', vm);
      vm.error = undefined;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Authentication
        .signup(vm.user)
        .then(
          function (response) {
            vm.cancel();
            toast.textContent('Signup Successful!').theme('toast-success');
            $mdToast.show(toast);
            vm.clearForm();
            $log.debug('SignupAuthenticationController::signup::success', response);
          },
          function (err) {
            vm.error = err.data.message;
            $log.debug('SignupAuthenticationController::signup::error', err);
          }
        );
    }

    function clearForm() {
      vm.user = {};
      vm.user.email = '';
      vm.user.password = '';
      vm.forms.signUp.$rollbackViewValue();
      vm.forms.signUp.$setPristine();
      vm.forms.signUp.$setUntouched();
    }

    $log.info('SignupAuthenticationController::Init', vm);
  }
})();
