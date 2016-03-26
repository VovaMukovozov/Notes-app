(function () {
  'use strict';

  window.CONFIG = {
    NAME: 'notesApp',
    ENV: '',
    VERSION: '@@version',

    DEBUG: false,

    MODULES: [
      'ngCookies',
      'ui.router',
      'ngAnimate',
      'ui.bootstrap',
      'LocalStorageModule',
      'blockUI',
      'toastr',
      'ngSanitize',
      'ngCsv'
    ],

    API_URL: {
      DEV: '',
      STG: '',
      PRD: ''
    },

    APP_URL: {
      DEV: 'http://localhost:3000',
      STG: '',
      PRD: ''
    },

    VIEW_PATH: 'app/views/',

  };

  function setEnvironment() {
    var isSet = false,
      host = window.location.origin;

    for (var key in CONFIG.APP_URL) {
      if (!isSet && host === CONFIG.APP_URL[key]) {
        isSet = true;
        CONFIG.ENV = key;
      }
    }

    if (CONFIG.ENV !== 'PRD') {
      CONFIG.DEBUG = true;
      console.debug('ENV -> ', CONFIG.ENV);
    }
  }

  // Initialization
  (function () {
    setEnvironment();
  })();

})();
