( function () {
  'use strict';

  function MainCtrl($scope, $location, Auth, $state) {

    var UI = {
        loading: {
          init: function () {
            if (notRetained('init')) {
              UI.apply( function () {
                $scope.is.init = true;
                angular.element('body').removeClass('init');
              });
            } else {
              _.delay(UI.loading.init, 150);
            }
          },
          start: function () {
            retain('init');
            retain('loading');
            $scope.is.loading = true;
          },
          stop: function () {
            if (notRetained('loading')) {
              UI.apply( function () {
                $scope.is.loading = false;
              });
            } else {
              _.delay(UI.loading.stop, 150);
            }
          }
        },
        apply: function (func) {
          if (!$scope.$$phase && _.isFunction(func)) {
            $scope.$apply(func);
          } else if (!$scope.$$phase) {
            $scope.$apply();
          }
        }
      };

    $scope.menu = [];

    $scope.is = {
    };

    $scope.get = {
    };

    $scope.$state = $state;
    $scope.actions = {
      logout: function(){
        Auth.logout();
      }
    };


    // Listener
    $scope.$on('is_admin', function (event, data) {
      $scope.is_admin = data;
    });


    ( function () {
      retain('init');
      Auth.getProfile( function (profile) {
        $scope.profile = profile;
        release('init');
        UI.loading.init();
      });

    })();
  }

  app().controller('MainCtrl', ['$scope', '$location', 'Auth', '$state', MainCtrl]);

})();
