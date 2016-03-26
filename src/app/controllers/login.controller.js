(function () {
  'use strict';

  function LoginCtrl($scope , Auth, toastr) {





    $scope.data = {
      email: '',
      password: '',
      rememberMe: ''
    };

    $scope.is = {};

    $scope.actions = {
      login : function(){
        Auth.login($scope.data, toastr);
      }
    };



    // Init
    (function () {

    })();
  }

  app().controller('LoginCtrl', ['$scope', 'Auth', 'toastr', LoginCtrl]);
})();
