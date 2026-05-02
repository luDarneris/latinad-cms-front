import angular from "angular";
import logoCms from "../../assets/logo-cms.svg";

function LoginController($scope) {
  $scope.logoCms = logoCms;
  $scope.credentials = {
    username: "",
    password: ""
  };
}

LoginController.$inject = ["$scope"];

angular.module("latinadCmsApp").controller("LoginController", LoginController);
