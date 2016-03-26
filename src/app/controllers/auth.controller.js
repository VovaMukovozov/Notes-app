(function () {
  'use strict';

  function AuthCtrl($scope) {




    $scope.data = {};

    $scope.is = {};

    $scope.actions = {};

    // Init
    (function () {
      $scope.$emit('is_admin', true);
    })();
  }

  app().controller('AuthCtrl', ['$scope', AuthCtrl]);
})();
