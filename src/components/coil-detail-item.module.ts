import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CoilDetailItemComponent } from './coil-detail-item/coil-detail-item';
import { PipesModule } from '../pipes';

@NgModule({
	declarations: [CoilDetailItemComponent],
	imports: [CommonModule, IonicModule, PipesModule],
	exports: [CoilDetailItemComponent]
})
export class CoilDetailItemModule {}
