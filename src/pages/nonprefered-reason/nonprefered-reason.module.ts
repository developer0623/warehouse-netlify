import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NonPreferedReasonPage } from './nonprefered-reason';
import { NonPreferedReasonPageRoutingModule } from './nonprefered-reason-routing.module';

@NgModule({
  declarations: [
    NonPreferedReasonPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    NonPreferedReasonPageRoutingModule
  ],
})
export class NonpreferedReasonPageModule {}
