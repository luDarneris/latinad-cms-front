import angular from "angular";

angular.module("latinadCmsApp").component("appModal", {
  transclude: true,
  bindings: {
    open: "<",
    title: "@",
    onClose: "&"
  },
  controller: function () {
    this.handleClose = function () {
      if (this.onClose) {
        this.onClose();
      }
    };
  },
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-text/20 px-4 py-6 backdrop-blur-sm"
      ng-if="$ctrl.open">
      <section
        class="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="{{$ctrl.title}}">
        <header class="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2 class="text-lg font-semibold text-brand">{{$ctrl.title}}</h2>

          <close-button
            label="Cerrar modal"
            on-click="$ctrl.handleClose()">
          </close-button>
        </header>

        <div class="px-5 py-5" ng-transclude></div>
      </section>
    </div>
  `
});
