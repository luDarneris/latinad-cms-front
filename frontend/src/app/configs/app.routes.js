import angular from "angular";
import loginTemplate from "../controllers/login/login.template.html?raw";
import shellTemplate from "../controllers/shell/shell.template.html?raw";

angular.module("latinadCmsApp").config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      controller: "LoginController",
      template: loginTemplate,
      data: {
        public: true
      }
    })
    .state("app", {
      url: "/app",
      controller: "ShellController",
      template: shellTemplate,
      data: {
        requiresAuth: true
      }
    });

  $urlRouterProvider.otherwise("/login");
});
