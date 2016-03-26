(function () {
  'use strict';

  function AuthSrv($rootScope, $http, $state, localStorageService, $q) {
    var Auth = {},
      profile = {},
      onProfileReceivedCallback = [],
      onTokenExpiresCallbacks = [];

    Auth.isAuthenticated = function () {
      return (localStorageService.get('token')) ? true : false ;
    };

    Auth.login = function (data, toastr) {
      var request = $http.post(get.api('/login'), data);
      request.success(function (response) {
          if (response.keys.admin === true) {
            localStorageService.set('token', response.token);
            $state.go('main.auth.dashboard');

          } else {
            toastr.error('Access error,Permission denied', 'Error')
          }
        })
        .error(function (response) {
          toastr.error(response.message, 'Error')
        });
    };


    Auth.logout = function () {
      localStorageService.remove('token');
      $state.go('main.login');
    };

    Auth.getToken = function () {
      return (localStorageService.get('token')) ? localStorageService.get('token') : '';
    };

    Auth.isMe = function (user_id) {
      return (profile.user_id && profile.user_id == user_id);
    };

    Auth.getProfile = function (callback, onTokenExpiresCallback) {
      callback = (_.isFunction(callback)) ? callback : _.noop;

      if (_.isFunction(onTokenExpiresCallback)) {
        onTokenExpiresCallbacks.push(onTokenExpiresCallback);
      }

      if (profile.user_id) {
        return callback(profile);
      } else {
        onProfileReceivedCallback.push(callback);
      }
    };


    return Auth;
  }

  app().factory('Auth', ['$rootScope', '$http', '$state', 'localStorageService', '$q', AuthSrv]);
})();
