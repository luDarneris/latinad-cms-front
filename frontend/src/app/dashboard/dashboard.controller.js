import angular from "angular";
import addIcon from "../../assets/icons/add.svg";
import archiveIcon from "../../assets/icons/archive.svg";
import logoCms from "../../assets/logo-cms.svg";
import searchIcon from "../../assets/icons/search.svg";
import signOutIcon from "../../assets/icons/sign-out.svg";

function DashboardController($scope, $state, AuthService, ApiService) {
  var lastContentRequestId = 0;

  $scope.addIcon = addIcon;
  $scope.archiveIcon = archiveIcon;
  $scope.logoCms = logoCms;
  $scope.searchIcon = searchIcon;
  $scope.signOutIcon = signOutIcon;
  $scope.user = AuthService.getUser() || {
    username: "admin",
    name: "LatinAd Recruiter"
  };
  $scope.contents = [];
  $scope.categoriesById = {};
  $scope.foldersById = {};
  $scope.isLoading = true;
  $scope.isFiltering = false;
  $scope.isSelectionMode = false;
  $scope.errorMessage = "";
  $scope.contentFilters = {
    search: "",
    type: ""
  };
  $scope.typeFilters = [
    {
      label: "Todo",
      value: ""
    },
    {
      label: "Imagenes",
      value: "image"
    },
    {
      label: "Videos",
      value: "video"
    },
    {
      label: "Archivados",
      value: "archived"
    }
  ];

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

  $scope.isTypeFilterActive = function (filterValue) {
    return $scope.contentFilters.type === filterValue;
  };

  $scope.setTypeFilter = function (filterValue) {
    $scope.contentFilters.type = filterValue;
    loadContents();
  };

  $scope.applyFilters = function () {
    loadContents();
  };

  $scope.toggleSelectionMode = function () {
    $scope.isSelectionMode = !$scope.isSelectionMode;
  };

  function buildContentParams() {
    var params = {};
    var search = String($scope.contentFilters.search || "").trim();

    if (search) {
      params.search = search;
    }

    if ($scope.contentFilters.type) {
      params.type = $scope.contentFilters.type;
    }

    return params;
  }

  function loadContents() {
    var requestId = lastContentRequestId + 1;

    lastContentRequestId = requestId;
    $scope.isFiltering = !$scope.isLoading;
    $scope.errorMessage = "";

    return ApiService.getContents(buildContentParams())
      .then(function (data) {
        if (requestId !== lastContentRequestId) {
          return;
        }

        $scope.contents = data.items || [];
      })
      .catch(function () {
        if (requestId !== lastContentRequestId) {
          return;
        }

        $scope.contents = [];
        $scope.errorMessage = "No pudimos cargar los contenidos. Revisa que la API mock este corriendo.";
      })
      .finally(function () {
        if (requestId !== lastContentRequestId) {
          return;
        }

        $scope.isFiltering = false;
      });
  }

  function loadDashboardData() {
    $scope.isLoading = true;
    $scope.errorMessage = "";

    ApiService.getMockData()
      .then(function (data) {
        $scope.categoriesById = buildLookup(data.categories);
        $scope.foldersById = buildLookup(data.folders);
        return loadContents();
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
