import angular from "angular";
import signOutIcon from "../../assets/icons/sign-out.svg";

function DashboardController($scope, $state, AuthService) {
  $scope.signOutIcon = signOutIcon;

  $scope.logout = function () {
    AuthService.logout();
    $state.go("login");
  };
}

DashboardController.$inject = ["$scope", "$state", "AuthService"];

angular.module("latinadCmsApp").controller("DashboardController", DashboardController);
