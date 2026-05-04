import angular from "angular";

angular.module("latinadCmsApp").component("appButton", {
  bindings: {
    active: "<",
    disabled: "<",
    fullWidth: "<",
    icon: "@",
    iconPosition: "@",
    label: "@",
    onClick: "&",
    type: "@",
    variant: "@"
  },
  controller: function () {
    this.emptyStyles = {};
    this.activeSecondaryStyles = {
      "background-color": "#62a8ea",
      "border-color": "#62a8ea",
      color: "#ffffff"
    };

    this.isFullWidth = function () {
      return this.fullWidth !== false;
    };

    this.getWrapperClasses = function () {
      return this.isFullWidth() ? "block w-full" : "inline-block";
    };

    this.getButtonClasses = function () {
      var widthClasses = this.isFullWidth() ? " w-full" : "";
      var baseClasses = "inline-flex items-center justify-center gap-2 transition disabled:cursor-not-allowed disabled:opacity-60";

      if (this.variant === "secondary") {
        return baseClasses + " h-7 rounded-full border border-border bg-surface px-3 text-xs font-semibold leading-none text-text-muted shadow-sm hover:border-brand-light hover:text-brand md:h-8 md:px-3.5" + widthClasses;
      }

      return baseClasses + " rounded-md px-4 py-2.5 text-sm font-medium bg-brand text-text-invert hover:bg-brand-hover" + widthClasses;
    };

    this.getIconClasses = function () {
      if (this.variant === "secondary") {
        if (this.active) {
          return "size-4 shrink-0 brightness-0 invert";
        }

        return "size-4 shrink-0 opacity-70";
      }

      return "size-4 shrink-0 brightness-0 invert";
    };

    this.getButtonStyles = function () {
      if (this.variant === "secondary" && this.active) {
        return this.activeSecondaryStyles;
      }

      return this.emptyStyles;
    };

    this.isIconRight = function () {
      return this.iconPosition === "right";
    };

    this.handleClick = function () {
      if (this.onClick) {
        this.onClick();
      }
    };
  },
  template: `
    <div class="{{$ctrl.getWrapperClasses()}}">
      <button
        class="{{$ctrl.getButtonClasses()}}"
        ng-style="$ctrl.getButtonStyles()"
        type="{{$ctrl.type || 'button'}}"
        ng-disabled="$ctrl.disabled"
        ng-click="$ctrl.handleClick()">
        <img
          class="{{$ctrl.getIconClasses()}}"
          ng-if="$ctrl.icon && !$ctrl.isIconRight()"
          ng-src="{{$ctrl.icon}}"
          alt="">
        <span>{{$ctrl.label}}</span>
        <img
          class="{{$ctrl.getIconClasses()}}"
          ng-if="$ctrl.icon && $ctrl.isIconRight()"
          ng-src="{{$ctrl.icon}}"
          alt="">
      </button>
    </div>
  `
});
