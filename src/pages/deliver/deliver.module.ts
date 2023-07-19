import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DeliverPage } from './deliver';
import { DeliverItemModule } from '../../components/deliver-item.module';
import { PipesModule } from '../../pipes';
import { DeliverPageRoutingModule } from './deliver-routing.module';

@NgModule({
  declarations: [
    DeliverPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    DeliverItemModule,
    PipesModule,
    DeliverPageRoutingModule
  ],
})
export class DeliverPageModule {}
