import angular from "angular";
import closeIcon from "../../../../assets/icons/close.svg";

angular.module("latinadCmsApp").component("closeButton", {
  bindings: {
    label: "@",
    onClick: "&"
  },
  controller: function () {
    this.closeIcon = closeIcon;

    this.handleClick = function () {
      if (this.onClick) {
        this.onClick();
      }
    };
  },
  template: `
    <button
      class="flex size-5 shrink-0 items-center justify-center bg-transparent opacity-55 transition hover:opacity-100 focus:outline-none"
      type="button"
      aria-label="{{$ctrl.label || 'Cerrar'}}"
      ng-click="$ctrl.handleClick()">
      <img class="size-3.5" ng-src="{{$ctrl.closeIcon}}" alt="">
    </button>
  `
});
