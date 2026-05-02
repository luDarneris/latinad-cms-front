import angular from "angular";
import signOutIcon from "../../assets/icons/sign-out.svg";

function DashboardController($scope, $state, AuthService, ApiService) {
  $scope.signOutIcon = signOutIcon;
  $scope.contents = [];
  $scope.categoriesById = {};
  $scope.foldersById = {};
  $scope.isLoading = true;
  $scope.errorMessage = "";

  function buildLookup(items) {
    var lookup = {};

    (items || []).forEach(function (item) {
      lookup[item.id] = item.name;
    });

    return lookup;
  }

  $scope.getCategoryName = function (categoryId) {
    return $scope.categoriesById[categoryId] || "Sin categoria";
  };

  $scope.getFolderName = function (folderId) {
    return $scope.foldersById[folderId] || "Sin carpeta";
  };

  function loadDashboardData() {
    $scope.isLoading = true;
    $scope.errorMessage = "";

    ApiService.getMockData()
      .then(function (data) {
        $scope.contents = data.contents || [];
        $scope.categoriesById = buildLookup(data.categories);
        $scope.foldersById = buildLookup(data.folders);
      })
      .catch(function () {
        $scope.errorMessage = "No pudimos cargar los contenidos. Revisa que la API mock este corriendo.";
      })
      .finally(function () {
        $scope.isLoading = false;
      });
  }

  $scope.logout = function () {
    AuthService.logout();
    $state.go("login");
  };

  loadDashboardData();
}

DashboardController.$inject = ["$scope", "$state", "AuthService", "ApiService"];

angular.module("latinadCmsApp").controller("DashboardController", DashboardController);
