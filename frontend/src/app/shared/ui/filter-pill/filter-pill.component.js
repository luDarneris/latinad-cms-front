import angular from "angular";

angular.module("latinadCmsApp").component("filterPill", {
  bindings: {
    active: "<",
    label: "@",
    onClick: "&"
  },
  controller: function () {
    this.getClasses = function () {
      var baseClasses = "h-7 rounded-full border px-3 text-xs font-semibold leading-none shadow-sm transition md:h-8 md:px-3.5";

      if (this.active) {
        return baseClasses + " border-brand bg-brand text-text-invert shadow-brand/20";
      }

      return baseClasses + " border-border bg-surface text-text-muted hover:border-brand-light hover:text-brand";
    };

    this.handleClick = function () {
      if (this.onClick) {
        this.onClick();
      }
    };
  },
  template: `
    <button
      class="{{$ctrl.getClasses()}}"
      type="button"
      ng-click="$ctrl.handleClick()">
      {{$ctrl.label}}
    </button>
  `
});
