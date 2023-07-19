/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, ChangeDetectorRef, PipeTransform, OnDestroy, NgZone} from '@angular/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (moment as any).default || moment;

@Pipe({name: 'customTimeAgo', pure: false})
export class CustomTimeAgoPipe implements PipeTransform, OnDestroy {
  private currentTimer: number;

  private lastTime: number;
  private lastValue: Date | moment.Moment;
  private lastOmitSuffix: boolean;
  private lastText: string;

  constructor(private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
    moment.updateLocale('en', {
        relativeTime : {
            future: '%s',
            past:   '%s',
            s  : 'a few secs',
            ss : '%d secs',
            m:  '1 min',
            mm: '%d mins',
            h:  '1 hour',
            hh: '%d hours',
            d:  'a day',
            dd: '%d days',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            M:  'a month',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            MM: '%d months',
            y:  'a year',
            yy: '%d years'
        }
    });
  }

  transform(value: Date | moment.Moment, omitSuffix?: boolean): string {
    if (this.hasChanged(value, omitSuffix)) {
      this.lastTime = this.getTime(value);
      this.lastValue = value;
      this.lastOmitSuffix = omitSuffix;
      this.removeTimer();
      this.createTimer();
      this.lastText = momentConstructor(value).fromNow(true);
      // this.lastText = momentConstructor(value).from(momentConstructor(), omitSuffix);
      // this.lastText = `<span class='red-color'>45</span>`;
    } else {
      this.createTimer();
    }

    const nowMoment = moment();
    const oldMoment = moment(value);
    const diffTime = oldMoment.diff(nowMoment, 'minutes');
    let newText = '';
    if(diffTime<10 && diffTime >= 0) {
      newText = `<span class='red-color'>`+this.lastText+`</span>`;
    } else if(diffTime < 0 ){
      newText = `<span class='red-color'> - `+this.lastText+`</span>`;
    } else {
      newText = this.lastText;
    }

    return newText;
  }

  ngOnDestroy(): void {
    this.removeTimer();
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
          // this.lastText = momentConstructor(this.lastValue).from(momentConstructor(), this.lastOmitSuffix);
          this.lastText = momentConstructor(this.lastValue).fromNow(true);
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
    if (howOld < 1) {
      return 1;
    } else if (howOld < 60) {
      return 30;
    } else if (howOld < 180) {
      return 300;
    } else {
      return 3600;
    }
  }

  private hasChanged(value: Date | moment.Moment, omitSuffix?: boolean) {
    return this.getTime(value) !== this.lastTime || omitSuffix !== this.lastOmitSuffix;
  }

  private getTime(value: Date | moment.Moment) {
    if (moment.isDate(value)) {
      return value.getTime();
    } else if (moment.isMoment(value)) {
      return value.valueOf();
    } else {
      return momentConstructor(value).valueOf();
    }
  }
}
