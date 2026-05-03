import angular from "angular";
import errorIcon from "../../../../assets/icons/error.svg";
import okIcon from "../../../../assets/icons/ok.svg";
import "./app-toast.component.css";

angular.module("latinadCmsApp").component("appToast", {
  bindings: {
    message: "<",
    onClose: "&",
    type: "@"
  },
  controller: ["$timeout", "$scope", function ($timeout, $scope) {
    var activeMessage;
    var closeTimeout;
    var removeTimeout;
    var ctrl = this;

    function cancelCloseTimeout() {
      if (closeTimeout) {
        $timeout.cancel(closeTimeout);
        closeTimeout = null;
      }
    }

    function cancelRemoveTimeout() {
      if (removeTimeout) {
        $timeout.cancel(removeTimeout);
        removeTimeout = null;
      }
    }

    function refreshAnimationState() {
      if ($scope.$root.$$phase) {
        $scope.$evalAsync();
        return;
      }

      $scope.$digest();
    }

    function runCloseAnimation(shouldNotifyParent) {
      cancelCloseTimeout();
      cancelRemoveTimeout();

      if (!ctrl.displayedMessage || ctrl.isClosing) {
        return;
      }

      ctrl.isClosing = true;

      refreshAnimationState();

      removeTimeout = $timeout(function () {
        removeTimeout = null;
        ctrl.displayedMessage = "";
        ctrl.isClosing = false;

        if (shouldNotifyParent && ctrl.onClose) {
          ctrl.onClose();
        }
      }, ctrl.exitDuration);
    }

    function scheduleClose(message) {
      cancelCloseTimeout();

      closeTimeout = $timeout(function () {
        closeTimeout = null;

        if (ctrl.displayedMessage === message) {
          runCloseAnimation(true);
        }
      }, ctrl.duration);
    }

    function syncMessageState() {
      if (ctrl.message === activeMessage) {
        return;
      }

      activeMessage = ctrl.message;
      cancelCloseTimeout();
      cancelRemoveTimeout();

      if (activeMessage) {
        ctrl.displayedMessage = activeMessage;
        ctrl.isClosing = false;
        scheduleClose(activeMessage);
        return;
      }

      if (ctrl.displayedMessage) {
        runCloseAnimation(false);
      }
    }

    this.errorIcon = errorIcon;
    this.okIcon = okIcon;
    this.duration = 4000;
    this.exitDuration = 240;
    this.displayedMessage = "";
    this.isClosing = false;

    this.getToastClasses = function () {
      var animationClass = this.isClosing ? "toast-slide-out" : "toast-slide-in";

      return animationClass + " fixed right-4 top-24 z-50 flex min-h-11 w-fit min-w-64 max-w-[calc(100%-2rem)] items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-muted shadow-2xl shadow-black/20 md:right-6 md:top-24 md:max-w-sm";
    };

    this.getIcon = function () {
      return this.type === "success" ? this.okIcon : this.errorIcon;
    };

    this.close = function () {
      runCloseAnimation(true);
    };

    this.$onChanges = function (changes) {
      if (changes.message) {
        syncMessageState();
      }
    };

    this.$doCheck = function () {
      syncMessageState();
    };

    this.$onDestroy = function () {
      cancelCloseTimeout();
      cancelRemoveTimeout();
    };
  }],
  template: `
    <aside
      class="{{$ctrl.getToastClasses()}}"
      role="alert"
      ng-if="$ctrl.displayedMessage">
      <img class="size-5 shrink-0" ng-src="{{$ctrl.getIcon()}}" alt="">

      <p class="min-w-0 flex-1 leading-snug text-text-muted">{{$ctrl.displayedMessage}}</p>

      <span class="h-7 w-px shrink-0 bg-border"></span>

      <close-button
        label="Cerrar mensaje"
        on-click="$ctrl.close()">
      </close-button>
    </aside>
  `
});
