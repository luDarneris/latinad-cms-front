import angular from "angular";

angular.module("latinadCmsApp").component("appButton", {
  bindings: {
    disabled: "<",
    label: "@",
    type: "@"
  },
  template: `
    <div class="block w-full">
      <button
        class="w-full rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-text-invert transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        type="{{$ctrl.type || 'button'}}"
        ng-disabled="$ctrl.disabled">
        {{$ctrl.label}}
      </button>
    </div>
  `
});
