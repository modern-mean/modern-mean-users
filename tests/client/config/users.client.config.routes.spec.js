(function() {
  'use strict';

  var $state,
    state;

  describe('user.client.routes.js', function () {

    beforeEach(module('users'));

    beforeEach(inject(function(_$state_) {
      $state = _$state_;
    }));


    describe('root.user', function () {

      beforeEach(function() {
        state = $state.get('root.user');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /user', function () {
        expect(state.url).to.equal('/user');
      });

      it('should have property abstract that is true', function () {
        expect(state.abstract).to.equal(true);
      });

      it('should have property data that is an array with roles user and admin', function () {
        expect(state.data.roles).to.be.an('array');
        expect(state.data.roles).to.contain('user');
        expect(state.data.roles).to.contain('admin');
      });

    });

    describe('root.user.settings', function () {

      beforeEach(function() {
        state = $state.get('root.user.settings');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /settings', function () {
        expect(state.url).to.equal('/settings');
      });

      it('should have property views that is an object', function () {
        expect(state.views).to.be.an('object');
      });

      describe('views', function () {

        it('should have property email', function () {
          expect(state.views).to.include.keys('email');
          expect(state.views['email'].templateUrl).to.equal('modern-mean-users-material/views/cards/users.client.views.cards.emails.html');
          expect(state.views['email'].controller).to.equal('UsersEmailController');
          expect(state.views['email'].controllerAs).to.equal('vm');
        });

        it('should have property profile', function () {
          expect(state.views).to.include.keys('profile');
          expect(state.views['profile'].templateUrl).to.equal('modern-mean-users-material/views/cards/users.client.views.cards.profile.html');
          expect(state.views['profile'].controller).to.equal('UsersProfileController');
          expect(state.views['profile'].controllerAs).to.equal('vm');
        });

        it('should have property password', function () {
          expect(state.views).to.include.keys('password');
          expect(state.views['password'].templateUrl).to.equal('modern-mean-users-material/views/cards/users.client.views.cards.password.html');
          expect(state.views['password'].controller).to.equal('UsersPasswordController');
          expect(state.views['password'].controllerAs).to.equal('vm');
        });

        it('should have property picture', function () {
          expect(state.views).to.include.keys('picture');
          expect(state.views['picture'].templateUrl).to.equal('modern-mean-users-material/views/cards/users.client.views.cards.picture.html');
          expect(state.views['picture'].controller).to.equal('UsersPictureController');
          expect(state.views['picture'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.authentication', function () {

      beforeEach(function() {
        state = $state.get('root.user.authentication');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /authentication', function () {
        expect(state.url).to.equal('/authentication');
      });

      it('should have property abstract', function () {
        expect(state.abstract).to.equal(true);
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modern-mean-users-material/views/authentication/users.client.views.authentication.html');
        });

      });

    });


    describe('root.user.authentication.type', function () {

      beforeEach(function() {
        state = $state.get('root.user.authentication.type');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /:type', function () {
        expect(state.url).to.equal('/:type');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Account Login');
      });

      it('should have property data.ignoreAuth', function () {
        expect(state.data.ignoreAuth).to.equal(true);
      });

      it('should have property views that is an object', function () {
        expect(state.views).to.be.an('object');
      });

      it('should have property views should contain auth view', function () {
        expect(state.views).to.include.keys('signin');
      });

      describe('signin view', function () {

        it('should have property templateUrl', function () {
          expect(state.views['signin'].templateUrl).to.equal('modern-mean-users-material/views/authentication/users.client.views.authentication.signin.html');
        });

        it('should have property controller', function () {
          expect(state.views['signin'].controller).to.equal('SigninAuthenticationController');
        });

        it('should have property controller', function () {
          expect(state.views['signin'].controllerAs).to.equal('vm');
        });

      });

      it('should have property views should contain social view', function () {
        expect(state.views).to.include.keys('signup');
      });

      describe('social view', function () {

        it('should have property templateUrl', function () {
          expect(state.views['signup'].templateUrl).to.equal('modern-mean-users-material/views/authentication/users.client.views.authentication.signup.html');
        });

        it('should have property controller', function () {
          expect(state.views['signup'].controller).to.equal('SignupAuthenticationController');
        });

        it('should have property controller', function () {
          expect(state.views['signup'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.password', function () {

      beforeEach(function() {
        state = $state.get('root.user.password');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /password', function () {
        expect(state.url).to.equal('/password');
      });

      it('should have property data that is an object', function () {
        expect(state.abstract).to.equal(true);
      });

    });

    describe('root.user.password.forgot', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.forgot');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /forgot', function () {
        expect(state.url).to.equal('/forgot');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Forgot Password');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modern-mean-users-material/views/password/users.client.views.forgot-password.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('PasswordController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });

    describe('root.user.password.reset', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.reset');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /password', function () {
        expect(state.url).to.equal('/reset');
      });

      it('should have property data that is an object', function () {
        expect(state.abstract).to.equal(true);
      });

    });

    describe('root.user.password.reset.success', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.reset.success');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /success', function () {
        expect(state.url).to.equal('/success');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modern-mean-users-material/views/password/users.client.views.reset-password-success.html');
        });

      });

    });

    describe('root.user.password.reset.form', function () {

      beforeEach(function() {
        state = $state.get('root.user.password.reset.form');
      });

      it('should be an object', function () {
        expect(state).to.be.an('object');
      });

      it('should have property url that is /success', function () {
        expect(state.url).to.equal('/:token');
      });

      it('should have property data that is an object', function () {
        expect(state.data).to.be.a('object');
      });

      it('should have property data.pageTitle', function () {
        expect(state.data.pageTitle).to.equal('Password Reset Form');
      });

      it('should have property views that is an object with main@ property', function () {
        expect(state.views).to.be.an('object');
        expect(state.views['main@']).to.be.an('object');
      });

      describe('main@', function () {

        it('should have property templateUrl', function () {
          expect(state.views['main@'].templateUrl).to.equal('modern-mean-users-material/views/password/users.client.views.reset-password.html');
        });

        it('should have property controller', function () {
          expect(state.views['main@'].controller).to.equal('PasswordController');
        });

        it('should have property controllerAs', function () {
          expect(state.views['main@'].controllerAs).to.equal('vm');
        });

      });

    });



  });
})();
