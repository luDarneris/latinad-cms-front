import angular from "angular";
import "./style.css";

import "./app/main";
import "./app/configs/app.routes";
import "./app/components/ui/app-button/app-button.component";
import "./app/components/ui/app-input/app-input.component";
import "./app/controllers/login/login.controller";
import "./app/controllers/shell/shell.controller";
import "./app/app.component";

angular.element(document).ready(function () {
  angular.bootstrap(document, ["latinadCmsApp"]);
});
