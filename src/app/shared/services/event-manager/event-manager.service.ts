import { Injectable } from '@angular/core';
import { filter, map, Observable, Observer, share, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  observable: Observable<any | string>;
  observer: Observer<any | string> | undefined;

  constructor() {
    this.observable = Observable.create((observer: Observer<any | string>) => {
      this.observer = observer;
    }).pipe(share());
  }

  broadcastEvent(event: any | string): void {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  subscribeEvent(eventName: string, callback: any): Subscription {
    return this.observable
      .pipe(
        filter((event: any | string) => {
          if (typeof event === 'string') {
            return event === eventName;
          }
          return event.name === eventName;
        }),
        map((event: any | string) => {
          if (typeof event !== 'string') {
            return event;
          }
        })
      )
      .subscribe(callback);
  }
}
