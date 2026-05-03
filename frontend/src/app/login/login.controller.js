import angular from "angular";
import logoCms from "../../assets/logo-cms.svg";

function LoginController($scope, $state, $stateParams, AuthService) {
  $scope.logoCms = logoCms;
  $scope.credentials = {
    username: "",
    password: ""
  };
  $scope.isSubmitting = false;
  $scope.loginError = "";
  $scope.sessionMessage = getSessionMessage($stateParams.reason);

  $scope.clearLoginError = function () {
    $scope.loginError = "";
  };

  $scope.submitLogin = function (form) {
    $scope.loginError = "";

    if (form.$invalid) {
      return;
    }

    $scope.isSubmitting = true;

    AuthService.login($scope.credentials)
      .then(function () {
        $state.go("app");
      })
      .catch(function (error) {
        if (error.status === 401) {
          $scope.loginError = "Usuario o contraseña inválidos";
          return;
        }

        $scope.loginError = "Error en conexion";
      })
      .finally(function () {
        $scope.isSubmitting = false;
      });
  };
}

function getSessionMessage(reason) {
  if (reason === "required") {
    return "Iniciá sesión para acceder al panel.";
  }

  return "";
}

LoginController.$inject = ["$scope", "$state", "$stateParams", "AuthService"];

angular.module("latinadCmsApp").controller("LoginController", LoginController);
