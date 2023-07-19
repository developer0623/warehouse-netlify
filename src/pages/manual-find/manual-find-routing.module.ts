import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualFindPage } from './manual-find';

const routes: Routes = [
  {
    path: '',
    component: ManualFindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualFindPageRoutingModule {}
