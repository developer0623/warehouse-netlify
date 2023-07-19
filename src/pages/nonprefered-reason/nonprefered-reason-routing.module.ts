import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonPreferedReasonPage } from './nonprefered-reason';

const routes: Routes = [
  {
    path: '',
    component: NonPreferedReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonPreferedReasonPageRoutingModule {}
