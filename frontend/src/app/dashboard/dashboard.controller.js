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
  $scope.isArchiveConfirmationOpen = false;
  $scope.isCreatingContent = false;
  $scope.isArchivingContents = false;
  $scope.isSelectionMode = false;
  $scope.selectedContentIds = {};
  $scope.errorMessage = "";
  $scope.successMessage = "";
  $scope.createContentErrors = {};
  $scope.createContentWasSubmitted = false;
  $scope.createContentForm = getEmptyCreateContentForm();
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
      label: "Todos",
      value: ""
    },
    {
      label: "Imágenes",
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
    return $scope.categoriesById[categoryId] || "Sin categoría";
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

  $scope.clearSuccessMessage = function () {
    $scope.successMessage = "";
  };

  $scope.getDashboardToastMessage = function () {
    return $scope.errorMessage || $scope.successMessage;
  };

  $scope.getDashboardToastType = function () {
    return $scope.errorMessage ? "error" : "success";
  };

  $scope.clearDashboardToastMessage = function () {
    if ($scope.errorMessage) {
      $scope.clearErrorMessage();
      return;
    }

    $scope.clearSuccessMessage();
  };

  $scope.openCreateContentModal = function () {
    $scope.createContentWasSubmitted = false;
    $scope.createContentErrors = {};
    $scope.isCreateContentModalOpen = true;
  };

  $scope.closeCreateContentModal = function () {
    if ($scope.isCreatingContent) {
      return;
    }

    $scope.isCreateContentModalOpen = false;
    resetCreateContentForm();
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

  $scope.saveCreateContent = function () {
    var validation = validateCreateContentForm($scope.createContentForm);

    $scope.createContentWasSubmitted = true;
    $scope.createContentErrors = validation.errors;

    if ($scope.isCreatingContent || !validation.isValid) {
      return;
    }

    $scope.isCreatingContent = true;
    $scope.errorMessage = "";
    $scope.successMessage = "";

    return ApiService.createContent(validation.payload)
      .then(function () {
        resetCreateContentForm();
        $scope.isCreateContentModalOpen = false;
        $scope.successMessage = "Contenido creado con éxito";
        return loadContents({
          errorMessage: "Contenido creado, pero no pudimos actualizar la lista."
        });
      })
      .catch(function (error) {
        if (error.status === 401) {
          return;
        }

        $scope.errorMessage = "No pudimos crear el contenido. Revisá los datos e intentá nuevamente.";
      })
      .finally(function () {
        $scope.isCreatingContent = false;
      });
  };

  $scope.setContentSelected = function (content, selected) {
    if (!content || content.archived) {
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
    getSelectableVisibleContents().forEach(function (content) {
      $scope.selectedContentIds[content.id] = true;
    });
  };

  $scope.areAllVisibleContentsSelected = function () {
    var selectableContents = getSelectableVisibleContents();

    return Boolean(selectableContents.length) && selectableContents.every(function (content) {
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

  $scope.getSelectableVisibleContentCount = function () {
    return getSelectableVisibleContents().length;
  };

  $scope.openArchiveConfirmation = function () {
    if ($scope.isArchivingContents || !getSelectedContentIds().length) {
      return;
    }

    $scope.errorMessage = "";
    $scope.successMessage = "";
    $scope.isArchiveConfirmationOpen = true;
  };

  $scope.closeArchiveConfirmation = function () {
    if ($scope.isArchivingContents) {
      return;
    }

    $scope.isArchiveConfirmationOpen = false;
  };

  $scope.getArchiveConfirmationMessage = function () {
    var selectedCount = $scope.getSelectedContentCount();

    if (selectedCount === 1) {
      return "¿Confirmás que querés archivar 1 contenido seleccionado?";
    }

    return "¿Confirmás que querés archivar " + selectedCount + " contenidos seleccionados?";
  };

  $scope.archiveSelectedContents = function () {
    var selectedIds = getSelectedContentIds();

    if ($scope.isArchivingContents || !selectedIds.length) {
      return;
    }

    $scope.isArchivingContents = true;
    $scope.errorMessage = "";
    $scope.successMessage = "";

    return ApiService.archiveContents(selectedIds)
      .then(function (result) {
        var archivedCount = result && result.archived_count ? result.archived_count : 0;

        $scope.isArchiveConfirmationOpen = false;
        exitSelectionMode();

        if (archivedCount > 0) {
          $scope.successMessage = archivedCount === 1
            ? "Se archivó 1 contenido."
            : "Se archivaron " + archivedCount + " contenidos.";
        } else {
          $scope.successMessage = "Los contenidos seleccionados ya estaban archivados.";
        }

        return loadContents({
          errorMessage: "Los contenidos se archivaron, pero no pudimos actualizar la lista."
        });
      })
      .catch(function (error) {
        if (error.status === 401) {
          return;
        }

        $scope.isArchiveConfirmationOpen = false;
        $scope.errorMessage = "No pudimos archivar los contenidos. Intentá nuevamente.";
      })
      .finally(function () {
        $scope.isArchivingContents = false;
      });
  };

  function getSelectedContentIds() {
    return Object.keys($scope.selectedContentIds)
      .map(function (id) {
        return Number(id);
      })
      .filter(function (id) {
        return Number.isFinite(id);
      });
  }

  function getSelectableVisibleContents() {
    return ($scope.contents || []).filter(function (content) {
      return content && !content.archived;
    });
  }

  function exitSelectionMode() {
    $scope.isSelectionMode = false;
    $scope.clearSelection();
  }

  function getEmptyCreateContentForm() {
    return {
      name: "",
      type: "",
      url: "",
      category_id: "",
      folder_id: "",
      has_audio: false
    };
  }

  function resetCreateContentForm() {
    $scope.createContentForm = getEmptyCreateContentForm();
    $scope.createContentErrors = {};
    $scope.createContentWasSubmitted = false;
  }

  function normalizeOptionalId(value) {
    var normalized;

    if (value === "" || value === null || typeof value === "undefined") {
      return null;
    }

    normalized = Number(value);

    if (!Number.isFinite(normalized)) {
      return null;
    }

    return normalized;
  }

  function validateOptionalId(value, fieldName, errors) {
    if (value === "" || value === null || typeof value === "undefined") {
      return;
    }

    if (!Number.isFinite(Number(value))) {
      errors[fieldName] = "Seleccioná una opción válida.";
    }
  }

  function isValidHttpUrl(value) {
    var parsedUrl;

    try {
      parsedUrl = new URL(value);
    } catch (error) {
      return false;
    }

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  }

  function validateCreateContentForm(form) {
    var errors = {};
    var name = String(form.name || "").trim();
    var type = String(form.type || "").trim();
    var url = String(form.url || "").trim();
    var payload;

    if (!name) {
      errors.name = "El nombre es obligatorio.";
    }

    if (type !== "image" && type !== "video") {
      errors.type = "El tipo de archivo es obligatorio.";
    }

    if (!url) {
      errors.url = "La URL del archivo es obligatoria.";
    } else if (!isValidHttpUrl(url)) {
      errors.url = "Ingresá una URL válida.";
    }

    validateOptionalId(form.category_id, "category_id", errors);
    validateOptionalId(form.folder_id, "folder_id", errors);

    payload = {
      name: name,
      type: type,
      url: url,
      category_id: normalizeOptionalId(form.category_id),
      folder_id: normalizeOptionalId(form.folder_id)
    };

    if (type === "video") {
      payload.has_audio = Boolean(form.has_audio);
    }

    return {
      errors: errors,
      isValid: !Object.keys(errors).length,
      payload: payload
    };
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

  function loadContents(options) {
    var requestId = lastContentRequestId + 1;
    var loadOptions = options || {};

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
        $scope.errorMessage = loadOptions.errorMessage || "Error de conexión";
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

        $scope.errorMessage = "Error de conexión";
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
