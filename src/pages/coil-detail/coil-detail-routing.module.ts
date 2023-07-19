import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoilDetailPage } from './coil-detail';

const routes: Routes = [
  {
    path: '',
    component: CoilDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoilDetailPageRoutingModule {}
