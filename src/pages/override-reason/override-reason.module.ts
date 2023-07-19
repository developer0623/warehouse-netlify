import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { OverrideReasonPage } from './override-reason';
import { OverrideReasonPageRoutingModule } from './override-reason-routing.module';

@NgModule({
  declarations: [
    OverrideReasonPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    OverrideReasonPageRoutingModule
  ],
})
export class OverrideReasonPageModule {}
