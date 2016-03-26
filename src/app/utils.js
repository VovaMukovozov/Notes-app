(function () {
  'use strict';

  function removeTrailingSlash(url) {
    return (_.startsWith(url, '/')) ? url.substring(1) : url;
  }

  // Get Utils
  window.get = {
    api: function (url, params) {
      //url = removeTrailingSlash(url);
      if (params) {
        url = url + '?' + $.param(params);
      }

      return CONFIG.API_URL[CONFIG.ENV] + url;
    },
    app: function (url, params) {
      url = removeTrailingSlash(url);

      if (params) {
        url = url + '?' + $.param(params);
      }

      return CONFIG.APP_URL[CONFIG.ENV] + '/' + url;
    },
    view: function (name) {
      return CONFIG.VIEW_PATH + name + '.html';
    },
    partial: function (name) {
      return CONFIG.VIEW_PATH + 'partials/' + name + '.html';
    },
    modal: function (name) {
      return (name) ? CONFIG.VIEW_PATH + 'modal/' + name + '.html' : CONFIG.VIEW_PATH + 'modal/window.html';
    }
  };

  // Set Utils
  window.set = {
    env: function () {
      if (window.location.href.indexOf('') > -1) {
        CONFIG.ENV = 'PRD'
      } else if (window.location.href.indexOf('') > -1) {
        CONFIG.ENV = 'STG'
      } else if (window.location.href.indexOf('http://localhost') > -1) {
        CONFIG.ENV = 'DEV'
      }
    }
  };

  // Retain utils
  var retain_date = {};

  window.retain = function (key, delay) {
    retain_date[key] = (retain_date[key]) ? retain_date[key] + 1 : 1;

    // Auto release
    if (delay) {
      _.delay(function () {
        release(key);
      }, delay);
    }
  };

  window.release = function (key, delay) {
    _.delay(function () {
      retain_date[key] = (retain_date[key]) ? retain_date[key] - 1 : 0;
    }, delay);
  };

  window.notRetained = function (key) {
    return (!retain_date[key] || retain_date[key] <= 0) ? true : false;
  };

})();
