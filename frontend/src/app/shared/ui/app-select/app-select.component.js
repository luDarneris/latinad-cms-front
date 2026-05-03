import angular from "angular";

angular.module("latinadCmsApp").component("appSelect", {
  bindings: {
    label: "@",
    model: "=",
    name: "@",
    options: "<",
    placeholder: "@",
    valueField: "@",
    labelField: "@",
    onChange: "&"
  },
  controller: function () {
    this.getOptionValue = function (option) {
      if (option && option.isPlaceholder) {
        return "";
      }

      return option && option[this.valueField || "value"];
    };

    this.getOptionLabel = function (option) {
      if (option && option.isPlaceholder) {
        return this.placeholder;
      }

      return option && option[this.labelField || "label"];
    };

    this.getOptions = function () {
      return [
        {
          isPlaceholder: true
        }
      ].concat(this.options || []);
    };

    this.handleChange = function () {
      if (this.onChange) {
        this.onChange({ value: this.model });
      }
    };
  },
  template: `
    <label class="block min-w-44">
      <span class="sr-only">{{$ctrl.label}}</span>

      <span class="relative block">
        <select
          class="h-8 w-full appearance-none rounded-full border border-border/80 bg-surface py-0 pl-3 pr-9 text-xs font-semibold text-text-muted shadow-sm outline-none transition hover:border-brand-light hover:text-brand focus:border-brand focus:text-brand focus:shadow-md focus:ring-0 md:h-8 md:pl-3.5"
          name="{{$ctrl.name}}"
          ng-model="$ctrl.model"
          ng-options="$ctrl.getOptionValue(option) as $ctrl.getOptionLabel(option) for option in $ctrl.getOptions()"
          ng-change="$ctrl.handleChange()">
        </select>

        <span class="pointer-events-none absolute right-3 top-1/2 size-0 -translate-y-1/2 border-x-[4px] border-t-[5px] border-x-transparent border-t-brand"></span>
      </span>
    </label>
  `
});
