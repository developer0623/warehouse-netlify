import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TaskDetailPage } from './task-detail';
import { TaskDetailComponentsModule } from '../../components/task-detail-components.module';
import { TaskDetailPageRoutingModule } from './task-detail-routing.module';

@NgModule({
  declarations: [
    TaskDetailPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TaskDetailComponentsModule,
    TaskDetailPageRoutingModule
  ],
})
export class TaskDetailPageModule {}
