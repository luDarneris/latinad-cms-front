import angular from "angular";

angular.module("latinadCmsApp").component("appRoot", {
  template: `
    <div class="font-sans">
      <ui-view></ui-view>
    </div>
  `
});
