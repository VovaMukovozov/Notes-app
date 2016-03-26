(function () {
  'use strict';

  function DashboardCtrl($scope, API, toastr, $state) {

    $scope.data = {};

    $scope.is = {};

    $scope.actions = {};

    function get(){
      API.get('/summary').then(
        function(response) {
          _.forEach(response.errors, function(value, key){
            value.date = moment(value.date).format("DD-MMMM-YYYY HH:mm");
          })

          $scope.data = response;
          if(_.isEmpty($scope.data.errors)){
            $scope.data.errors = null;
          }
        }).catch(
        function(response){
          if(response.data.message){
            toastr.error(response.data.message, 'Error');
          } else {
            toastr.error("Something Wrong", 'Error');
          }
        }
      )
    }

    // Init
    (function () {
      get();
    })();
  }

  app().controller('DashboardCtrl', ['$scope', 'API', 'toastr', '$state', DashboardCtrl]);
})();
