import { Directive, ElementRef, NgModule, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import Viewer from 'viewerjs';
import {
  ViewerHiddenEvent,
  ViewerHideEvent,
  ViewerMoveEvent,
  ViewerMovedEvent,
  ViewerReadyEvent,
  ViewerRotateEvent,
  ViewerRotatedEvent,
  ViewerScaleEvent,
  ViewerScaledEvent,
  ViewerShowEvent,
  ViewerShownEvent,
  ViewerViewEvent,
  ViewerViewedEvent,
  ViewerZoomEvent,
  ViewerZoomedEvent
} from './events';

@Directive({
  selector: '[ngxViewer]'
})
export class NgxViewerDirective implements AfterViewInit, OnDestroy {
  @Input() viewerOptions: Viewer.Options = {};
  @Input() customName?: string | null;

  @Output() viewerReady: EventEmitter<ViewerReadyEvent> = new EventEmitter<ViewerReadyEvent>();
  @Output() viewerShow: EventEmitter<ViewerShowEvent> = new EventEmitter<ViewerShowEvent>();
  @Output() viewerShown: EventEmitter<ViewerShownEvent> = new EventEmitter<ViewerShownEvent>();
  @Output() viewerHide: EventEmitter<ViewerHideEvent> = new EventEmitter<ViewerHideEvent>();
  @Output() viewerHidden: EventEmitter<ViewerHiddenEvent> = new EventEmitter<ViewerHiddenEvent>();
  @Output() viewerView: EventEmitter<ViewerViewEvent> = new EventEmitter<ViewerViewEvent>();
  @Output() viewerViewed: EventEmitter<ViewerViewedEvent> = new EventEmitter<ViewerViewedEvent>();
  @Output() viewerMove: EventEmitter<ViewerMoveEvent> = new EventEmitter<ViewerMoveEvent>();
  @Output() viewerMoved: EventEmitter<ViewerMovedEvent> = new EventEmitter<ViewerMovedEvent>();
  @Output() viewerRotate: EventEmitter<ViewerRotateEvent> = new EventEmitter<ViewerRotateEvent>();
  @Output() viewerRotated: EventEmitter<ViewerRotatedEvent> = new EventEmitter<ViewerRotatedEvent>();
  @Output() viewerScale: EventEmitter<ViewerScaleEvent> = new EventEmitter<ViewerScaleEvent>();
  @Output() viewerScaled: EventEmitter<ViewerScaledEvent> = new EventEmitter<ViewerScaledEvent>();
  @Output() viewerZoom: EventEmitter<ViewerZoomEvent> = new EventEmitter<ViewerZoomEvent>();
  @Output() viewerZoomed: EventEmitter<ViewerZoomedEvent> = new EventEmitter<ViewerZoomedEvent>();

  instance: Viewer;

  private nativeElement: HTMLElement;

  private viewAnchorElement?: HTMLAnchorElement;

  constructor(private elementRef: ElementRef) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    this.initViewer();
  }

  private initViewer(): void {
    if (this.instance) {
      this.instance.destroy();
    }

    this.instance = new Viewer(this.nativeElement, {
      // Transitions currently break the Viewer when running optimizations during ng build (i.e in prod mode)
      // TODO: Find a fix for this so we don't have to force disable transitions
      transition: false,
      ...this.viewerOptions
    });

    this.nativeElement.addEventListener('ready', event => this.viewerReady.emit(event), false);
    this.nativeElement.addEventListener('show', event => this.viewerShow.emit(event), false);
    this.nativeElement.addEventListener('shown', event => this.viewerShown.emit(event), false);
    this.nativeElement.addEventListener('hide', event => this.viewerHide.emit(event), false);
    this.nativeElement.addEventListener('hidden', event => this.viewerHidden.emit(event), false);
    this.nativeElement.addEventListener('view', (event: CustomEvent) => this.viewerView.emit(event), false);
    this.nativeElement.addEventListener('viewed', (event: CustomEvent) => this.viewerViewed.emit(event), false);
    this.nativeElement.addEventListener('move', (event: CustomEvent) => this.viewerZoom.emit(event), false);
    this.nativeElement.addEventListener('moved', (event: CustomEvent) => this.viewerZoomed.emit(event), false);
    this.nativeElement.addEventListener('rotate', (event: CustomEvent) => this.viewerView.emit(event), false);
    this.nativeElement.addEventListener('rotated', (event: CustomEvent) => this.viewerViewed.emit(event), false);
    this.nativeElement.addEventListener('scale', (event: CustomEvent) => this.viewerView.emit(event), false);
    this.nativeElement.addEventListener('scaled', (event: CustomEvent) => this.viewerViewed.emit(event), false);
    this.nativeElement.addEventListener('zoom', (event: CustomEvent) => this.viewerZoom.emit(event), false);
    this.nativeElement.addEventListener('zoomed', (event: CustomEvent) => this.viewerZoomed.emit(event), false);

    this.nativeElement.addEventListener('view', this.applyCustomImageName.bind(this), false)
  }

  public ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }

  private applyCustomImageName(viewEvent: ViewerViewEvent) {
    window.requestAnimationFrame(() => {
      if (!this.customName) {
        return;
      }
      const element = viewEvent.detail.image;
      if (!this.viewAnchorElement) {
        this.viewAnchorElement = document.createElement('a');
      }
      this.viewAnchorElement.href = element.src;
      this.viewAnchorElement.download = this.customName;
      this.viewAnchorElement.style.display = 'contents';
      this.viewAnchorElement.onclick = (event: MouseEvent) => {
        event.preventDefault();
      };
      element.parentElement?.insertBefore(this.viewAnchorElement, element);
      this.viewAnchorElement.appendChild(element);
    })
  }
}
