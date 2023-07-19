import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCoilDetailPage } from './search-coil-detail';

const routes: Routes = [
  {
    path: '',
    component: SearchCoilDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCoilDetailPageRoutingModule {}
