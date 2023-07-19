import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ftinch'
})
export class FtInchPipe implements PipeTransform {

  transform(value: number): string {
   	let newVal = '<div>L';
    const ftVal = Math.floor(value);
    if(ftVal) {
      newVal+= `<span class="ft-class">${ftVal}</span><span class="ft-sign">&prime;</span>`;
    }
    const inchVal = Math.round((value - ftVal)*12);
   	if(inchVal) {
    	newVal+= `<span class="inch-class">${inchVal}</span><span class="inch-sign">&Prime;</span>`;
    }

    const returnVal = newVal+ '</div>';

      return returnVal;
  }

}
