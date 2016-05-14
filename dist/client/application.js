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

(function () { 
 return angular.module("users.config")
.constant("MODULES", {"users":{"enable":"true","api":{"hostname":"","endpoints":{"me":"/api/me","auth":"/api/auth"}}},"admin":{"enable":"true","api":{"hostname":"","endpoint":"/api/users"}}})
.constant("SOCIAL", {"facebook":{"enable":"false","callback":"/api/auth/facebook/callback"},"twitter":{"enable":"false","callback":"/api/auth/twitter/callback"},"google":{"enable":"false","callback":"/api/auth/google/callback"},"linkedin":{"enable":"false","callback":"/api/auth/google/callback"},"github":{"enable":"false","callback":"/api/auth/google/callback"}});

})();

(function () { 
 return angular.module("core.config")
.value("UPLOAD", {"profile":{"destination":"./public/img/profile/uploads/","public":"/img/profile/uploads/","limits":{"fileSize":"1045876"}}});

})();

(function() {
  'use strict';

  angular
    .module('users')
    .config(usersConfig);

  usersConfig.$inject = ['$httpProvider'];
  function usersConfig($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

})();

(function () { 
 return angular.module("users.config")
.constant("MODULES", {"users":{"enable":"true","api":{"hostname":"","endpoints":{"me":"/api/me","auth":"/api/auth"}}},"admin":{"enable":"true","api":{"hostname":"","endpoint":"/api/users"}}})
.constant("SOCIAL", {"facebook":{"enable":"false","callback":"/api/auth/facebook/callback"},"twitter":{"enable":"false","callback":"/api/auth/twitter/callback"},"google":{"enable":"false","callback":"/api/auth/google/callback"},"linkedin":{"enable":"false","callback":"/api/auth/google/callback"},"github":{"enable":"false","callback":"/api/auth/google/callback"}});

})();

(function() {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('root.admin', {
        url: '/admin',
        abstract: true,
        data: {
          roles: ['admin']
        },
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/admin/users.client.views.admin.grid.html'
          }
        }
      })
      .state('root.admin.dashboard', {
        url: '/dashboard',
        data: {
          roles: ['admin']
        },
        views: {
          'row-1-col-1': {
            templateUrl: 'modern-mean-users-material/views/cards/users.client.views.cards.admin.users.html'
          }
        }
      })
      .state('root.admin.users', {
        url: '/users',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/admin/users.client.views.list-users.html',
            controller: 'UserListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.admin.user', {
        url: '/users/:userId',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/admin/users.client.views.view-user.html',
            controller: 'UserController',
            controllerAs: 'vm',
            resolve: {
              userResolve: getUser
            }
          }
        }
      })
      .state('root.admin.user-edit', {
        url: '/users/:userId/edit',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/admin/users.client.views.edit-user.html',
            controller: 'UserController',
            controllerAs: 'vm',
            resolve: {
              userResolve: getUser
            }
          }
        }
      });

    getUser.$inject = ['$stateParams', 'UserAdmin'];
    function getUser($stateParams, UserAdmin) {
      return UserAdmin.get({ userId: $stateParams.userId });
    }

  }
})();

(function() {
  'use strict';

  // Setting up route
  angular
    .module('users')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('root.user', {
        abstract: true,
        url: '/user',
        data: {
          roles: ['user', 'admin']
        },
        resolve: {
          userResolve: getUser
        },
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/settings/users.client.views.settings.profile.html',
            controller: 'UsersProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.user.settings', {
        url: '/settings',
        views: {
          'address': {
            templateUrl: 'modern-mean-users-material/views/settings/users.client.views.settings.addresses.html',
            controller: 'UsersAddressController',
            controllerAs: 'vm'
          },
          'email': {
            templateUrl: 'modern-mean-users-material/views/settings/users.client.views.settings.emails.html',
            controller: 'UsersEmailController',
            controllerAs: 'vm'
          },
          'personal': {
            templateUrl: 'modern-mean-users-material/views/settings/users.client.views.settings.personal.html',
            controller: 'UsersPersonalController',
            controllerAs: 'vm'
          },
          'password': {
            templateUrl: 'modern-mean-users-material/views/settings/users.client.views.settings.password.html',
            controller: 'UsersPasswordController',
            controllerAs: 'vm',
          },
          'picture': {
            templateUrl: 'modern-mean-users-material/views/settings/users.client.views.settings.picture.html',
            controller: 'UsersPictureController',
            controllerAs: 'vm'
          }
        }
      })
      .state('root.user.password', {
        abstract: true,
        url: '/password'
      })
      .state('root.user.password.forgot', {
        url: '/forgot',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/password/users.client.views.forgot-password.html',
            controller: 'PasswordController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Forgot Password'
        }
      })
      .state('root.user.password.reset', {
        abstract: true,
        url: '/reset'
      })
      .state('root.user.password.reset.invalid', {
        url: '/invalid',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/password/users.client.views.reset-password-invalid.html'
          }
        }
      })
      .state('root.user.password.reset.success', {
        url: '/success',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/password/users.client.views.reset-password-success.html'
          }
        }
      })
      .state('root.user.password.reset.form', {
        url: '/:token',
        views: {
          'main@': {
            templateUrl: 'modern-mean-users-material/views/password/users.client.views.reset-password.html',
            controller: 'PasswordController',
            controllerAs: 'vm'
          }
        },
        data: {
          pageTitle: 'Password Reset Form'
        }
      });
  }

  getUser.$inject = ['Authentication'];
  function getUser(Authentication) {
    return Authentication.user;
  }

})();

(function() {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['Authentication', 'PasswordValidator', '$stateParams', '$location', '$log'];

  function PasswordController(Authentication, PasswordValidator, $stateParams, $location, $log) {
    var vm = this;

    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.resetUserPassword = resetUserPassword;


    function askForPasswordReset() {
      $log.debug('PasswordController::askForPasswordReset', vm);
      vm.success = vm.error = undefined;

      Authentication
        .forgotPassword(vm.credentials).$promise
        .then(
          function (response) {
            vm.credentials = undefined;
            vm.success = response.message;
            $log.debug('PasswordController::askForPasswordReset::success', response);
          },
          function (err) {
            vm.credentials = undefined;
            vm.error = err.data.message;
            $log.error('PasswordController::askForPasswordReset::error', vm);
          }
        );
    }

    function resetUserPassword() {
      $log.debug('PasswordController::resetUserPassword', vm);
      vm.success = vm.error = undefined;

      Authentication
        .passwordReset($stateParams.token, vm.credentials).$promise
        .then(
          function (response) {
            vm.passwordDetails = undefined;
            $location.path('/password/reset/success');
            $log.debug('PasswordController::resetUserPassword::success', response);
          },
          function (err) {
            vm.passwordDetails = undefined;
            vm.error = err.data.message;
            $log.error('PasswordController::resetUserPassword::error', err);
          }
        );
    }

    $log.info('PasswordController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('users')
    .directive('passwordValidator', passwordValidator);

  passwordValidator.$inject = ['PasswordValidator', '$log'];

  function passwordValidator(PasswordValidator, $log) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.requirements = function (password) {
          $log.info('Users::Directive::passwordValidator::Init', password);
          var status = true;
          if (password) {
            var result = PasswordValidator.getResult(password);
            var requirementsIdx = 0;

            // Requirements Meter - visual indicator for users
            var requirementsMeter = [
              { color: 'danger', progress: '20' },
              { color: 'warning', progress: '40' },
              { color: 'info', progress: '60' },
              { color: 'primary', progress: '80' },
              { color: 'success', progress: '100' }
            ];
            /*
            //commented out during test creation.  Not sure how this would ever happen
            if (result.errors.length < requirementsMeter.length) {
              requirementsIdx = requirementsMeter.length - result.errors.length - 1;
            }
            */

            scope.requirementsColor = requirementsMeter[requirementsIdx].color;
            scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;

            if (result.errors.length) {
              scope.popoverMsg = PasswordValidator.getPopoverMsg();
              scope.passwordErrors = result.errors;
              status = false;
            } else {
              scope.popoverMsg = '';
              scope.passwordErrors = [];
              status = true;
            }
          }
          return status;
        };

      }
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('users')
    .directive('passwordVerify', passwordVerify);

  DirectiveController.$inject = ['$scope', '$log'];
  function DirectiveController($scope, $log) {
    var vm = this;

    $scope.$watchCollection('vm.passwordVerify', function (newObj, oldObj) {
      if (newObj.newPassword && newObj.verifyPassword) {
        if (newObj.newPassword !== newObj.verifyPassword) {
          vm.model.$setValidity('required', false);
        } else {
          vm.model.$setValidity('required', true);
        }
      }
    }, true);

    $log.info('Users::Directive::passwordVerify::Init', vm);

  }

  function passwordVerify() {
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      controller: DirectiveController,
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, element, attrs, ngModel) {
        scope.vm.model = ngModel;
      }
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = [];

  function menuConfig() {

  }
})();

(function() {
  'use strict';

  angular
    .module('users.routes')
    .run(authCheck);

  authCheck.$inject = ['$rootScope', '$state', 'Authentication', 'Authorization', '$log'];
  function authCheck($rootScope, $state, Authentication, Authorization, $log) {
    // Check authentication before changing state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      if (toState.data.ignoreAuth) {
        $log.debug('Users::AuthCheck::Ignored', toState);
        return true;
      }

      Authentication.ready
        .then(function (auth) {
          $log.debug('Users::AuthCheck::Ready', Authentication);
          if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
            var allowed = false;
            toState.data.roles.forEach(function (role) {
              if (role === 'guest' || (Authentication.authorization.roles && Authentication.authorization.roles.indexOf(role) !== -1)) {
                allowed = true;
                return true;
              }
            });

            if (!allowed) {
              $log.debug('Users::AuthCheck::NotAlloweda', Authentication);
              event.preventDefault();
              if (Authentication.token !== undefined) {
                $state.go('root.forbidden');
              } else {
                $state.go('root.home').then(function () {
                  $rootScope.storePreviousState(toState, toParams);
                });
              }
            }
          }
        });
    });

  }
})();

(function() {
  'use strict';

  angular
    .module('users.routes')
    .run(navigationConfig);

  navigationConfig.$inject = ['$state', '$log'];

  function navigationConfig($state, $log) {

    var rootState = $state.get('root');
    rootState.views.rightnav.templateUrl = 'modern-mean-users-material/views/navigation/users.client.views.navigation.rightnav.html';
    rootState.views.rightnav.controller = 'UsersRightNavController';
    rootState.views.header.templateUrl = 'modern-mean-users-material/views/navigation/users.client.views.navigation.header.html';
    rootState.views.header.controller = 'UsersHeaderController';

    $log.info('Users::navigationConfig::Init', rootState);
  }

})();

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

(function() {
  'use strict';

  angular
    .module('users.services')
    .service('Authentication', Authentication);

  Authentication.$inject = ['$q', '$resource', '$http', '$location', '$state', 'User', 'Authorization', 'MODULES', '$log'];

  function Authentication($q, $resource, $http, $location, $state, User, Authorization, MODULES, $log) {


    var readyPromise = $q.defer();

    var service = {
      authorization: new Authorization(),
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      passwordReset: passwordReset,
      ready: readyPromise.promise,
      signout: signout,
      signup: signup,
      signin: signin,
      token: undefined,
      user: new User()
    };

    function changePassword(credentials) {
      return $resource(MODULES.users.api.endpoints.me + '/password').save(credentials);
    }

    function forgotPassword(credentials) {
      return $resource(MODULES.users.api.endpoints.auth + '/forgot').save(credentials);
    }

    function passwordReset(token, credentials) {
      //TODO This probably doesn't work.  Not sending in token.  Should change to a JWT Token anyway
      return $resource(MODULES.users.api.endpoints.auth + '/reset').save(credentials);
    }

    function signout() {
      return $q(function(resolve, reject) {
        removeToken();
        service.user = new User();
        service.authorization = new Authorization();
        setHeader();
        readyPromise = $q.defer();
        resolve();
      });
    }

    function signin(credentials) {
      return $q(function(resolve, reject) {
        $resource(MODULES.users.api.endpoints.auth + '/signin')
          .save(credentials).$promise
          .then(
            function (auth) {
              setToken(auth.token);
              init();
              resolve(service);
            },
            function (err) {
              reject(err);
            }
          );
      });
    }

    function signup(credentials) {
      return $q(function(resolve, reject) {
        $resource(MODULES.users.api.endpoints.auth + '/signup')
          .save(credentials).$promise
          .then(
            function (auth) {
              setToken(auth.token);
              init();
              resolve(service);
            },
            function (err) {
              reject(err);
            }
          );
      });
    }

    function setHeader() {
      if (service.token) {
        $http.defaults.headers.common.Authorization = 'JWT ' + service.token;
      } else {
        $http.defaults.headers.common.Authorization = undefined;
      }
    }

    function setToken(token) {
      service.token = token;
      localStorage.setItem('token', token);
    }

    function removeToken() {
      service.token = undefined;
      localStorage.removeItem('token');
    }

    function init() {
      service.token = localStorage.getItem('token') || $location.search().token || undefined;

      //Remove token from URL
      $location.search('token', undefined);

      if (service.token) {
        setHeader();
        setToken(service.token);
        $q.all([service.user.$get(), service.authorization.$get()])
          .then(function (promises) {
            service.user = promises[0];
            service.authorization = promises[1];
            readyPromise.resolve(service);
          })
          .catch(function (err) {
            removeToken();
          });

      } else {
        readyPromise.resolve(service);
      }
      $log.info('AuthenticationService::Init', service);
    }

    //Run init
    init();

    return service;

  }
})();

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

(function() {
  'use strict';

  // PasswordValidator service used for testing the password strength
  angular
    .module('users.services')
    .factory('PasswordValidator', PasswordValidator);

  PasswordValidator.$inject = ['$window'];

  function PasswordValidator($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        var popoverMsg = 'Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.';
        return popoverMsg;
      }
    };
  }
})();

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

(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['userResolve', '$state', '$log'];

  function UserController(userResolve, $state, $log) {
    var vm = this;

    vm.remove = remove;
    vm.update = update;
    vm.user = userResolve;

    function remove (user) {
      vm.error = undefined;
      vm.user.$remove(
        function () {
          $state.go('root.admin.users');
        },
        function (err) {
          vm.error = err.data.message;
        }
      );
    }

    function update() {

      vm.user.$update(
        function (user) {
          $state.go('root.admin.user', {
            userId: user._id
          });
        },
        function (err) {
          vm.error = err.data.message;
        }
      );
    }

    $log.info('Users.Admin::UserController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['UserAdmin', '$log'];

  function UserListController(UserAdmin, $log) {
    var vm = this;

    UserAdmin.query(function (users) {
      vm.users = users;
      $log.debug('UserListController::UsersLoaded', vm.users);
    });

    $log.info('UserListController::Init', vm);
  }
})();

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

(function() {
  'use strict';

  angular
    .module('users')
    .controller('SigninAuthenticationController', SigninAuthenticationController);

  SigninAuthenticationController.$inject = ['Authentication', '$state', '$mdToast', '$mdDialog','$log'];

  function SigninAuthenticationController(Authentication, $state, $mdToast, $mdDialog, $log) {
    var vm = this;

    vm.authentication = Authentication;
    vm.cancel = cancel;
    vm.clearForm = clearForm;
    vm.credentials = {};
    vm.error = undefined;
    vm.forms = {};
    vm.signin = signin;

    function cancel() {
      $mdDialog.cancel();
    }

    function signin () {
      vm.error = undefined;
      $log.debug('SigninAuthenticationController::signin', vm);
      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Authentication
        .signin(vm.credentials)
        .then(
          function (response) {
            vm.cancel();
            toast.textContent('Signin Successful!').theme('toast-success');
            $mdToast.show(toast);
            vm.clearForm();
            $log.debug('SigninAuthenticationController::signin::success', response);
          },
          function (err) {
            vm.error = err.data.message;
            toast.textContent('Signin Failed!').theme('toast-error');
            $mdToast.show(toast);
            $log.debug('SigninAuthenticationController::signin::error', err);
          }
        );
    }

    function clearForm() {
      vm.credentials.email = '';
      vm.credentials.password = '';
      vm.forms.signIn.$setPristine();
      vm.forms.signIn.$setUntouched();
    }

    $log.info('SigninAuthenticationController::Init', vm);
  }
})();

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

(function() {
  'use strict';

  angular
    .module('users')
    .controller('SocialAuthenticationController', SocialAuthenticationController);

  SocialAuthenticationController.$inject = ['$location', '$state', '$log'];

  function SocialAuthenticationController($location, $state, $log) {
    var vm = this;

    vm.callOauthProvider = callOauthProvider;
    vm.error = $location.search().err || undefined;

    function callOauthProvider (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      $location.path(url);
    }

    $log.info('SocialAuthenticationController::Init', vm);
  }
})();

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

(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersAddressController', UsersAddressController);

  UsersAddressController.$inject = ['Authentication', '$mdToast', '$mdDialog', '$log'];

  function UsersAddressController(Authentication, $mdToast, $mdDialog, $log) {
    var vm = this;

    vm.address = {};
    vm.clear = clear;
    vm.edit = edit;
    vm.editing = false;
    vm.executing = false;
    vm.forms = {};
    vm.remove = remove;
    vm.save = save;
    vm.user = Authentication.user;

    function clear() {
      vm.address = {};
      vm.editing = false;
      vm.user
        .$get()
        .then(function() {
          vm.forms.addressForm.$setPristine();
          vm.forms.addressForm.$setUntouched();
        });
    }

    function edit(address) {
      vm.address = address;
      vm.editing = true;
    }

    function remove(address) {
      $log.debug('UsersAddressController::remove', address);
      var confirm = $mdDialog.confirm()
          .title('Confirm Address Delete?')
          .textContent('Are you sure you want to delete this address?')
          .ok('Yes')
          .cancel('No');

      return $mdDialog
        .show(confirm)
        .then(function(result) {
          vm.user.addresses.splice(vm.user.addresses.indexOf(address), 1);
          vm.save();
          $log.debug('UsersAddressController::remove:success', vm.user.addresses);
        });


    }

    function save() {
      vm.executing = true;
      if (Object.keys(vm.address).length > 0 && vm.user.addresses.indexOf(vm.address) === -1) {
        vm.user.addresses.push(vm.address);
      }

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$addresses(function (response) {
        vm.executing = false;
        vm.clear();
        toast.textContent('Addresses Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersAddressController::save:success', vm.user);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Address Update Error').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersAddressController::remove:error', vm.user.addresses);
      });
    }

    $log.info('Users::UsersAddressController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersEmailController', UsersEmailController);

  UsersEmailController.$inject = ['Authentication', '$mdToast', '$log'];

  function UsersEmailController(Authentication, $mdToast, $log) {
    var vm = this;

    vm.add = add;
    vm.clear = clear;
    vm.executing = false;
    vm.forms = {};
    vm.remove = remove;
    vm.save = save;
    vm.togglePrimary = togglePrimary;
    vm.user = Authentication.user;

    function add() {
      vm.user.emails.push({ email: undefined, default: false });
      $log.debug('UsersEmailController::add:success', vm.user.emails);
    }

    function clear() {
      vm.user
        .$get()
        .then(function() {
          vm.forms.emailForm.$setPristine();
          vm.forms.emailForm.$setUntouched();
        });
    }

    function remove(email) {
      vm.user.emails.splice(vm.user.emails.indexOf(email), 1);
      vm.forms.emailForm.$pristine = false;
      $log.debug('UsersEmailController::remove:success', vm.user.emails);
    }

    function save() {
      $log.debug('UsersEmailController::save', vm);
      vm.executing = true;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$emails(function (response) {
        vm.executing = false;
        clear();
        toast.textContent('Emails Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersEmailController::save:success', response);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Email Update Error').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersEmailController::save:error', err);
      });
    }

    function togglePrimary(email) {
      vm.user.emails.forEach(function (email) {
        email.primary = false;
      });
      email.primary = true;
      $log.debug('UsersEmailController::togglePrimary', email, vm.user.emails);
    }

    $log.info('Users::UsersEmailController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersPasswordController', UsersPasswordController);

  UsersPasswordController.$inject = ['Authentication', 'PasswordValidator', '$mdToast', '$log'];

  function UsersPasswordController(Authentication, PasswordValidator, $mdToast, $log) {
    var vm = this;

    vm.clear = clear;
    vm.forms = {};
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.password = {};
    vm.save = save;

    function clear() {
      vm.password = {};
      vm.forms.passwordForm.$setPristine();
      vm.forms.passwordForm.$setUntouched();
    }

    function save() {
      $log.debug('UsersPasswordController::save', vm);
      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Authentication
        .changePassword(vm.password).$promise
        .then(
          function (response) {
            vm.clear();
            toast.textContent('Password Changed Successfully!').theme('toast-success');
            $mdToast.show(toast);
            $log.debug('UsersPasswordController::save::success', response);
          },
          function (err) {
            toast.textContent('Password Change Error!').theme('toast-error');
            $mdToast.show(toast);
            $log.error('UsersPasswordController::save::error', err);
          }
        );
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersPersonalController', UsersPersonalController);

  UsersPersonalController.$inject = ['Authentication', '$mdToast', '$log'];

  function UsersPersonalController(Authentication, $mdToast, $log) {
    var vm = this;

    vm.clear = clear;
    vm.executing = false;
    vm.save = save;
    vm.user = Authentication.user;

    function clear() {
      vm.user
        .$get()
        .then(function() {
          vm.forms.profileForm.$setPristine();
          vm.forms.profileForm.$setUntouched();
        });
    }

    function save() {
      $log.debug('UsersProfileController::save', vm);
      vm.executing = true;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      vm.user.$update(function (response) {
        vm.executing = false;
        vm.clear();
        toast.textContent('Profile Updated Successfully').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersProfileController::save::success', response);
      }, function (err) {
        vm.executing = false;
        toast.textContent('Profile Update Error').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersProfileController::save::error', err);
      });
    }

    $log.info('Users::UsersPersonalController::Init', vm);
  }
})();

(function() {
  'use strict';

  angular
    .module('users')
    .controller('UsersPictureController', UsersPictureController);

  UsersPictureController.$inject = ['Authentication', 'Upload', '$mdToast', '$log'];

  function UsersPictureController(Authentication, Upload, $mdToast, $log) {
    var vm = this;

    vm.clear = clear;
    vm.file = undefined;
    vm.save = save;
    vm.user = Authentication.user;

    function clear() {
      vm.file = undefined;
    }

    function save() {
      $log.debug('UsersPictureController::save', vm);
      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Upload.upload({
        url: '/api/me/picture',
        data: { newProfilePicture: vm.file },
        headers: {
          Authorization: 'JWT ' + Authentication.token
        }
      })
      .then(function (response) {
        vm.file = undefined;
        Authentication.user.$get();
        toast.textContent('Profile Picture Updated Successfully!').theme('toast-success');
        $mdToast.show(toast);
        $log.debug('UsersPictureController::save::success', response);
      }, function (err) {
        toast.textContent('Profile Picture Update Error!').theme('toast-error');
        $mdToast.show(toast);
        $log.error('UsersPictureController::save::error', err);
      });
    }

  }
})();

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

(function() {
  'use strict';

  angular
    .module('users')
    .controller('SocialAccountsController', SocialAccountsController);

  SocialAccountsController.$inject = ['Authentication'];

  function SocialAccountsController(Authentication) {
    var vm = this;

    vm.providers = [
      {
        name: 'facebook',
        image: '/dist/img/users/client/img/buttons/facebook.png'
      },
      {
        name: 'twitter',
        image: '/dist/img/users/client/img/buttons/twitter.png'
      },
      {
        name: 'google',
        image: '/dist/img/users/client/img/buttons/google.png'
      },
      {
        name: 'github',
        image: '/dist/img/users/client/img/buttons/github.png'
      },
      {
        name: 'linkedin',
        image: '/dist/img/users/client/img/buttons/linkedin.png'
      },
      {
        name: 'paypal',
        image: '/dist/img/users/client/img/buttons/paypal.png'
      }
    ];

    vm.remove = remove;
    vm.user = Authentication.user;


    function remove(provider) {
      vm.success = vm.error = undefined;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector', '$log'];

  function authInterceptor($q, $injector, $log) {
    $log.info('Users::authInterceptor::Init');
    return {
      responseError: function(rejection) {
        switch (rejection.status) {
          case 401:
            $injector.get('$state').transitionTo('root.home');
            $log.debug('Users::authInterceptor::401', rejection);
            break;
          case 403:
            $injector.get('$state').transitionTo('root.forbidden');
            $log.debug('Users::authInterceptor::403', rejection);
            break;
        }
        return $q.reject(rejection);
      }
    };
  }
})();
