import { Component, Input, OnInit } from '@angular/core';
import { ITaskCoil } from  'src/core/datatypes';


@Component({
  selector: 'app-deliver-item',
  templateUrl: 'deliver-item.html',
  styleUrls: ['./deliver-item.scss']
})
export class DeliverItemComponent implements OnInit{

	@Input() item: ITaskCoil;

  constructor() {

  }
  ngOnInit() {
  }
}
