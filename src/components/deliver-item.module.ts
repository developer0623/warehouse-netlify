import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DeliverItemComponent } from './deliver-item/deliver-item';
import { PipesModule } from '../pipes';

@NgModule({
	declarations: [DeliverItemComponent],
	imports: [CommonModule, IonicModule, PipesModule],
	exports: [DeliverItemComponent]
})
export class DeliverItemModule {}
