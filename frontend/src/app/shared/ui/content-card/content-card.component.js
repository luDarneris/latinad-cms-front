import angular from "angular";
import calendarIcon from "../../../../assets/icons/calendar.svg";
import imageIcon from "../../../../assets/icons/image.svg";
import videoIcon from "../../../../assets/icons/video.svg";

angular.module("latinadCmsApp").component("contentCard", {
  bindings: {
    categoryName: "@",
    content: "<",
    folderName: "@"
  },
  controller: function () {
    this.calendarIcon = calendarIcon;
    this.imageIcon = imageIcon;
    this.videoIcon = videoIcon;

    this.isVideo = function () {
      return this.content && this.content.type === "video";
    };

    this.getTypeLabel = function () {
      return this.isVideo() ? "Video" : "Imagen";
    };

    this.getAudioLabel = function () {
      if (!this.isVideo()) {
        return "Sin audio";
      }

      return this.content.has_audio ? "Con audio" : "Sin audio";
    };

    this.getTypeIcon = function () {
      return this.isVideo() ? this.videoIcon : this.imageIcon;
    };
  },
  template: `
    <article
      class="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-brand-light hover:shadow-xl hover:shadow-brand/10">
      <div class="relative aspect-[4/3] overflow-hidden bg-gray-light">
        <img
          ng-if="!$ctrl.isVideo()"
          class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          ng-src="{{$ctrl.content.url}}"
          alt="{{$ctrl.content.name}}">

        <video
          ng-if="$ctrl.isVideo()"
          class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          ng-src="{{$ctrl.content.url}}"
          muted
          preload="metadata">
        </video>

        <div class="absolute left-3 top-3 flex items-center gap-2">
          <span class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text shadow-sm backdrop-blur">
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
        <div class="flex items-start gap-3">
          <span class="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
            <img class="size-5 opacity-70" ng-src="{{$ctrl.getTypeIcon()}}" alt="">
          </span>

          <div class="min-w-0">
            <h3 class="line-clamp-2 text-base font-semibold leading-snug text-text">
              {{$ctrl.content.name}}
            </h3>
            <p class="mt-1 text-xs font-medium uppercase text-text-muted">
              {{$ctrl.getAudioLabel()}}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="rounded-lg bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand">
            {{$ctrl.categoryName || "Sin categoria"}}
          </span>

          <span class="rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold text-text-muted">
            {{$ctrl.folderName || "Sin carpeta"}}
          </span>
        </div>

        <div class="flex items-center justify-between gap-3 border-t border-border pt-4">
          <span class="flex min-w-0 items-center gap-2 text-sm text-text-muted">
            <img class="size-4 shrink-0 opacity-60" ng-src="{{$ctrl.calendarIcon}}" alt="">
            <span class="truncate">{{$ctrl.content.created_at | contentDate}}</span>
          </span>
        </div>
      </div>
    </article>
  `
});
