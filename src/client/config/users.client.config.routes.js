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
