import angular from "angular";
import "./style.css";

import "./app/app.module";
import "./app/core/api.service";
import "./app/core/auth.service";
import "./app/core/auth.interceptor";
import "./app/app.routes";
import "./app/app.run";
import "./app/shared/filters/content-date.filter";
import "./app/shared/ui/app-button/app-button.component";
import "./app/shared/ui/app-checkbox/app-checkbox.component";
import "./app/shared/ui/app-input/app-input.component";
import "./app/shared/ui/app-select/app-select.component";
import "./app/shared/ui/app-tag/app-tag.component";
import "./app/shared/ui/app-toast/app-toast.component";
import "./app/shared/ui/close-button/close-button.component";
import "./app/shared/ui/content-card/content-card.component";
import "./app/shared/ui/filter-pill/filter-pill.component";
import "./app/shared/ui/smol-button/smol-button.component";
import "./app/shared/ui/topbar/topbar.component";
import "./app/login/login.controller";
import "./app/dashboard/dashboard.controller";
import "./app/app.component";

angular.element(document).ready(function () {
  angular.bootstrap(document, ["latinadCmsApp"]);
});
