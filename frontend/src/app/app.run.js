import angular from "angular";

function AppRun($transitions, $state, AuthService) {
  $transitions.onBefore({ to: "*" }, function (transition) {
    var targetState = transition.to();
    var requiresAuth = targetState.data && targetState.data.requiresAuth;

    if (requiresAuth && !AuthService.isAuthenticated()) {
      return $state.target("login", { reason: "required" });
    }

    if (targetState.name === "login" && AuthService.isAuthenticated()) {
      return $state.target("app");
    }

    return true;
  });
}

AppRun.$inject = ["$transitions", "$state", "AuthService"];

angular.module("latinadCmsApp").run(AppRun);
