import angular from "angular";
import errorIcon from "../../../../assets/icons/error.svg";
import "./app-toast.component.css";

angular.module("latinadCmsApp").component("appToast", {
  bindings: {
    message: "<",
    onClose: "&"
  },
  controller: ["$timeout", function ($timeout) {
    var closeTimeout;
    var ctrl = this;

    this.errorIcon = errorIcon;
    this.duration = 4000;

    this.getToastClasses = function () {
      return "toast-slide-in fixed right-4 top-4 z-50 flex min-h-11 w-fit min-w-64 max-w-[calc(100%-2rem)] items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-muted shadow-lg md:right-6 md:top-6 md:max-w-sm";
    };

    this.close = function () {
      if (closeTimeout) {
        $timeout.cancel(closeTimeout);
        closeTimeout = null;
      }

      if (this.onClose) {
        this.onClose();
      }
    };

    this.$onChanges = function (changes) {
      if (!changes.message || !this.message) {
        return;
      }

      if (closeTimeout) {
        $timeout.cancel(closeTimeout);
      }

      closeTimeout = $timeout(function () {
        ctrl.close();
      }, this.duration);
    };

    this.$onDestroy = function () {
      if (closeTimeout) {
        $timeout.cancel(closeTimeout);
      }
    };
  }],
  template: `
    <aside
      class="{{$ctrl.getToastClasses()}}"
      role="alert"
      ng-if="$ctrl.message">
      <img class="size-5 shrink-0" ng-src="{{$ctrl.errorIcon}}" alt="">

      <p class="min-w-0 flex-1 leading-snug text-text-muted">{{$ctrl.message}}</p>

      <span class="h-7 w-px shrink-0 bg-border"></span>

      <close-button
        label="Cerrar mensaje"
        on-click="$ctrl.close()">
      </close-button>
    </aside>
  `
});
