export type ViewerReadyEvent = Event;
export type ViewerShowEvent = Event;
export type ViewerShownEvent = Event;
export type ViewerHideEvent = Event;
export type ViewerHiddenEvent = Event;
export interface ViewerViewEvent extends CustomEvent {
  detail: {
    index: number;
    image: HTMLImageElement;
    originalImage: HTMLImageElement;
  }
};
export interface ViewerViewedEvent extends CustomEvent {
  detail: {
    index: number;
    image: HTMLImageElement;
    originalImage: HTMLImageElement;
  }
};
export interface ViewerMoveEvent extends CustomEvent {
  detail: {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
    originalEvent: Event | null;
  }
}
export interface ViewerMovedEvent extends CustomEvent {
  detail: {
    x: number;
    y: number;
    oldX: number;
    oldY: number;
    originalEvent: Event | null;
  }
}
export interface ViewerRotateEvent extends CustomEvent {
  detail: {
    degree: number;
    oldDegree: number;
  }
}
export interface ViewerRotatedEvent extends CustomEvent {
  detail: {
    degree: number;
    oldDegree: number;
  }
}
export interface ViewerScaleEvent extends CustomEvent {
  detail: {
    scaleX: number;
    scaleY: number;
    oldScaleY: number;
    oldScaleX: number;
  }
}
export interface ViewerScaledEvent extends CustomEvent {
  detail: {
    scaleX: number;
    scaleY: number;
    oldScaleY: number;
    oldScaleX: number;
  }
}
export interface ViewerZoomEvent extends CustomEvent {
  detail: {
    ratio: number;
    oldRatio: number;
    originalEvent: Event | null;
  }
}
export interface ViewerZoomedEvent extends CustomEvent {
  detail: {
    ratio: number;
    oldRatio: number;
    originalEvent: Event | null;
  }
}