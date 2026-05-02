import angular from "angular";

function AuthInterceptor($injector, API_BASE_URL) {
  function isProtectedApiUrl(url) {
    return url.indexOf(API_BASE_URL + "/api/") === 0 || url.indexOf("/api/") === 0;
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
    }
  };
}

AuthInterceptor.$inject = ["$injector", "API_BASE_URL"];

function RegisterAuthInterceptor($httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
}

RegisterAuthInterceptor.$inject = ["$httpProvider"];

angular
  .module("latinadCmsApp")
  .factory("AuthInterceptor", AuthInterceptor)
  .config(RegisterAuthInterceptor);
