import angular from "angular";
import dashboardTemplate from "./dashboard/dashboard.html?raw";
import loginTemplate from "./login/login.html?raw";

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
      controller: "DashboardController",
      template: dashboardTemplate,
      data: {
        requiresAuth: true
      }
    });

  $urlRouterProvider.otherwise("/login");
});
