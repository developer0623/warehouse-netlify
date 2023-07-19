import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-task-bottom-item',
  templateUrl: 'task-bottom-item.html',
  styleUrls: ['task-bottom-item.scss']
})
export class TaskBottomItemComponent implements OnChanges {
	@Input() task: any;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('1111111', changes);
  }

}
