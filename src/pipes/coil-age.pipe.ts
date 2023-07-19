/* angular2-moment (c) 2015, 2016 Uri Shaked / MIT Licence */

import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';


@Pipe({name: 'coilage'})
export class CoilAgePipe implements PipeTransform {


  constructor() {

  }

  transform(value: Date | moment.Moment | string): string {
    let newVal = `<div><span class='age-title'>AGE:</span>`;

    const nowMoment = moment();
    const oldMoment = moment(value);

    const diff = nowMoment.diff(oldMoment, 'days');
    const diffY = Math.floor(diff/365);

    if(diffY) {
      newVal += `<span class="diff-v-class">${diffY}</span><span class="diff-sign">Y</span>`;
    }

    const remainD = diff%365;

    const diffM = Math.floor(remainD/30);
    if(diffM) {
      newVal += `<span class="diff-v-class">${diffM}</span><span class="diff-sign">M</span>`;
    }

    const diffD = remainD%30;
    if(diffD) {
      newVal += `<span class="diff-v-class">${diffD}</span><span class="diff-sign">D</span>`;
    }

    return newVal;
  }
}
