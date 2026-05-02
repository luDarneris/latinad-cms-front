import angular from "angular";
import "./style.css";

import "./app/app.module";
import "./app/core/api.service";
import "./app/app.routes";
import "./app/shared/ui/app-button/app-button.component";
import "./app/shared/ui/app-input/app-input.component";
import "./app/login/login.controller";
import "./app/dashboard/dashboard.controller";
import "./app/app.component";

angular.element(document).ready(function () {
  angular.bootstrap(document, ["latinadCmsApp"]);
});
