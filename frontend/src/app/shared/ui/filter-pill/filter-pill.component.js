import angular from "angular";

angular.module("latinadCmsApp").component("filterPill", {
  bindings: {
    active: "<",
    label: "@",
    onClick: "&"
  },
  controller: function () {
    this.isHovered = false;

    this.colors = {
      brand: "#62a8ea",
      brandLight: "#8ed1fc",
      surface: "#ffffff",
      border: "#d7e0e7",
      textMuted: "#5f6f7c",
      textInvert: "#ffffff"
    };

    this.getButtonStyles = function () {
      if (this.active) {
        return {
          "background-color": this.colors.brand,
          "border-color": this.colors.brand,
          color: this.colors.textInvert
        };
      }

      return {
        "background-color": this.colors.surface,
        "border-color": this.isHovered ? this.colors.brandLight : this.colors.border,
        color: this.isHovered ? this.colors.brand : this.colors.textMuted
      };
    };

    this.setHovered = function (isHovered) {
      this.isHovered = isHovered;
    };

    this.handleClick = function () {
      if (this.onClick) {
        this.onClick();
      }
    };
  },
  template: `
    <button
      class="h-7 rounded-full border px-3 text-xs font-semibold leading-none shadow-sm transition md:h-8 md:px-3.5"
      ng-style="$ctrl.getButtonStyles()"
      ng-mouseenter="$ctrl.setHovered(true)"
      ng-mouseleave="$ctrl.setHovered(false)"
      type="button"
      ng-click="$ctrl.handleClick()">
      {{$ctrl.label}}
    </button>
  `
});
