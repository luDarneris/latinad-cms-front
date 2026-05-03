import angular from "angular";

angular.module("latinadCmsApp").component("confirmationModal", {
  bindings: {
    cancelLabel: "@",
    confirmDisabled: "<",
    confirmLabel: "@",
    loading: "<",
    message: "<",
    open: "<",
    title: "@",
    onCancel: "&",
    onConfirm: "&"
  },
  controller: function () {
    this.handleCancel = function () {
      if (this.loading) {
        return;
      }

      if (this.onCancel) {
        this.onCancel();
      }
    };

    this.handleConfirm = function () {
      if (this.loading || this.confirmDisabled) {
        return;
      }

      if (this.onConfirm) {
        this.onConfirm();
      }
    };

    this.getCancelLabel = function () {
      return this.cancelLabel || "Cancelar";
    };

    this.getConfirmLabel = function () {
      return this.confirmLabel || "Confirmar";
    };
  },
  template: `
    <app-modal
      title="{{$ctrl.title}}"
      open="$ctrl.open"
      on-close="$ctrl.handleCancel()">
      <section class="grid gap-6">
        <p class="text-center text-sm leading-6 text-text-muted">
          {{$ctrl.message}}
        </p>

        <footer class="flex flex-nowrap items-center justify-center gap-3">
          <app-button
            label="{{$ctrl.getCancelLabel()}}"
            full-width="false"
            disabled="$ctrl.loading"
            on-click="$ctrl.handleCancel()">
          </app-button>

          <app-button
            label="{{$ctrl.getConfirmLabel()}}"
            full-width="false"
            disabled="$ctrl.loading || $ctrl.confirmDisabled"
            on-click="$ctrl.handleConfirm()">
          </app-button>
        </footer>
      </section>
    </app-modal>
  `
});
