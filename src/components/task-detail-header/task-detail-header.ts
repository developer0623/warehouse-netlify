import { Component, Input } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// export * from 'rxjs/Rx';


@Component({
  selector: 'app-task-detail-header',
  templateUrl: 'task-detail-header.html',
  styleUrls: ['task-detail-header.scss']
})
export class TaskDetailHeaderComponent {

	@Input() task: any;

  constructor() {

  }

}
