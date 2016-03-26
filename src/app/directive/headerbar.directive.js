app().directive('headerBar', function() {

    return {
      restrict: 'E',
      templateUrl: get.view('headerbar'),
      scope : {
        is_admin: '=?',
      },
      link: function(scope) {
        scope.is_admin = scope.$parent.is_admin;
        scope.logout = scope.$parent.actions.logout;
        scope.$state = scope.$parent.$state;
      },
    }
  });
