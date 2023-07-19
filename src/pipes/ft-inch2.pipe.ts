import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ftinch2'
})
export class FtInchPipe2 implements PipeTransform {

  transform(value: number): string {
   	let newVal = '<div>';
    const ftVal = Math.floor(value);
    if(ftVal) {
      newVal+= `<span class="ft-class">${ftVal}</span><span class="ft-sign">FT</span>`;
    }
    const inchVal = Math.round((value - ftVal)*12);
   	if(inchVal) {
    	newVal+= `<span class="inch-class">${inchVal}</span><span class="inch-sign">IN</span>`;
    }

    const returnVal = newVal+ '</div>';
      return returnVal;
  }

}
