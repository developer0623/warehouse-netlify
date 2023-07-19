import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FilterModalPage } from './filter-modal';
import { TaskDetailComponentsModule } from '../../components/task-detail-components.module';

@NgModule({
  declarations: [
    FilterModalPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    TaskDetailComponentsModule
  ],
})
export class FilterModalPageModule {}
