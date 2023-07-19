import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCoilsPage } from './all-coil';

const routes: Routes = [
  {
    path: '',
    component: AllCoilsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCoilsPageRoutingModule {}
