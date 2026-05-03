import angular from "angular";

function AuthInterceptor($injector, API_BASE_URL, $q) {
  var isHandlingUnauthorized = false;

  function isProtectedApiUrl(url) {
    return url.indexOf(API_BASE_URL + "/api/") === 0 || url.indexOf("/api/") === 0;
  }

  function handleUnauthorizedResponse(response) {
    var AuthService = $injector.get("AuthService");
    var $state = $injector.get("$state");

    AuthService.logout();

    if (!isHandlingUnauthorized && $state.current.name !== "login") {
      isHandlingUnauthorized = true;

      $state.go("login", { reason: "expired" }).finally(function () {
        isHandlingUnauthorized = false;
      });
    }
  }

  return {
    request: function (config) {
      var AuthService = $injector.get("AuthService");
      var token = AuthService.getToken();

      if (token && isProtectedApiUrl(config.url)) {
        config.headers = config.headers || {};
        config.headers.Authorization = "Bearer " + token;
      }

      return config;
    },

    responseError: function (response) {
      if (
        response.status === 401 &&
        response.config &&
        isProtectedApiUrl(response.config.url)
      ) {
        handleUnauthorizedResponse(response);
      }

      return $q.reject(response);
    }
  };
}

AuthInterceptor.$inject = ["$injector", "API_BASE_URL", "$q"];

function RegisterAuthInterceptor($httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
}

RegisterAuthInterceptor.$inject = ["$httpProvider"];

angular
  .module("latinadCmsApp")
  .factory("AuthInterceptor", AuthInterceptor)
  .config(RegisterAuthInterceptor);
