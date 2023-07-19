import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UnattainableReasonPage } from './unattainable-reason';
import { UnattainableReasonPageRoutingModule } from './unattainable-reason-routing.module';

@NgModule({
  declarations: [
    UnattainableReasonPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    UnattainableReasonPageRoutingModule
  ],
})
export class UnattainableReasonPageModule {}
