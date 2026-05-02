import angular from "angular";

function ApiService($http, API_BASE_URL) {
  this.getMockData = function () {
    return $http.get(API_BASE_URL + "/api/mock-data").then(function (response) {
      return response.data;
    });
  };

  this.getContents = function (filters) {
    return $http.get(API_BASE_URL + "/api/contents", {
      params: filters || {}
    }).then(function (response) {
      return response.data;
    });
  };
}

ApiService.$inject = ["$http", "API_BASE_URL"];

angular
  .module("latinadCmsApp")
  .constant("API_BASE_URL", "http://localhost:3001")
  .service("ApiService", ApiService);
