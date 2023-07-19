import { Component, Input } from '@angular/core';
import { ITaskCoil } from 'src/core/datatypes';


@Component({
  selector: 'app-coil-detail-item',
  templateUrl: 'coil-detail-item.html',
  styleUrls: ['./coil-detail-item.scss']
})
export class CoilDetailItemComponent {

	@Input() selectedCoil: ITaskCoil;
  @Input() warningFields: string[] = [];
  @Input() errorFields: string[] = [];

  constructor() { }

  isWarningField(field: string){
    return this.warningFields.indexOf(field) > -1;
  }
  isErrorField(field: string){
    return this.errorFields.indexOf(field) > -1;
  }

}
