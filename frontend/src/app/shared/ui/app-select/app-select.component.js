import angular from "angular";

angular.module("latinadCmsApp").component("appSelect", {
  bindings: {
    label: "@",
    model: "=",
    name: "@",
    disabled: "<",
    error: "<",
    invalid: "<",
    options: "<",
    placeholder: "@",
    showPlaceholder: "<",
    variant: "@",
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
      if (this.showPlaceholder === false) {
        return this.options || [];
      }

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

    this.getSelectClasses = function () {
      if (this.variant === "secondary") {
        return "h-[38px] w-full appearance-none rounded-md border bg-white py-0 pl-3 pr-9 text-sm font-medium text-text outline-none transition hover:border-brand-light focus:border-brand focus:shadow-md focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60" + (this.invalid ? " border-danger" : " border-border");
      }

      return "h-8 w-full appearance-none rounded-full border bg-surface py-0 pl-3 pr-9 text-xs font-semibold text-text-muted shadow-sm outline-none transition hover:border-brand-light hover:text-brand focus:border-brand focus:text-brand focus:shadow-md focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 md:h-8 md:pl-3.5" + (this.invalid ? " border-danger" : " border-border/80");
    };
  },
  template: `
    <label class="block min-w-44">
      <span class="sr-only">{{$ctrl.label}}</span>

      <span class="relative block">
        <select
          class="{{$ctrl.getSelectClasses()}}"
          name="{{$ctrl.name}}"
          ng-model="$ctrl.model"
          ng-disabled="$ctrl.disabled"
          ng-options="$ctrl.getOptionValue(option) as $ctrl.getOptionLabel(option) for option in $ctrl.getOptions()"
          ng-change="$ctrl.handleChange()">
        </select>

        <span class="pointer-events-none absolute right-3 top-1/2 size-0 -translate-y-1/2 border-x-[4px] border-t-[5px] border-x-transparent border-t-brand"></span>
      </span>

      <span class="mt-1 block min-h-5 text-sm text-danger">
        {{$ctrl.error}}
      </span>
    </label>
  `
});
