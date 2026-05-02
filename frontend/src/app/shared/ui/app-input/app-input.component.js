import angular from "angular";
import eyeClosedIcon from "../../../../assets/icons/eye-closed.svg";
import eyeIcon from "../../../../assets/icons/eye.svg";

angular.module("latinadCmsApp").component("appInput", {
  bindings: {
    autocomplete: "@",
    error: "<",
    invalid: "<",
    label: "@",
    model: "=",
    name: "@",
    placeholder: "@",
    required: "<",
    size: "@",
    type: "@"
  },
  controller: function () {
    this.eyeClosedIcon = eyeClosedIcon;
    this.eyeIcon = eyeIcon;
    this.isPasswordVisible = false;

    this.isPasswordInput = function () {
      return this.type === "password";
    };

    this.getInputType = function () {
      if (this.isPasswordInput() && this.isPasswordVisible) {
        return "text";
      }

      return this.type || "text";
    };

    this.getInputClasses = function () {
      var baseClasses = "mt-1 w-full rounded-md border bg-white text-text outline-none transition focus:border-brand";
      var borderClasses = this.invalid ? " border-danger" : " border-border";

      if (this.size === "sm") {
        return baseClasses + borderClasses + (this.isPasswordInput() ? " pl-3 pr-11" : " px-3") + " py-1.5 text-sm";
      }

      if (this.size === "lg") {
        return baseClasses + borderClasses + (this.isPasswordInput() ? " pl-4 pr-12" : " px-4") + " py-3 text-base";
      }

      return baseClasses + borderClasses + (this.isPasswordInput() ? " pl-3 pr-11" : " px-3") + " py-2 text-sm";
    };

    this.togglePasswordVisibility = function () {
      this.isPasswordVisible = !this.isPasswordVisible;
    };
  },
  template: `
    <div class="block w-full">
      <label class="block">
        <span class="text-sm font-medium text-text">{{$ctrl.label}}</span>

        <span class="relative block">
          <input
            class="{{$ctrl.getInputClasses()}}"
            type="{{$ctrl.getInputType()}}"
            name="{{$ctrl.name}}"
            placeholder="{{$ctrl.placeholder}}"
            autocomplete="{{$ctrl.autocomplete}}"
            ng-model="$ctrl.model"
            ng-required="$ctrl.required">

          <button
            class="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center opacity-70 transition hover:opacity-100"
            type="button"
            aria-label="{{$ctrl.isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}}"
            ng-if="$ctrl.isPasswordInput()"
            ng-click="$ctrl.togglePasswordVisibility()">
            <img
              class="size-5"
              alt=""
              ng-src="{{$ctrl.isPasswordVisible ? $ctrl.eyeIcon : $ctrl.eyeClosedIcon}}">
          </button>
        </span>
      </label>

      <span class="mt-1 block min-h-5 text-sm text-danger">
        {{$ctrl.error}}
      </span>
    </div>
  `
});
