import angular from "angular";

angular.module("latinadCmsApp").component("appCheckbox", {
  bindings: {
    checked: "<",
    disabled: "<",
    label: "@",
    name: "@",
    onChange: "&"
  },
  controller: function () {
    this.handleChange = function () {
      if (this.onChange) {
        this.onChange({ checked: this.checked });
      }
    };
  },
  template: `
    <label class="inline-flex cursor-pointer items-center gap-2">
      <input
        class="peer sr-only"
        type="checkbox"
        name="{{$ctrl.name}}"
        ng-model="$ctrl.checked"
        ng-disabled="$ctrl.disabled"
        ng-change="$ctrl.handleChange()">

      <span
        class="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-white shadow-sm transition peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
        <svg
          class="size-4 text-white transition"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          ng-class="$ctrl.checked ? 'opacity-100' : 'opacity-0'">
          <path
            d="M4.5 10.5L8.25 14.25L15.5 6.75"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round">
          </path>
        </svg>
      </span>

      <span class="sr-only" ng-if="$ctrl.label">{{$ctrl.label}}</span>
    </label>
  `
});
