import angular from "angular";

angular.module("latinadCmsApp").component("smolButton", {
  bindings: {
    disabled: "<",
    icon: "@",
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
      class="flex size-10 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition hover:border-brand-light hover:text-brand disabled:cursor-not-allowed disabled:opacity-60"
      type="button"
      aria-label="{{$ctrl.label}}"
      title="{{$ctrl.label}}"
      ng-disabled="$ctrl.disabled"
      ng-click="$ctrl.handleClick()">
      <img
        class="size-4 shrink-0 opacity-70"
        ng-src="{{$ctrl.icon}}"
        alt="">
    </button>
  `
});
