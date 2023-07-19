import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CoilDetailPage } from './coil-detail';
import { TaskDetailComponentsModule } from '../../components/task-detail-components.module';
import { CoilDetailItemModule } from '../../components/coil-detail-item.module';
import { CoilDetailPageRoutingModule } from './coil-detail-routing.module';

@NgModule({
  declarations: [
    CoilDetailPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TaskDetailComponentsModule,
    CoilDetailItemModule,
    CoilDetailPageRoutingModule
  ],
})
export class CoilDetailPageModule {}
