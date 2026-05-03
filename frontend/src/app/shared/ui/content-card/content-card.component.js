import angular from "angular";
import calendarIcon from "../../../../assets/icons/calendar.svg";
import imageIcon from "../../../../assets/icons/image.svg";
import playIcon from "../../../../assets/icons/play.svg";
import projectIcon from "../../../../assets/icons/project.svg";
import videoIcon from "../../../../assets/icons/video.svg";

angular.module("latinadCmsApp").component("contentCard", {
  bindings: {
    categoryName: "@",
    content: "<",
    folderName: "@",
    showCheckbox: "<"
  },
  controller: function () {
    this.calendarIcon = calendarIcon;
    this.imageIcon = imageIcon;
    this.playIcon = playIcon;
    this.projectIcon = projectIcon;
    this.videoIcon = videoIcon;

    this.isVideo = function () {
      return this.content && this.content.type === "video";
    };

    this.getTypeLabel = function () {
      return this.isVideo() ? "Video" : "Imagen";
    };

    this.getTypeIcon = function () {
      return this.isVideo() ? this.videoIcon : this.imageIcon;
    };

    this.getVideoPreviewUrl = function () {
      return "https://placehold.co/640x480/eef2f5/eef2f5?text=";
    };
  },
  template: `
    <article
      class="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-brand-light hover:shadow-xl hover:shadow-brand/10">
      <div class="relative aspect-[4/3] overflow-hidden bg-gray-light">
        <div
          class="absolute right-3 top-3 z-10"
          ng-if="$ctrl.showCheckbox">
          <app-checkbox
            checked="false"
            label="Seleccionar {{$ctrl.content.name}}">
          </app-checkbox>
        </div>

        <img
          ng-if="!$ctrl.isVideo()"
          class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          ng-src="{{$ctrl.content.url}}"
          alt="{{$ctrl.content.name}}">

        <div
          ng-if="$ctrl.isVideo()"
          class="relative h-full w-full overflow-hidden">
          <img
            class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
            ng-src="{{$ctrl.getVideoPreviewUrl()}}"
            alt="{{$ctrl.content.name}}">

          <span class="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/75 backdrop-blur">
            <img class="size-7 opacity-80" ng-src="{{$ctrl.playIcon}}" alt="">
          </span>
        </div>

        <div
          class="absolute left-3 top-3 flex items-center gap-2"
          ng-class="$ctrl.showCheckbox ? 'max-w-[calc(100%-4.75rem)]' : 'max-w-[calc(100%-1.5rem)]'">
          <span class="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text shadow-sm backdrop-blur">
            <img class="size-4 opacity-70" ng-src="{{$ctrl.getTypeIcon()}}" alt="">
            {{$ctrl.getTypeLabel()}}
          </span>

          <span
            class="rounded-full bg-danger-soft px-3 py-1 text-xs font-semibold text-danger shadow-sm"
            ng-if="$ctrl.content.archived">
            Archivado
          </span>
        </div>

        <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent"></div>
      </div>

      <div class="space-y-4 p-4">
        <div class="min-w-0">
          <h3 class="line-clamp-1 text-base font-semibold leading-[1.25] text-text">
            {{$ctrl.content.name}}
          </h3>
          <p class="mt-1 text-sm font-semibold leading-[1.15] text-brand">
            {{$ctrl.categoryName || "Sin categoria"}}
          </p>
        </div>

        <div class="flex items-center justify-between gap-3 border-t border-border pt-4">
          <span class="flex min-w-0 items-center gap-2 text-sm text-text-muted">
            <img class="size-4 shrink-0 opacity-60" ng-src="{{$ctrl.calendarIcon}}" alt="">
            <span class="truncate">{{$ctrl.content.created_at | contentDate}}</span>
          </span>

          <span class="h-4 w-px shrink-0 bg-border"></span>

          <span
            class="flex min-w-0 items-center gap-2 text-sm text-text-muted"
            title="{{$ctrl.folderName || 'Sin carpeta'}}">
            <img class="size-4 shrink-0 opacity-60" ng-src="{{$ctrl.projectIcon}}" alt="">
            <span class="truncate">{{$ctrl.folderName || "Sin carpeta"}}</span>
          </span>
        </div>
      </div>
    </article>
  `
});
