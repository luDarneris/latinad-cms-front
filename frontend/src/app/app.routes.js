import angular from "angular";
import dashboardTemplate from "./dashboard/dashboard.html?raw";
import loginTemplate from "./login/login.html?raw";

function AppRoutes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      params: {
        reason: null
      },
      controller: "LoginController",
      template: loginTemplate
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
}

AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

angular.module("latinadCmsApp").config(AppRoutes);
