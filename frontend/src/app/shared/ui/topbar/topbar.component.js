import angular from "angular";

angular.module("latinadCmsApp").component("topbar", {
  bindings: {
    logo: "@",
    onLogout: "&",
    signOutIcon: "@",
    user: "<"
  },
  template: `
    <header class="border-b border-border bg-surface px-4 py-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        <img class="h-8 w-auto" ng-src="{{$ctrl.logo}}" alt="LatinAd CMS">

        <div class="flex items-center gap-6">
          <div class="hidden min-w-0 text-right sm:block">
            <span class="block truncate text-sm font-semibold leading-5 text-text">
              {{$ctrl.user.name}}
            </span>
            <span class="block truncate text-xs leading-4 text-text-muted">
              {{$ctrl.user.username}}
            </span>
          </div>

          <app-button
            label="Salir"
            icon="{{$ctrl.signOutIcon}}"
            icon-position="right"
            full-width="false"
            on-click="$ctrl.onLogout()">
          </app-button>
        </div>
      </div>
    </header>
  `
});
