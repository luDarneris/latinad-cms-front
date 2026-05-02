import angular from "angular";
import "./style.css";

import "./app/app.module";
import "./app/app.component";

angular.element(document).ready(function () {
  angular.bootstrap(document, ["latinadCmsApp"]);
});
