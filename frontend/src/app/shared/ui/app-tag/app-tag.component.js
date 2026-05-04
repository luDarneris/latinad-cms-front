import angular from "angular";

angular.module("latinadCmsApp").component("appTag", {
  bindings: {
    icon: "@",
    label: "@",
    variant: "@"
  },
  controller: function () {
    this.colors = {
      danger: "#cf2e2e",
      dangerSoft: "#fff0f0",
      text: "#000000",
      whiteSoft: "rgba(255, 255, 255, 0.9)"
    };
    this.dangerStyles = {
      "background-color": this.colors.dangerSoft,
      color: this.colors.danger
    };
    this.defaultStyles = {
      "background-color": this.colors.whiteSoft,
      color: this.colors.text,
      "backdrop-filter": "blur(8px)"
    };

    this.getTagStyles = function () {
      if (this.variant === "danger") {
        return this.dangerStyles;
      }

      return this.defaultStyles;
    };

    this.hasIcon = function () {
      return Boolean(this.icon);
    };
  },
  template: `
    <span
      class="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
      ng-style="$ctrl.getTagStyles()">
      <img
        class="size-4 opacity-70"
        ng-if="$ctrl.hasIcon()"
        ng-src="{{$ctrl.icon}}"
        alt="">
      {{$ctrl.label}}
    </span>
  `
});
