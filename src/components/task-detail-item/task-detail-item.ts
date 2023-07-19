import { Component, Input } from '@angular/core';
import { ITaskCoil } from  'src/core/datatypes';


@Component({
  selector: 'app-task-detail-item',
  templateUrl: 'task-detail-item.html',
  styleUrls: ['./task-detail-item.scss']
})
export class TaskDetailItemComponent{

	@Input() coil: ITaskCoil;
	@Input() preferFlag: boolean;
	@Input() errorFlag = 0;

  constructor() { }
}
