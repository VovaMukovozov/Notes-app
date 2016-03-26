(function () {
  'use strict';

  window.app = function () {
    try {
      return angular.module(CONFIG.NAME);
    } catch (e) {
      return angular.module(CONFIG.NAME, CONFIG.MODULES);
    }
  };

  app().config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', '$provide',  'blockUIConfig', 'toastrConfig', function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, $provide, blockUIConfig, toastrConfig) {



    // BlockUI config
    blockUIConfig.delay = 50;
    blockUIConfig.autoBlock = true;

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
    titleClass: 'toast-title';
    toastClass: 'toast';

    // reload true (for rerunning resolve)
    $provide.decorator('$state', [ '$delegate',function($delegate) {
      var originalTransitionTo = $delegate.transitionTo;
      $delegate.transitionTo = function(to, toParams, options) {
        return originalTransitionTo(to, toParams, angular.extend({
          reload: true
        }, options));
      };
      return $delegate;
    }]);


    // Local Storage Prefix
    localStorageServiceProvider
      .setPrefix('notes');

    // Router

    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        abstract: true,
        controller: 'MainCtrl',
        templateUrl: get.view('main')
      })
      .state('main.auth', {
        abstract: true,
        template: '<ui-view></ui-view>',
        controller:'AuthCtrl',
        resolve: {
          auth: ['$q', 'Auth',  function ($q, Auth) {
            var deferred = $q.defer();
            (Auth.isAuthenticated()) ? deferred.resolve(true) : deferred.reject('not_logged_in');
            return deferred.promise;
          }]
        }

      })
      .state('main.login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: get.view('login')
      })
      .state('main.auth.dashboard', {
        url: '/',
        controller: 'DashboardCtrl',
        templateUrl: get.view('dashboard')
      });
  }]);


  app().run(['$rootScope', '$state', 'toastr', '$stateParams', function($rootScope, $state, toastr, $stateParams) {
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        if (error) {
          if(error == 'not_logged_in'){
            toastr.error('Access error,Permission denied', 'Error');
            $state.go("main.login");
          }
        }
      });
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }]);


})();
