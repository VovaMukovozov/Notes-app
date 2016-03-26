(function () {
  'use strict';

  function ApiSrv($http, $q, Auth, toastr) {
    var API = {};

    function addTokenToRequestObj(requestObj) {
        requestObj.headers = (_.isPlainObject(requestObj.params)) ? _.extend(requestObj.params, {token: Auth.getToken()}) : {token: Auth.getToken()};
      return requestObj;
    }

    function request(config, q) {
      q = q || $q.defer();

      if (Auth.isAuthenticated()) {
        config = addTokenToRequestObj(config);
        $http(config).then(function (res) {
          if (res.status == 200) {
            q.resolve(res.data);
          } else if (res.status == 401) {
            toastr.error(res.data.message, 'Error');
            Auth.logout();
          } else {
            toastr.error(res.data.message, 'Error');
            q.reject(res.data);
          }
        }).catch(
          function(res){
            if (res.status == 403 || res.status == 401) {
              toastr.error(res.data.message, 'Error');
              Auth.logout();
            } else {
              q.reject(res);
            }
          }
        );

      } else {
        toastr.error('Access error,Permission denied', 'Error')
        Auth.logout();
      }

      return q.promise;
    }

    API.url = function (url) {
      return get.api(url);
    };

    API.get = function (url, params, config) {
      return request(_.extend({
        method: 'GET',
        url: API.url(url),
        params: params
      }, config));
    };

    API.post = function (url, data, config) {
      return request(_.extend({
        method: 'POST',
        url: API.url(url),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data
      }, config));
    };

    API.put = function (url, data, config) {
      return request(_.extend({
        method: 'PUT',
        url: API.url(url),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data
      }, config));
    };

    API.delete = function (url, data, config) {
      return request(_.extend({
        method: 'DELETE',
        url: API.url(url),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: data
      }, config));
    };

    return API;
  }

  app().factory('API', ['$http', '$q', 'Auth', 'toastr', ApiSrv]);
})();
