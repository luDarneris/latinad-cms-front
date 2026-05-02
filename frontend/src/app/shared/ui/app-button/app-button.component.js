import angular from "angular";

angular.module("latinadCmsApp").component("appButton", {
  bindings: {
    disabled: "<",
    fullWidth: "<",
    icon: "@",
    iconPosition: "@",
    label: "@",
    onClick: "&",
    type: "@"
  },
  controller: function () {
    this.isFullWidth = function () {
      return this.fullWidth !== false;
    };

    this.getWrapperClasses = function () {
      return this.isFullWidth() ? "block w-full" : "inline-block";
    };

    this.getButtonClasses = function () {
      var widthClasses = this.isFullWidth() ? " w-full" : "";

      return "inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-text-invert transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60" + widthClasses;
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
        type="{{$ctrl.type || 'button'}}"
        ng-disabled="$ctrl.disabled"
        ng-click="$ctrl.handleClick()">
        <img
          class="size-4 shrink-0 brightness-0 invert"
          ng-if="$ctrl.icon && !$ctrl.isIconRight()"
          ng-src="{{$ctrl.icon}}"
          alt="">
        <span>{{$ctrl.label}}</span>
        <img
          class="size-4 shrink-0 brightness-0 invert"
          ng-if="$ctrl.icon && $ctrl.isIconRight()"
          ng-src="{{$ctrl.icon}}"
          alt="">
      </button>
    </div>
  `
});
