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
  $scope.categories = [];
  $scope.categoriesById = {};
  $scope.folders = [];
  $scope.foldersById = {};
  $scope.isLoading = true;
  $scope.isFiltering = false;
  $scope.isCreateContentModalOpen = false;
  $scope.isSelectionMode = false;
  $scope.selectedContentIds = {};
  $scope.errorMessage = "";
  $scope.createContentForm = {
    name: "",
    type: "",
    url: "",
    category_id: "",
    folder_id: "",
    has_audio: false
  };
  $scope.createContentTypeOptions = [
    {
      label: "Imagen",
      value: "image"
    },
    {
      label: "Video",
      value: "video"
    }
  ];
  $scope.contentFilters = {
    search: "",
    type: "",
    categoryId: "",
    folderId: ""
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
    exitSelectionMode();
    $scope.contentFilters.type = filterValue;
    loadContents();
  };

  $scope.applyFilters = function (filterKey, value) {
    exitSelectionMode();

    if (filterKey) {
      $scope.contentFilters[filterKey] = value || "";
    }

    loadContents();
  };

  $scope.toggleSelectionMode = function () {
    $scope.isSelectionMode = !$scope.isSelectionMode;

    if (!$scope.isSelectionMode) {
      $scope.clearSelection();
    }
  };

  $scope.clearErrorMessage = function () {
    $scope.errorMessage = "";
  };

  $scope.openCreateContentModal = function () {
    $scope.isCreateContentModalOpen = true;
  };

  $scope.closeCreateContentModal = function () {
    $scope.isCreateContentModalOpen = false;
  };

  $scope.handleCreateContentTypeChange = function () {
    if ($scope.createContentForm.type !== "video") {
      $scope.createContentForm.has_audio = false;
    }
  };

  $scope.setCreateContentType = function (type) {
    $scope.createContentForm.type = type;
    $scope.handleCreateContentTypeChange();
  };

  $scope.setCreateContentHasAudio = function (checked) {
    $scope.createContentForm.has_audio = Boolean(checked);
  };

  $scope.setContentSelected = function (content, selected) {
    if (!content) {
      return;
    }

    if (selected) {
      $scope.selectedContentIds[content.id] = true;
      return;
    }

    delete $scope.selectedContentIds[content.id];
  };

  $scope.isContentSelected = function (contentId) {
    return Boolean($scope.selectedContentIds[contentId]);
  };

  $scope.clearSelection = function () {
    $scope.selectedContentIds = {};
  };

  $scope.selectAllVisibleContents = function () {
    ($scope.contents || []).forEach(function (content) {
      $scope.selectedContentIds[content.id] = true;
    });
  };

  $scope.areAllVisibleContentsSelected = function () {
    return Boolean(($scope.contents || []).length) && $scope.contents.every(function (content) {
      return $scope.isContentSelected(content.id);
    });
  };

  $scope.toggleAllVisibleContents = function () {
    if ($scope.areAllVisibleContentsSelected()) {
      $scope.clearSelection();
      return;
    }

    $scope.selectAllVisibleContents();
  };

  $scope.getSelectedContentCount = function () {
    return Object.keys($scope.selectedContentIds).length;
  };

  function exitSelectionMode() {
    $scope.isSelectionMode = false;
    $scope.clearSelection();
  }

  function buildContentParams() {
    var params = {};
    var search = String($scope.contentFilters.search || "").trim();

    if (search) {
      params.search = search;
    }

    if ($scope.contentFilters.type) {
      params.type = $scope.contentFilters.type;
    }

    if ($scope.contentFilters.categoryId) {
      params.category_id = $scope.contentFilters.categoryId;
    }

    if ($scope.contentFilters.folderId) {
      params.folder_id = $scope.contentFilters.folderId;
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
      .catch(function (error) {
        if (requestId !== lastContentRequestId) {
          return;
        }

        if (error.status === 401) {
          return;
        }

        $scope.contents = [];
        $scope.errorMessage = "Error en conexion";
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
        $scope.categories = data.categories || [];
        $scope.folders = data.folders || [];
        $scope.categoriesById = buildLookup(data.categories);
        $scope.foldersById = buildLookup(data.folders);
        return loadContents();
      })
      .catch(function (error) {
        if (error.status === 401) {
          return;
        }

        $scope.errorMessage = "Error en conexion";
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
