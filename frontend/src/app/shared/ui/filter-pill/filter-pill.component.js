import angular from "angular";

angular.module("latinadCmsApp").component("filterPill", {
  bindings: {
    active: "<",
    label: "@",
    onClick: "&"
  },
  controller: function () {
    this.handleClick = function () {
      if (this.onClick) {
        this.onClick();
      }
    };
  },
  template: `
    <button
      class="h-7 rounded-full border px-3 text-xs font-semibold leading-none shadow-sm transition md:h-8 md:px-3.5"
      ng-class="$ctrl.active ? 'border-brand bg-brand text-text-invert' : 'border-border bg-surface text-text-muted hover:border-brand hover:text-brand'"
      type="button"
      ng-click="$ctrl.handleClick()">
      {{$ctrl.label}}
    </button>
  `
});
