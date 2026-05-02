import angular from "angular";

function contentDateFilter() {
  var monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ];

  return function (value) {
    var date;

    if (!value) {
      return "Sin fecha";
    }

    date = new Date(value + "T00:00:00");

    return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
  };
}

angular.module("latinadCmsApp").filter("contentDate", contentDateFilter);
