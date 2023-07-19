import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TaskItemComponent } from './task-item/task-item';
import { TaskBottomItemComponent } from './task-bottom-item/task-bottom-item';
import { PipesModule } from '../pipes';

@NgModule({
	declarations: [TaskItemComponent, TaskBottomItemComponent],
	imports: [IonicModule, PipesModule],
	exports: [TaskItemComponent, TaskBottomItemComponent]
})
export class TaskItemComponentsModule {}
