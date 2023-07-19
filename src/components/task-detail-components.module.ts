import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskDetailItemComponent } from './task-detail-item/task-detail-item';
import { TaskDetailHeaderComponent } from './task-detail-header/task-detail-header';
import { PipesModule } from '../pipes';

@NgModule({
	declarations: [TaskDetailItemComponent, TaskDetailHeaderComponent],
	imports: [IonicModule, PipesModule, CommonModule],
	exports: [TaskDetailItemComponent, TaskDetailHeaderComponent]
})
export class TaskDetailComponentsModule {}
