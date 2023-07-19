import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManualFindPage } from './manual-find';
import { TaskDetailComponentsModule } from '../../components/task-detail-components.module';
import { ManualFindPageRoutingModule } from './manual-find-routing.module';

@NgModule({
  declarations: [
    ManualFindPage,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    TaskDetailComponentsModule,
    ManualFindPageRoutingModule
  ],
})
export class ManualFindPageModule {}
