import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SearchCoilDetailPage } from './search-coil-detail';
import { CoilDetailItemModule } from '../../components/coil-detail-item.module';
import { SearchCoilDetailPageRoutingModule } from './search-coil-detail-routing.module';

@NgModule({
  declarations: [
    SearchCoilDetailPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CoilDetailItemModule,
    SearchCoilDetailPageRoutingModule
  ],
})
export class SearchCoilDetailPageModule {}
