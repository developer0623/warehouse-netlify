/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (moment as any).default || moment;

@Pipe({name: 'drTime', pure: false})
export class DeliverTimePipe implements PipeTransform, OnDestroy {
  private currentTimer: number;

  private lastTime: number;
  private lastValue: Date | moment.Moment | string;
  private lastText: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  transform(value: Date | moment.Moment | string): string {
    if (this.hasChanged(value)) {
      this.lastTime = this.getTime(value);
      this.lastValue = value;

      this.removeTimer();
      this.createTimer();
      this.lastText = this.makeTrTime(value);
    } else {
      this.createTimer();
    }

    return this.lastText;
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private makeTrTime(oldDate) {
    const oldMoment = momentConstructor(oldDate);
    const checkTime = oldMoment.diff(momentConstructor(), 'minutes');

    let newText = `<span `;
    if(checkTime<10 && checkTime >= 0) {
      newText+=  `class='red-color'>`;
    } else if(checkTime < 0) {
      newText+=  `class='late-by'> Late By </span><span class='red-color'>`;
    } else {
      newText+=  '>';
    }

    const diffTime = Math.abs(momentConstructor().diff(oldMoment, 'seconds'));
    let firstVal = 0;
    let secondVal = 0;
    if(diffTime>2592000) {
      firstVal = Math.round(diffTime/2592000);
      newText+= `${firstVal}<span class='date-sign'>month</span>`;
      // if(firstVal > 1) {
      //   newText+= `${firstVal} <span class='date-sign'>months</span>`;
      // } else {
      //   newText+= `${firstVal} <span class='date-sign'>month</span>`;
      // }

    } else if(diffTime>86400) {
      firstVal = Math.round(diffTime/86400);
      newText+= `${firstVal}<span class='date-sign'>day</span>`;
      // if(firstVal > 1) {
      //   newText+= `${firstVal} <span class='date-sign'>days</span>`;
      // } else {
      //   newText+= `${firstVal} <span class='date-sign'>day</span>`;
      // }
    } else if(diffTime>3600) {
      firstVal = Math.round(diffTime/3600);
      newText+= `${firstVal}<span class='date-sign'>hour</span>`;
      // if(firstVal > 1) {
      //   newText+= `${firstVal} <span class='date-sign'>hours</span>`;
      // } else {
      //   newText+= `${firstVal} <span class='date-sign'>hour</span>`;
      // }
    } else {
      firstVal = Math.round(diffTime/60);
      if(firstVal) {
        newText+= `${firstVal}<span class='date-sign'>min</span>`;
      }

      secondVal = diffTime%60;
      newText+= `${secondVal}<span class='date-sign'>sec</span>`;
      // if(firstVal > 1) {
      //   newText+= `${firstVal} <span class='date-sign'>min</span>`;
      // } else {
      //   newText+= `${firstVal} <span class='date-sign'>hour</span>`;
      // }
    }



    newText+=  '</span>';
    return newText;
  }


  private createTimer() {
    if (this.currentTimer) {
      return;
    }
    const momentInstance = momentConstructor(this.lastValue);

    const timeToUpdate = this.getSecondsUntilUpdate(momentInstance) * 1000;
    this.currentTimer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.lastText = this.makeTrTime(this.lastValue);
          this.currentTimer = null;
          this.ngZone.run(() => this.cdRef.markForCheck());
        }, timeToUpdate);
      }
    });
  }


  private removeTimer() {
    if (this.currentTimer) {
      window.clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }

  private getSecondsUntilUpdate(momentInstance: moment.Moment) {
    const howOld = Math.abs(momentConstructor().diff(momentInstance, 'minute'));
    if (howOld < 60) {
      return 1;
    } else if (howOld < 1440) {
      return 60;
    } else {
      return 1440;
    }
  }

  private hasChanged(value: Date | moment.Moment | string) {
    return this.getTime(value) !== this.lastTime;
  }

  private getTime(value: Date | moment.Moment | string) {
    if (moment.isDate(value)) {
      return value.getTime();
    } else if (moment.isMoment(value)) {
      return value.valueOf();
    } else {
      return momentConstructor(value).valueOf();
    }
  }
}
