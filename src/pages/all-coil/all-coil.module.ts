import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AllCoilsPage } from './all-coil';
import { TaskDetailComponentsModule } from '../../components/task-detail-components.module';
import { AllCoilsPageRoutingModule } from './all-coil-routing.module';
import { FilterModalPageModule } from '../filter-modal/filter-modal.module';

@NgModule({
  declarations: [
    AllCoilsPage
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    TaskDetailComponentsModule,
    AllCoilsPageRoutingModule,
    FilterModalPageModule
  ],
})
export class AllCoilPageModule {}
