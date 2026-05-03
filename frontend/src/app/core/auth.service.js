import angular from "angular";

var TOKEN_KEY = "latinad_cms_token";
var USER_KEY = "latinad_cms_user";

function AuthService($http, $window, API_BASE_URL) {
  function saveSession(authResponse) {
    $window.localStorage.setItem(TOKEN_KEY, authResponse.token);
    $window.localStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
  }

  this.login = function (credentials) {
    return $http.post(API_BASE_URL + "/auth/login", credentials).then(function (response) {
      saveSession(response.data);
      return response.data;
    });
  };

  this.logout = function () {
    $window.localStorage.removeItem(TOKEN_KEY);
    $window.localStorage.removeItem(USER_KEY);
  };

  this.getToken = function () {
    return $window.localStorage.getItem(TOKEN_KEY);
  };

  this.getUser = function () {
    var storedUser = $window.localStorage.getItem(USER_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  };

  this.isAuthenticated = function () {
    return Boolean(this.getToken());
  };
}

AuthService.$inject = ["$http", "$window", "API_BASE_URL"];

angular.module("latinadCmsApp").service("AuthService", AuthService);
