import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CancelTaskPage } from './cancel-task';
import { CancelTaskPageRoutingModule } from './cancel-task-routing.module';

@NgModule({
  declarations: [
    CancelTaskPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    CancelTaskPageRoutingModule
  ],
})
export class CancelTaskPageModule {}
